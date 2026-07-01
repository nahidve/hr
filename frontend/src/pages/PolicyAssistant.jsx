import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { MovingBorder } from "../components/ui/moving-border";
import { ShimmerButton } from "../components/ui/shimmer-button";

export default function PolicyAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim()) return;
    const currentQuestion = question;

    try {
      setLoading(true);
      const { data } = await api.post("/policies/ask", { question: currentQuestion });
      setMessages((prev) => [...prev, { question: currentQuestion, answer: data.answer }]);
      setQuestion("");
    } catch (error) {
      console.error(error);
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-slate-900">HR Policy Assistant</h1>
          <p className="text-sm text-slate-500">Ask questions about company policies</p>
        </motion.div>

        {/* Chat Container */}
        <MovingBorder className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex h-[400px] flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Sparkles className="h-8 w-8 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-400">Ask about leave policies, remote work, benefits, or any HR topic</p>
                </div>
              ) : (
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {/* User */}
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-xl bg-slate-100 px-4 py-2.5">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="h-3.5 w-3.5 text-slate-500" />
                            <span className="text-xs font-medium text-slate-500">You</span>
                          </div>
                          <p className="text-sm text-slate-800">{msg.question}</p>
                        </div>
                      </div>

                      {/* Assistant */}
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-3.5 w-3.5 text-slate-600" />
                            <span className="text-xs font-medium text-slate-500">HR Assistant</span>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700">{msg.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 p-3">
              <div className="flex gap-2">
                <textarea
                  rows="1"
                  placeholder="Ask a question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
                <ShimmerButton
                  onClick={askQuestion}
                  disabled={loading || !question.trim()}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </ShimmerButton>
              </div>
            </div>
          </div>
        </MovingBorder>
      </div>
    </div>
  );
}