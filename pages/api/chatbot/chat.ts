import { NextApiRequest, NextApiResponse } from "next";

const CHATBOT_API_URL = process.env.CHATBOT_API_URL || "http://localhost:8000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      message,
      conversation_id,
      stream = true,
      user_session,
      resume_action,
    } = req.body;

    if ((!message || message.trim().length === 0) && !resume_action) {
      return res.status(400).json({
        message: "Message is required",
        success: false,
      });
    }

    // If streaming is requested, use the streaming endpoint
    if (stream) {
      // Set headers for SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");

      try {
        const streamResponse = await fetch(`${CHATBOT_API_URL}/chat/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message || "",
            conversation_id: conversation_id || null,
            stream: true,
            user_session: user_session || null,
            resume_action: resume_action || null,
          }),
        });

        if (!streamResponse.ok) {
          throw new Error(`Chatbot API returned ${streamResponse.status}`);
        }

        const reader = streamResponse.body?.getReader();
        if (!reader) {
          throw new Error("No reader available");
        }

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            res.end();
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          res.write(chunk);
        }
      } catch (error: any) {
        console.error("Streaming error:", error);
        res.write(
          `data: ${JSON.stringify({
            type: "error",
            error: error.message,
          })}\n\n`,
        );
        res.end();
      }
    } else {
      // Fallback to non-streaming endpoint
      const response = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message || "",
          conversation_id: conversation_id || null,
          stream: false,
          user_session: user_session || null,
          resume_action: resume_action || null,
        }),
        signal: AbortSignal.timeout(30000),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to get response");
      }

      return res.status(200).json({
        success: true,
        response: data.response,
        conversation_id: data.conversation_id,
      });
    }
  } catch (error: any) {
    console.error("Error communicating with chatbot:", error);

    if (error.name === "AbortError") {
      return res.status(408).json({
        message: "Request timeout. Please try again.",
        success: false,
      });
    }

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        message:
          "Chatbot service is currently unavailable. Please try again later.",
        success: false,
      });
    }

    return res.status(500).json({
      message: "Failed to get response from chatbot",
      error: error.message,
      success: false,
    });
  }
}
 
