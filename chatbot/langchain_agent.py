from langchain_core.tools import tool
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import interrupt, Command
from api_client import CulfestAPIClient
from prompt_guard import check_input, check_output, load_system_prompt
import contextvars
import os
from dotenv import load_dotenv
from typing import Dict, Any, Optional, AsyncGenerator, Union

load_dotenv()

api_client = CulfestAPIClient()

# Async-safe per-request conversation context
user_contexts: Dict[str, Dict[str, Any]] = {}
_active_conv_id = contextvars.ContextVar("active_conv_id", default="default")

# LangGraph checkpointer — stores full conversation + interrupt state per thread
checkpointer = MemorySaver()

# Lazy graph singleton
_graph = None


# =====================================================================
#  READ-ONLY TOOLS  (no confirmation needed)
# =====================================================================

@tool
def get_all_events() -> str:
    """Get a complete list of all events at Culfest 2025 with names, categories and descriptions."""
    result = api_client.get_all_events()
    if result.get("success"):
        events = result.get("events", [])
        if not events:
            return "No events found."
        lines = [f"{e['eventname']} ({e['category']}): {e['description'][:120]}..." for e in events]
        return f"Found {len(events)} events:\n" + "\n".join(lines)
    return f"Error: {result.get('error', 'Unknown error')}"


@tool
def get_event_details(event_id: str) -> str:
    """Get detailed information about a specific event. Pass the event name or ID like 'battle of bands' or 'move mayhem'."""
    result = api_client.get_event_by_id(event_id)
    if result.get("success"):
        e = result.get("event", {})
        return f"Name: {e['eventname']}\nCategory: {e['category']}\nDescription: {e['description']}"
    return f"Event not found: {result.get('error', 'Unknown')}"


@tool
def get_events_by_category(category: str) -> str:
    """Get all events in a specific category. Use categories like Dance, Music, Dramatics, Fine Arts, Literary, Quizzing, Photography, Fashion, Informals, or FLAGSHIP EVENTS."""
    result = api_client.get_events_by_category(category)
    if result.get("success"):
        events = result.get("events", [])
        lines = [f"{e['eventname']}: {e['description'][:120]}..." for e in events]
        return f"Found {len(events)} {category} events:\n" + "\n".join(lines)
    return f"No events found in '{category}'"


@tool
def get_categories() -> str:
    """Get all available event categories at Culfest 2025."""
    result = api_client.get_categories()
    if result.get("success"):
        cats = result.get("categories", [])
        return "Available categories: " + ", ".join(cats)
    return f"Error: {result.get('error', 'Unknown')}"


@tool
def get_my_registered_events() -> str:
    """Get the list of events the current user is registered for. User must be logged in."""
    user_ctx = user_contexts.get(_active_conv_id.get())
    if not user_ctx or not user_ctx.get("user"):
        return "You need to be logged in to see your registered events."
    result = api_client.get_registered_events(user_ctx["user"])
    if result.get("status") == 200:
        events = result.get("events", [])
        if not events:
            return "You haven't registered for any events yet."
        lines = [f"- {e}" for e in events]
        return f"Your registered events ({len(events)}):\n" + "\n".join(lines)
    return f"Error: {result.get('message', result.get('error', 'Unknown'))}"


@tool
def get_my_profile() -> str:
    """Get the current user's profile information. User must be logged in."""
    user_ctx = user_contexts.get(_active_conv_id.get())
    if not user_ctx or not user_ctx.get("user"):
        return "You need to be logged in to view your profile."
    u = user_ctx["user"]
    parts = [f"Name: {u.get('name', 'N/A')}", f"Email: {u.get('email', 'N/A')}"]
    if u.get("phone"):
        parts.append(f"Phone: {u['phone']}")
    if u.get("college"):
        parts.append(f"College: {u['college']}")
    return "Your Profile:\n" + "\n".join(parts)


@tool
def check_payment_status() -> str:
    """Check the payment status for the currently logged-in user."""
    user_ctx = user_contexts.get(_active_conv_id.get())
    if not user_ctx or not user_ctx.get("session"):
        return "You need to be logged in to check payment status."
    result = api_client.verify_payment(user_ctx["session"])
    status = result.get("status")
    msg = result.get("message", "")
    if status == 200 and result.get("data"):
        payment = result["data"]
        return f"Payment verified! Amount: {payment.get('amount', 'N/A')}"
    elif status == 404 or "not found" in msg.lower():
        return "No payment found for your account."
    return f"Payment status: {msg or 'Unknown'}"


