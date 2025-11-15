import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! Welcome to Ramaera Hosting. How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
        { text: "⚠ Server unreachable. Please try again.", sender: "bot" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all z-50 flex items-center justify-center"
      >
        <svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24">
          <path
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.25-.95L3 20l1.5-3.8C3.5 15 3 13.5 3 12c0-4.42 4.03-8 9-8s9 3.58 9 8z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-24 right-6 
            w-[370px] max-w-[95vw] 
            h-[520px] max-h-[80vh]
            bg-white/20 backdrop-blur-xl border border-white/30 
            shadow-2xl rounded-3xl overflow-hidden 
            z-50 animate-fadeIn
          "
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xl font-bold">
                R
              </div>
              <div>
                <div className="font-semibold text-lg">Ramaera Support</div>
                <div className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="px-2 py-1 hover:bg-white/20 rounded"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div
            className="
              flex-1 p-4 overflow-y-auto 
              bg-white/10 backdrop-blur-xl 
              scroll-smooth space-y-4 
            "
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm
                ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
                    : "bg-white/80 backdrop-blur-md text-gray-900 border border-gray-200/60"
                }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/80 px-3 py-2 rounded-xl shadow flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/30 backdrop-blur-xl border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white shadow hover:scale-105 transition disabled:opacity-50"
              >
                ➤
              </button>
            </div>
            <p className="text-xs text-center text-white/70 mt-2">
              Powered by <strong>Gemini 2.5</strong>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
