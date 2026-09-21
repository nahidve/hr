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
  }, [messages, loading]);

  const askQuestion = async (overrideQuestion) => {
    const qText = overrideQuestion || question;
    if (!qText.trim() || loading) return;

    const userMessage = { role: "user", content: qText.trim() };
    const newHistory = [...messages, userMessage];

    // Add user message and an initial empty assistant message for live streaming
    setMessages([...newHistory, { role: "assistant", content: "" }]);
    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const baseURL = api.defaults.baseURL || "http://localhost:5000/api";
      
      const response = await fetch(`${baseURL}/policies/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: newHistory, stream: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          const dataStr = trimmed.replace(/^data:\s*/, "");
          if (dataStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.content) {
              streamedText += parsed.content;
              const currentContent = streamedText
                .replace(/\*\*/g, "")
                .replace(/[—–]/g, "-")
                .replace(/\u202F/g, " ");
              setMessages((prev) => {
                const updated = [...prev];
                if (updated.length > 0) {
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: currentContent,
                  };
                }
                return updated;
              });
            }
          } catch (e) {
            console.error("Stream parse error:", e);
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
      alert("Failed to get response. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
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
              <span className="text-[11px] uppercase tracking-wider text-slate font-bold">HR Policy AI Assistant</span>
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="text-[10px] uppercase tracking-wider text-slate hover:text-coral transition-colors font-mono cursor-pointer"
              >
                Clear Chat
              </button>
            )}
          </div>

          {/* Chat Container */}
          <div className="flex h-[480px] flex-col justify-between">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-6 px-4">
                  <div className="space-y-2">
                    <Sparkles className="mx-auto h-6 w-6 text-coral animate-pulse" />
                    <p className="text-xs uppercase tracking-wider text-slate max-w-sm">
                      Ready for prompt input. Ask about leaves, remote policy, structure, or compliance.
                    </p>
                  </div>

                  <div className="w-full max-w-md space-y-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate block text-center mb-1">Suggested Preset Prompts</span>
                    {[
                      "What is the remote work policy?",
                      "Tell me about annual leave allowance.",
                      "Show maternity and paternity benefits.",
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => askQuestion(preset)}
                        className="w-full text-left bg-white/5 border border-white/10 hover:bg-white/10 hover:border-coral transition-all duration-200 px-4 py-3 rounded-xs text-xs text-on-dark/95 font-mono hover:text-white cursor-pointer block"
                      >
                        &rarr; {preset}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index}>
                      {msg.role === "user" ? (
                        /* User Prompt */
                        <div className="flex justify-end">
                          <div className="max-w-[85%] bg-deep-green border border-white/10 px-4 py-3 rounded-xs">
                            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-coral uppercase tracking-wider">
                              <User className="h-3 w-3" />
                              <span>User</span>
                            </div>
                            <p className="font-body text-xs text-white leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ) : (
                        /* AI Agent Response */
                        <div className="flex justify-start">
                          <div className="max-w-[85%] bg-white/5 border border-white/10 px-4 py-3 rounded-xs">
                            <div className="flex items-center justify-between gap-1.5 mb-1 text-[10px] text-action-blue uppercase tracking-wider">
                              <div className="flex items-center gap-1.5">
                                <Bot className="h-3 w-3" />
                                <span>HR Assistant</span>
                              </div>
                              {msg.content && <CopyButton text={msg.content} />}
                            </div>
                            <p className="font-body text-xs text-on-dark/95 leading-relaxed whitespace-pre-line">
                              {msg.content}
                              {loading && index === messages.length - 1 && (
                                <span className="inline-block w-1.5 h-3.5 bg-coral ml-1 animate-pulse align-middle" />
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {loading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
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