@tool
def check_api_connection() -> str:
    """Check if the Culfest API is working properly."""
    result = api_client.check_connection()
    if result.get("success"):
        return "API is healthy and working!"
    return f"API issue: {result.get('error', 'Unknown')}"


# =====================================================================
#  SENSITIVE TOOLS  (use interrupt() for human-in-the-loop)
# =====================================================================

@tool
def register_for_event(event_name: str, team_name: str, user_emails: str) -> str:
    """Register the current user for an event with a team. User must be logged in.
    Args:
        event_name: The exact name of the event to register for.
        team_name: The team name chosen by the user.
        user_emails: Comma-separated email addresses of all team members including the user.
    """
    user_ctx = user_contexts.get(_active_conv_id.get())
    if not user_ctx or not user_ctx.get("session"):
        return "You need to be logged in to register for events."

    confirmation = interrupt({
        "message": f"Register for **{event_name}** with team **{team_name}** and members: {user_emails}?",
        "tool": "register_for_event",
        "args": {"event_name": event_name, "team_name": team_name, "user_emails": user_emails},
    })

    if confirmation != "approve":
        return "Registration cancelled."

    emails_list = [e.strip() for e in user_emails.split(",") if e.strip()]
    result = api_client.register_event(
        event_name, user_ctx["session"], user_emails=emails_list, team_name=team_name
    )
    status = result.get("status")
    msg = result.get("message", "")
    data = result.get("data", {})

    if status == 200 and "processed" in msg.lower():
        team_info = ""
        if data.get("newTeam"):
            team_info = f" Team: {data['newTeam'].get('teamName', 'N/A')}"
        failed = data.get("failedUpdates", [])
        success = data.get("successfulUpdates", [])
        parts = []
        if success:
            parts.append(f"Successfully registered: {', '.join(success)}")
        if failed:
            reasons = [f"{f['email']}: {f['reason']}" for f in failed]
            parts.append(f"Failed: {'; '.join(reasons)}")
        return f"Registration for {event_name}:{team_info} {' | '.join(parts)}" if parts else f"Successfully registered for {event_name}!{team_info}"
    elif status == 200:
        return f"Registration note: {msg}"

    # Handle failure — extract detailed reasons from failedUpdates
    failed = data.get("failedUpdates", [])
    if failed:
        reasons = [f"{f['email']}: {f['reason']}" for f in failed]
        return f"Registration failed for {event_name}: {'; '.join(reasons)}"
    return f"Registration failed: {msg or result.get('error', 'Unknown error')}"


@tool
def add_email_to_newsletter(email: str) -> str:
    """Add an email address to the Culfest newsletter mailing list."""
    confirmation = interrupt({
        "message": f"Add **{email}** to the Culfest newsletter?",
        "tool": "add_email_to_newsletter",
        "args": {"email": email},
    })
    if confirmation != "approve":
        return "Newsletter subscription cancelled."

    result = api_client.add_email(email)
    if result.get("status") == 201:
        return f"Successfully added {email} to the newsletter!"
    return f"Error: {result.get('message', result.get('error', 'Failed'))}"


@tool
def send_otp(email: str) -> str:
    """Send an OTP verification code to an email address for password reset."""
    confirmation = interrupt({
        "message": f"Send OTP verification code to **{email}**?",
        "tool": "send_otp",
        "args": {"email": email},
    })
    if confirmation != "approve":
        return "OTP sending cancelled."

    result = api_client.send_otp(email)
    if result.get("status") == 201:
        return f"OTP sent to {email}. Please check your email."
    return f"Error: {result.get('message', result.get('error', 'Failed'))}"


@tool
def verify_otp(email: str, otp: str) -> str:
    """Verify an OTP code for an email address."""
    confirmation = interrupt({
        "message": f"Verify OTP **{otp}** for **{email}**?",
        "tool": "verify_otp",
        "args": {"email": email, "otp": otp},
    })
    if confirmation != "approve":
        return "OTP verification cancelled."

    result = api_client.verify_otp(email, otp)
    if result.get("status") == 201:
        return f"OTP verified successfully for {email}!"
    elif result.get("status") == 202:
        return "Invalid OTP. Please check and try again."
    return f"Verification failed: {result.get('message', result.get('error', 'Unknown'))}"


