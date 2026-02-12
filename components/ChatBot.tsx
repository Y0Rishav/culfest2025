import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CHATBOT_API =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8000";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isStreaming?: boolean;
}

// Markdown renderer for bot messages
function BotMarkdown({
  text,
  isStreaming,
}: {
  text: string;
  isStreaming?: boolean;
}) {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline decoration-yellow-400/40 underline-offset-2 transition-colors hover:text-yellow-300"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-yellow-300">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-300">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-1 ml-4 list-disc space-y-0.5 text-gray-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-1 ml-4 list-decimal space-y-0.5 text-gray-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm leading-relaxed text-gray-200">
              {children}
            </li>
          ),
          p: ({ children }) => (
            <p className="my-1 text-sm leading-relaxed text-gray-100">
              {children}
            </p>
          ),
          h1: ({ children }) => (
            <h1 className="mb-1 mt-2 text-lg font-bold text-yellow-400">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-1 mt-2 text-base font-bold text-yellow-400">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-1 mt-1 text-sm font-bold text-yellow-300">
              {children}
            </h3>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="rounded bg-gray-700 px-1 py-0.5 text-xs text-yellow-300">
                {children}
              </code>
            ) : (
              <code className="block overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-200">
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-1 border-l-2 border-yellow-400 pl-3 italic text-gray-400">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-2 border-gray-700" />,
        }}
      >
        {text}
      </ReactMarkdown>
      {isStreaming && (
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-blink bg-yellow-400 align-middle" />
      )}
    </div>
  );
}

export default function ChatBot() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Yo! Culfest 2026 ka assistant hoon bhai. Events, categories, registration — jo bhi puchna hai puch! 🎪",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<{
    message: string;
    tool: string;
    args: Record<string, any>;
  } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        text: "",
        sender: "bot",
        timestamp: new Date(),
        isStreaming: true,
      },
    ]);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${CHATBOT_API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          conversation_id: conversationId,
          stream: true,
          user_session: session || null,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === "conversation_id" && data.conversation_id) {
                setConversationId(data.conversation_id);
              } else if (data.type === "token" && data.token) {
                accumulatedText += data.token;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText }
                      : msg,
                  ),
                );
              } else if (data.type === "interrupt") {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: data.message, isStreaming: false }
                      : msg,
                  ),
                );
                setPendingConfirmation({
                  message: data.message,
                  tool: data.tool,
                  args: data.args,
                });
              } else if (data.type === "done") {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, isStreaming: false }
                      : msg,
                  ),
                );
              } else if (data.type === "error") {
                throw new Error(data.error);
              }
            } catch (parseError) {
              if (parseError instanceof SyntaxError) continue;
              throw parseError;
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== botMessageId);
        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            text:
              error.name === "AbortError"
                ? "Request cancelled."
                : error.message || "Sorry, I encountered an error.",
            sender: "bot",
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConfirmAction = async (action: "approve" | "reject") => {
    const actionText = action === "approve" ? "✅ Approved" : "❌ Cancelled";
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: actionText,
        sender: "user" as const,
        timestamp: new Date(),
      },
    ]);
    setPendingConfirmation(null);
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        text: "",
        sender: "bot" as const,
        timestamp: new Date(),
        isStreaming: true,
      },
    ]);

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${CHATBOT_API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "",
          conversation_id: conversationId,
          stream: true,
          user_session: session || null,
          resume_action: action,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let accText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === "token" && data.token) {
                accText += data.token;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId ? { ...msg, text: accText } : msg,
                  ),
                );
              } else if (data.type === "interrupt") {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId
                      ? { ...msg, text: data.message, isStreaming: false }
                      : msg,
                  ),
                );
                setPendingConfirmation({
                  message: data.message,
                  tool: data.tool,
                  args: data.args,
                });
              } else if (data.type === "done") {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId ? { ...msg, isStreaming: false } : msg,
                  ),
                );
              } else if (data.type === "error") {
                throw new Error(data.error);
              }
            } catch (parseError) {
              if (parseError instanceof SyntaxError) continue;
              throw parseError;
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Confirm action error:", error);
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== botMsgId);
        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            text: error.message || "Error occurred.",
            sender: "bot" as const,
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        text: "Chat cleared! Bol bhai, kya chahiye? 🎪",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setConversationId(null);
    setPendingConfirmation(null);
  };

  const suggestedQuestions = [
    "What events are available?",
    "Show me dance events",
    "Tell me about Battle of Bands",
    "What categories do you have?",
  ];

  return (
    <>
      {/* Floating Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg transition-all hover:scale-110 hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </motion.button>

      {/* Modal Overlay + Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 z-[70] mx-auto my-auto flex max-h-[90vh] max-w-2xl flex-col overflow-hidden rounded-3xl bg-gray-950 shadow-2xl sm:inset-10 md:inset-16"
              style={{
                border: "2px solid rgba(255, 215, 0, 0.25)",
                boxShadow:
                  "0 0 60px rgba(255, 215, 0, 0.15), 0 25px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4">
                <div>
                  <h3 className="font-Bangers text-2xl tracking-wider text-white">
                    🎪 Culfest Assistant
                  </h3>
                  <p className="text-sm text-white/80">
                    Ask me anything about events!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClearHistory}
                    className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                    title="Clear conversation"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                    title="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                          : "bg-gray-800/80 text-white"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <BotMarkdown
                          text={message.text}
                          isStreaming={message.isStreaming}
                        />
                      ) : (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.text}
                        </p>
                      )}
                      {!message.isStreaming && (
                        <p className="mt-1.5 text-[10px] opacity-50">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Loading dots */}
                {isLoading &&
                  !messages.some((m) => m.isStreaming && m.text.length > 0) &&
                  messages[messages.length - 1]?.sender === "user" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-2xl bg-gray-800 px-4 py-3">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-yellow-400" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-yellow-400 [animation-delay:0.1s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-yellow-400 [animation-delay:0.2s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                {/* HITL Confirmation Buttons */}
                {pendingConfirmation && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start px-1"
                  >
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConfirmAction("approve")}
                        className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-green-500"
                      >
                        ✅ Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConfirmAction("reject")}
                        className="rounded-full bg-red-600/80 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
                      >
                        ❌ Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <div className="border-t border-gray-800 px-5 py-3">
                  <p className="mb-2 text-xs text-gray-500">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="rounded-full bg-gray-800 px-3 py-1.5 text-xs text-yellow-400 transition-all hover:bg-gray-700 hover:text-yellow-300"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Bar */}
              <div className="border-t border-gray-800 p-4">
                <div className="flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 rounded-full bg-gray-800 px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                    disabled={isLoading || !!pendingConfirmation}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    disabled={
                      !inputMessage.trim() || isLoading || !!pendingConfirmation
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white transition-all disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
