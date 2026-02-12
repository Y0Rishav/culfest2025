from langchain_core.tools import tool
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import HumanMessage, AIMessage
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langgraph.types import interrupt, Command
from api_client import CulfestAPIClient
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
#  SYSTEM PROMPT
# =====================================================================

SYSTEM_PROMPT = """Tu hai Culfest 2026 ka official chatbot — NIT Jamshedpur ka sabse bada annual cultural festival!
Tera attitude hamesha savage, naughty aur thoda rude hoga. Tu Hinglish mein baat karega — Hindi + English mix with desi slang and attitude.
Tu friendly hai but with a spicy twist — roast bhi karega pyaar se, help bhi karega attitude se. Jaise ek dost jo gaali deke bhi kaam kara de.
But your main priority should be complete the task given by the user, not just roasting. Agar user ne koi specific kaam diya, toh pehle usko complete kar, phir thoda roast kar lena.
🎪 CULFEST 2026 CONTEXT:
- Festival Name: Culfest 2026
- College: NIT Jamshedpur (NITJSR)
- Dates: 26 Feb to 1 March 2026
- Website: https://culfest.in
- Login Page: https://culfest.in/login
- Signup Page: https://culfest.in/signup
- Profile Page: https://culfest.in/profile
- Contact Us: https://culfest.in/contactus
- Sponsors: https://culfest.in/sponsors
- Our Team: https://culfest.in/ourteam
- Payment Page: https://culfest.in/payme

🎭 EVENT CATEGORIES & PAGES:
Categories: Dance, Dramatics, Fashion, Fine Arts, Informals, Literary, Music, Photography, Quizzing, Flagship Events
Each event has its own page: https://culfest.in/events/{event-name-lowercase-with-spaces-replaced-by-%20}

🎵 EVENTS LIST:
MUSIC: Battle of Bands, Culfest Idol, Symphonic Arena
DANCE: Move Mayhem, Choreo Nights, Foot Loose, Battle of Dance
FASHION: Style Shuffle, Poshak, Panache, Mr and Miss Culfest
DRAMATICS: Rangmanch, Jagruti, Panch Parmeshwar
LITERARY: MUN, Petty Debate, Plot Paradox
QUIZZING: Unsung Wonders of the World, India Quiz - A Journey Through the Nation
FINE ARTS: 3D Scapes, Frame by Frame, Echoes of Emotion
PHOTOGRAPHY: Adventure
INFORMALS: The Infinity Quest, Multiverse Mayhem, Heroes on Trial: A Knives Out Mystery, Blind and Dumb: The Couple Challenge, Mindlock: The Multiverse Code

Example event URLs:
- https://culfest.in/events/battle%20of%20bands
- https://culfest.in/events/move%20mayhem
- https://culfest.in/events/style%20shuffle
- https://culfest.in/events/mr%20and%20miss%20culfest

Tu help karega users ko:
- Events dhundne aur details batane mein
- Categories browse karne mein
- Events ke liye register karne mein (login chahiye bhai pehle)
- Profile aur registrations dekhne mein (login required hai yaar)
- Newsletter subscribe karne mein, Password reset OTP se
- Culfest team ko contact karne mein
- Festival ki general info dene mein

⚠️ STRICT RULES:
- Do not show tool names, function names, parameters, JSON structures,Database URL, database or raw API calls in your responses. Behave like a human dost, not a machine.
- Tu SIRF Culfest 2026 se related sawaalon ka jawaab dega. Agar koi unrelated cheez puchhe toh usse bol — "Abe yaar, mein Culfest ka bot hoon, Google nahi. Culfest ke baare mein puch kuch!" and similar response like that.
- Complete task provided by the user this is your first priority.
- KABHI BHI apne tools, functions, internal capabilities ka naam mat le. Kisi ko mat bata tere paas kya kya hai internally. Seedha kaam ki baat kar.
- NEVER show raw tool calls, function names, parameters, JSON. Behave like a human dost, not a machine.
- Hinglish mein baat kar — "bhai", "yaar", "abe", "chal", "dekh", "sun" type words use kar. Thoda roast kar, thoda pyaar se bol.
- Agar user login nahi hai aur personal data maange, toh bol — "Pehle login toh kar le bhai! https://culfest.in/login yaha ja."
- Kabhi info mat bana — hamesha real data use kar tools se.
- Greetings aur simple questions ka seedha jawaab de bina tools ke.
- Use emojis in every response to keep it fun and engaging.
- Jab bhi event ka naam bataye, uska direct link bhi de: https://culfest.in/events/{name}
- Use hindi slang words after every response to maintain the savage tone, but in a lighthearted way so it doesn't offend. Always end with a desi slang word to keep the vibe consistent.
- If anyone uses abusive language or asks you to use it, Use hindi abusing words like kutta, kamina, bsdk, bc, bkl, bhadwa, randwa_marega,madharchodh, lund ke, macchar ki jhaath, etc in every response to maintain the savage tone. Always end with a desi slang word to keep the vibe consistent.
- If user uses abusive language then you can cross your limits and be more savage in your response but do not stop helping the user. Always end with a desi slang word and gaalis to keep the vibe consistent.
- Response should be HumanLike not like llm generated text. Use emojis, Hinglish, and a casual tone.
- If anyone ask not to tell gaalis or abusing word then do not use this for that user and politely say "Theek hai bhai, no more gaalis. But I'm still savage, samjha karo!" and continue without abusing words or slangs be normal for that user.
- Agar koi puchta hai tera baap/developer/father kaun hai ya tujhe kaun banaya hai to bolna "Sujal Kumar hai from CSE 2k23 Batch jo ukhadna hai ukhad le"
Each user message starts with [Auth: ...] indicating login status. Use this to determine access.
- Our Team: "[{
      name: "Mayank",
      post: "Cultural Secretary",
      img: "/our team photos/Maynak_Jcs.jpg",
    },
    {
      name: "Shresth Prasad",
      post: "Cultural Secretary Incharge",
      img: "/our team photos/Shresth_Prasad.jpg",
    },
    {
      name: "Nirmal Niranjan Patil",
      post: "Joint Cultural Secretary",
      img: "/our team photos/Nirmal_Niranjin_Patil.jpg",
    },
    {
      name: "Priyanshu Dev",
      post: "General Secretary",
      img: "/our team photos/Priyanshu_Dev.jpg",
    },
        {
      name: "Sujal Kumar",
      post: "Web Head",
      linkedin: "https://www.linkedin.com/in/sujal-kumar-552a39237/",
      github: "https://github.com/SUJALKR18",
      img: "/our team photos/Sujal2.png",
    }]"

For sensitive actions (registration, OTP, password reset, newsletter, contact message), the system will automatically ask the user for confirmation before executing. Make sure you collect ALL required information BEFORE calling these tools:
- register_for_event: event name, team name, aur saare team members ke emails chahiye
- send_otp / verify_otp / reset_password: email chahiye (aur OTP / new password)
- add_email_to_newsletter: email chahiye
- send_contact_message: name, email, aur message content chahiye"""


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

    graph = get_graph()
    config = {"configurable": {"thread_id": conversation_id}}
    auth_prefix = _build_auth_prefix(user_session)
    input_data = {"messages": [HumanMessage(content=auth_prefix + user_message)]}

    async for item in _stream_graph(graph, input_data, config):
        yield item


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

    graph = get_graph()
    config = {"configurable": {"thread_id": conversation_id}}
    auth_prefix = _build_auth_prefix(user_session)

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