@tool
def reset_password(email: str, new_password: str) -> str:
    """Reset or update a user's password. OTP must be verified first."""
    confirmation = interrupt({
        "message": f"Reset password for **{email}**?",
        "tool": "reset_password",
        "args": {"email": email},
    })
    if confirmation != "approve":
        return "Password reset cancelled."

    result = api_client.update_password(email, new_password)
    if result.get("status") == 201:
        return f"Password updated successfully for {email}!"
    return f"Error: {result.get('message', result.get('error', 'Failed'))}"


@tool
def send_contact_message(name: str, email: str, message: str) -> str:
    """Send a contact message to the Culfest team on behalf of the user."""
    preview = message[:100] + ("..." if len(message) > 100 else "")
    confirmation = interrupt({
        "message": f"Send message to Culfest team from **{name}** ({email})?\n\n\"{preview}\"",
        "tool": "send_contact_message",
        "args": {"name": name, "email": email},
    })
    if confirmation != "approve":
        return "Message sending cancelled."

    result = api_client.send_contact_message(name, email, message)
    if result.get("status") == 201:
        return "Your message has been sent to the Culfest team!"
    return f"Error: {result.get('message', result.get('error', 'Failed'))}"


# =====================================================================
#  TOOLS LIST
# =====================================================================

all_tools = [
    get_all_events,
    get_event_details,
    get_events_by_category,
    get_categories,
    register_for_event,
    get_my_registered_events,
    get_my_profile,
    check_payment_status,
    add_email_to_newsletter,
    send_otp,
    verify_otp,
    reset_password,
    check_api_connection,
    send_contact_message,
]


# =====================================================================
#  SYSTEM PROMPT (loaded from external file)
# =====================================================================

SYSTEM_PROMPT = load_system_prompt()


# =====================================================================
#  GRAPH INITIALIZATION
# =====================================================================

def get_graph():
    global _graph
    if _graph is None:
        llm = ChatVertexAI(
            model_name="gemini-2.0-flash",
            temperature=0.7,
            project=os.getenv("GOOGLE_CLOUD_PROJECT"),
            location=os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1"),
            max_output_tokens=2048,
        )
        _graph = create_react_agent(
            model=llm,
            tools=all_tools,
            prompt=SYSTEM_PROMPT,
            checkpointer=checkpointer,
        )
    return _graph


# =====================================================================
#  CONTEXT HELPERS
# =====================================================================

def set_user_context(conversation_id: str, user_session: Optional[Dict[str, Any]]):
    if user_session and conversation_id:
        user_contexts[conversation_id] = {
            "session": user_session,
            "user": user_session.get("user", {}),
        }


def _build_auth_prefix(user_session: Optional[Dict[str, Any]]) -> str:
    if user_session and user_session.get("user"):
        u = user_session["user"]
        return f"[Auth: Logged in as {u.get('name', 'Unknown')} ({u.get('email', '')})] "
    return "[Auth: NOT logged in] "


def clear_memory(conversation_id: str) -> bool:
    user_contexts.pop(conversation_id, None)
    return True


async def get_conversation_history(conversation_id: str) -> list:
    graph = get_graph()
    config = {"configurable": {"thread_id": conversation_id}}
    try:
        state = await graph.aget_state(config)
        if state and state.values:
            return state.values.get("messages", [])
    except Exception:
        pass
    return []


# =====================================================================
#  SHARED STREAMING HELPER
# =====================================================================

async def _stream_graph(graph_instance, input_data, config) -> AsyncGenerator[Union[str, dict], None]:
    """Yield text tokens from LLM and interrupt dicts from tools."""
    try:
        async for event in graph_instance.astream_events(
            input_data, config=config, version="v2"
        ):
            kind = event.get("event", "")
            if kind == "on_chat_model_stream":
                data = event.get("data")
                if not isinstance(data, dict):
                    continue
                chunk = data.get("chunk")
                if chunk is None:
                    continue
                content = getattr(chunk, "content", "")
                tool_calls = (
                    getattr(chunk, "tool_call_chunks", None)
                    or getattr(chunk, "tool_calls", None)
                )
                if content and isinstance(content, str) and not tool_calls:
                    yield content
    except Exception as e:
        print(f"Stream error: {e}")
        yield f"Sorry, I encountered an error."
        return

    # After stream ends, check if graph paused on an interrupt
    try:
        state = await graph_instance.aget_state(config)
        if state and state.tasks:
            for task in state.tasks:
                if hasattr(task, "interrupts") and task.interrupts:
                    iv = task.interrupts[0].value
                    if isinstance(iv, dict):
                        yield {"type": "interrupt", **iv}
                    return
    except Exception as e:
        print(f"State check error: {e}")


