import { useState } from "react";
import api from "../services/api";

export default function PolicyAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;

    try {
      setLoading(true);

      const { data } = await api.post(
        "/policies/ask",
        {
          question: currentQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: data.answer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        HR Policy Assistant
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <textarea
          rows="4"
          placeholder="Ask an HR policy question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="w-full rounded-lg border border-slate-300 p-4 outline-none focus:border-blue-500"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={askQuestion}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Thinking..."
              : "Ask Assistant"}
          </button>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="mt-8 space-y-4">
          {messages.map(
            (message, index) => (
              <div
                key={index}
                className="space-y-3"
              >
                <div className="ml-auto max-w-2xl rounded-xl bg-blue-600 p-4 text-white">
                  <p className="text-sm font-semibold">
                    You
                  </p>

                  <p>
                    {message.question}
                  </p>
                </div>

                <div className="max-w-2xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="mb-2 text-sm font-semibold text-slate-500">
                    HR Assistant
                  </p>

                  <p className="text-slate-700">
                    {message.answer}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {messages.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Ask a question about leave policies,
          remote work, attendance, benefits,
          or any HR-related topic.
        </div>
      )}
    </div>
  );
}