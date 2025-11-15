import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! Welcome to Ramaera Hosting. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_URL = "http://localhost:5000/chat";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { message: userMsg });
      const botReply = res.data.reply || "I'm not sure how to help with that.";
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Server unreachable. Please try again.", sender: "bot" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-block">
            <div className="text-5xl font-bold bg-gradient-to-r from-ramaera-blue via-ramaera-indigo to-cyan-600 bg-clip-text text-transparent animate-gradient">
              Ramaera Hosting
            </div>
          </div>
          <p className="text-xl text-gray-600 font-light">
            Premium Cloud Solutions with AI-Powered Support
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-slow" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow" />
              <span>24/7 AI Support</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse-slow" />
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-fab group"
        aria-label="Open chat"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ramaera-blue to-ramaera-indigo rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse-glow" />
        <div className="relative z-10">
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ramaera-blue to-ramaera-indigo flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  R
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-white">Ramaera AI Assistant</div>
                <div className="text-xs text-white/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                  <span>Active now</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors text-white/90 hover:text-white"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="chat-body">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex animate-message-in ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {msg.sender === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-ramaera-light to-ramaera-blue/20 flex items-center justify-center text-xs font-bold text-ramaera-blue mr-2 shadow-sm">
                      AI
                    </div>
                  )}
                  <div
                    className={`message-bubble ${
                      msg.sender === "user" ? "message-user" : "message-bot"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start animate-message-in">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-ramaera-light to-ramaera-blue/20 flex items-center justify-center text-xs font-bold text-ramaera-blue mr-2 shadow-sm">
                    AI
                  </div>
                  <div className="message-bot">
                    <div className="flex items-center gap-1.5">
                      <span className="typing-dot" />
                      <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
                      <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chat-footer">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="chat-input"
                disabled={loading}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="send-button group"
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1.5">
              <span>Powered by</span>
              <span className="font-semibold bg-gradient-to-r from-ramaera-blue to-ramaera-indigo bg-clip-text text-transparent">
                Gemini 2.5
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