# =====================================================================
#  PUBLIC API — STREAMING
# =====================================================================

async def get_chatbot_response_stream(
    user_message: str,
    conversation_id: Optional[str] = None,
    user_session: Optional[Dict[str, Any]] = None,
) -> AsyncGenerator[Union[str, dict], None]:
    """Primary streaming path. Yields str tokens or an interrupt dict."""
    conversation_id = conversation_id or "default"
    _active_conv_id.set(conversation_id)
    if user_session:
        set_user_context(conversation_id, user_session)

    # ── INPUT GUARD: block prompt injection / sensitive info requests ──
    auth_prefix = _build_auth_prefix(user_session)
    is_safe, deflection, category = check_input(auth_prefix + user_message)
    if not is_safe:
        yield deflection
        return

    graph = get_graph()
    config = {"configurable": {"thread_id": conversation_id}}
    input_data = {"messages": [HumanMessage(content=auth_prefix + user_message)]}

    # ── Collect streaming tokens for output guard check ──
    collected_tokens = []
    interrupt_event = None

    async for item in _stream_graph(graph, input_data, config):
        if isinstance(item, dict):
            interrupt_event = item
        else:
            collected_tokens.append(item)

    # ── OUTPUT GUARD: check for leaked sensitive info ──
    if collected_tokens:
        full_response = "".join(collected_tokens)
        is_output_safe, replacement, out_category = check_output(full_response)
        if not is_output_safe:
            yield replacement
            return
        # Response is safe — yield all tokens
        for token in collected_tokens:
            yield token

    if interrupt_event:
        yield interrupt_event


async def resume_conversation_stream(
    conversation_id: str,
    action: str,
    user_session: Optional[Dict[str, Any]] = None,
) -> AsyncGenerator[Union[str, dict], None]:
    """Resume after an interrupt. action = 'approve' or 'reject'."""
    _active_conv_id.set(conversation_id)
    if user_session:
        set_user_context(conversation_id, user_session)

    graph = get_graph()
    config = {"configurable": {"thread_id": conversation_id}}

    async for item in _stream_graph(graph, Command(resume=action), config):
        yield item


# =====================================================================
#  PUBLIC API — NON-STREAMING FALLBACK
# =====================================================================

async def get_chatbot_response(
    user_message: str,
    conversation_id: Optional[str] = None,
    user_session: Optional[Dict[str, Any]] = None,
) -> Union[str, dict]:
    """Returns final text or an interrupt dict."""
    conversation_id = conversation_id or "default"
    _active_conv_id.set(conversation_id)
    if user_session:
        set_user_context(conversation_id, user_session)

    # ── INPUT GUARD: block prompt injection / sensitive info requests ──
    auth_prefix = _build_auth_prefix(user_session)
    is_safe, deflection, category = check_input(auth_prefix + user_message)
    if not is_safe:
        return deflection

    graph = get_graph()
    config = {"configurable": {"thread_id": conversation_id}}

    try:
        result = await graph.ainvoke(
            {"messages": [HumanMessage(content=auth_prefix + user_message)]},
            config=config,
        )

        # Check interrupt
        state = await graph.aget_state(config)
        if state and state.tasks:
            for task in state.tasks:
                if hasattr(task, "interrupts") and task.interrupts:
                    iv = task.interrupts[0].value
                    if isinstance(iv, dict):
                        return {"type": "interrupt", **iv}

        messages = result.get("messages", [])
        for m in reversed(messages):
            if isinstance(m, AIMessage) and m.content:
                # ── OUTPUT GUARD: check for leaked sensitive info ──
                is_output_safe, replacement, out_category = check_output(m.content)
                if not is_output_safe:
                    return replacement
                return m.content
        return "Sorry, I couldn't process that."

    except Exception as e:
        print(f"Agent error: {e}")
        return "Sorry, I encountered an error. Please try again."


# =====================================================================
#  TEST
# =====================================================================

if __name__ == "__main__":
    import asyncio

    async def test():
        print("Testing Culfest Chatbot with LangGraph HITL...\n")
        queries = ["Hello!", "What events are available?", "Show me dance events"]
        for q in queries:
            print(f"User: {q}")
            resp = await get_chatbot_response(q, conversation_id="test")
            print(f"Bot: {resp}\n" + "-" * 50)

    asyncio.run(test())
