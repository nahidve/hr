import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { Send, Bot, User, Sparkles, Copy, Check } from "lucide-react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="text-slate hover:text-white transition-colors p-1"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

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
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Internal AI Assistant</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
            Policy Knowledge Graph
          </h1>
          <p className="font-body text-slate text-sm mt-1">
            Query the corporate knowledge base regarding employment, benefits, operations, and compliance guidelines.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 md:px-8">
        {/* Agent Console Card */}
        <div className="bg-primary text-on-dark rounded-sm border border-cohere-black shadow-lg overflow-hidden font-mono">
          {/* Console Header Bar */}
          <div className="bg-cohere-black/45 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-slate font-bold">Model: Command-R+</span>
            </div>
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex h-[450px] flex-col justify-between">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-3">
                  <Sparkles className="h-6 w-6 text-coral" />
                  <p className="text-xs uppercase tracking-wider text-slate max-w-xs">
                    Ready for prompt input. Ask about leaves, remote policy, structure, or guidelines.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div key={index} className="space-y-4">
                      {/* User Prompt */}
                      <div className="flex justify-end">
                        <div className="max-w-[85%] bg-deep-green border border-white/10 px-4 py-3 rounded-xs">
                          <div className="flex items-center gap-1.5 mb-1 text-[10px] text-coral uppercase tracking-wider">
                            <User className="h-3 w-3" />
                            <span>User</span>
                          </div>
                          <p className="font-body text-xs text-white leading-relaxed">{msg.question}</p>
                        </div>
                      </div>

                      {/* AI Agent Response */}
                      <div className="flex justify-start">
                        <div className="max-w-[85%] bg-white/5 border border-white/10 px-4 py-3 rounded-xs">
                          <div className="flex items-center justify-between gap-1.5 mb-1 text-[10px] text-action-blue uppercase tracking-wider">
                            <div className="flex items-center gap-1.5">
                              <Bot className="h-3 w-3" />
                              <span>Command-R+ Response</span>
                            </div>
                            <CopyButton text={msg.answer} />
                          </div>
                          <p className="font-body text-xs text-on-dark/95 leading-relaxed whitespace-pre-line">{msg.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xs">
                    <span className="inline-flex gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="bg-cohere-black/25 border-t border-white/10 p-4">
              <div className="flex gap-2 items-center">
                <textarea
                  rows="1"
                  placeholder="Insert prompt here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xs px-4 py-3 text-xs text-white placeholder-slate focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral transition-colors resize-none font-mono"
                />
                <button
                  onClick={askQuestion}
                  disabled={loading || !question.trim()}
                  className="bg-white text-primary font-mono text-[10px] uppercase tracking-wider rounded-pill px-5 py-3 hover:bg-soft-stone disabled:opacity-40 transition-opacity"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}