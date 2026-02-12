from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import os
import json
from dotenv import load_dotenv
from langchain_agent import get_chatbot_response, get_chatbot_response_stream, resume_conversation_stream, clear_memory, get_conversation_history
import asyncio
import uuid

load_dotenv()

app = FastAPI(
    title="Culfest 2025 Chatbot API",
    description="LangChain-powered chatbot with streaming and memory for Culfest event information",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = ""
    conversation_id: Optional[str] = None
    stream: Optional[bool] = True
    user_session: Optional[dict] = None
    resume_action: Optional[str] = None  # "approve" or "reject" for HITL


class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    success: bool = True


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "Culfest 2025 Chatbot",
        "version": "2.0.0",
        "features": ["streaming", "conversation_memory"]
    }


async def response_generator(request: ChatRequest, conversation_id: str):
    """Generate SSE events — handles tokens, interrupts, and resume."""
    try:
        # Send conversation_id first
        yield f"data: {json.dumps({'type': 'conversation_id', 'conversation_id': conversation_id})}\n\n"

        # Pick the right stream source
        if request.resume_action:
            stream = resume_conversation_stream(
                conversation_id=conversation_id,
                action=request.resume_action,
                user_session=request.user_session,
            )
        else:
            stream = get_chatbot_response_stream(
                user_message=request.message,
                conversation_id=conversation_id,
                user_session=request.user_session,
            )

        async for item in stream:
            if isinstance(item, dict):
                # Interrupt event — needs user confirmation
                yield f"data: {json.dumps(item)}\n\n"
            else:
                yield f"data: {json.dumps({'type': 'token', 'token': item})}\n\n"

        yield f"data: {json.dumps({'type': 'done'})}\n\n"

    except Exception as e:
        yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming chat endpoint - returns Server-Sent Events (SSE)
    """
    try:
        if not request.message and not request.resume_action:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Generate or use provided conversation_id
        conversation_id = request.conversation_id or str(uuid.uuid4())

        # Return streaming response from async generator
        return StreamingResponse(
            response_generator(request, conversation_id),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )
    
    except Exception as e:
        print(f"Error in chat stream endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}"
        )


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Regular chat endpoint - returns complete response (non-streaming fallback)
    """
    try:
        if not request.message and not request.resume_action:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Generate or use provided conversation_id
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        # Get response from the chatbot (now async)
        response = await get_chatbot_response(request.message, conversation_id, request.user_session)
        
        # Handle interrupt
        if isinstance(response, dict):
            return {"success": True, "conversation_id": conversation_id, **response}
        
        return ChatResponse(
            response=response,
            conversation_id=conversation_id,
            success=True
        )
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}"
        )


@app.delete("/chat/history/{conversation_id}")
async def clear_conversation(conversation_id: str):
    """Clear conversation history for a specific conversation ID"""
    try:
        success = clear_memory(conversation_id)
        if success:
            return {
                "success": True,
                "message": f"Conversation history cleared for {conversation_id}"
            }
        else:
            return {
                "success": False,
                "message": f"No conversation found for {conversation_id}"
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat/history/{conversation_id}")
async def get_history(conversation_id: str):
    """Get conversation history for a specific conversation ID"""
    try:
        history = await get_conversation_history(conversation_id)
        return {
            "success": True,
            "conversation_id": conversation_id,
            "message_count": len(history),
            "messages": [
                {
                    "type": msg.type,
                    "content": msg.content
                }
                for msg in history
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "chatbot", "version": "2.0.0"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("CHATBOT_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
