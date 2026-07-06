import { useEffect, useState } from "react";
import api from "../services/api";
import { Sparkles, FileText, Download, Users, Copy, Check } from "lucide-react";

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
      className="border border-hairline bg-canvas text-primary font-mono text-[10px] uppercase tracking-wider rounded-pill px-4 py-2 hover:bg-soft-stone transition-colors inline-flex items-center gap-1.5"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600 animate-pulse" /> Copied!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copy Text
        </>
      )}
    </button>
  );
}

export default function InterviewGenerator() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data } = await api.get("/onboarding");
      setEmployees(data);
    } catch (e) {
      console.error(e);
    }
  };

  const generate = async () => {
    if (!employeeId) return;
    try {
      setLoading(true);
      const { data } = await api.post("/interviews/generate", {
        employeeId,
      });
      setQuestions(data.questions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      await api.post("/interviews/save", {
        employeeId,
        questions,
      });
      alert("Interview set saved");
    } catch (e) {
      console.error(e);
    }
  };

  const selectedEmployee = employees.find((emp) => emp._id === employeeId);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Talent Alignment</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
            Interview Generator
          </h1>
          <p className="font-body text-slate text-sm mt-1">
            Generate custom candidate interview question sets based on specific resume profiles and role alignment metrics.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 grid gap-8 lg:grid-cols-12">
        {/* Form Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="border border-hairline bg-canvas p-8 rounded-lg shadow-sm">
            <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-6 pb-2 border-b border-hairline">
              Select Profile
            </h2>

            <div className="space-y-5">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Target Candidate / Employee
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                    <Users className="h-4 w-4 opacity-60" />
                  </span>
                  <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors appearance-none"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name} ({emp.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={generate}
                disabled={loading || !employeeId}
                className="w-full bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill py-3 hover:bg-cohere-black transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary border-t-transparent" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-coral" />
                    Generate Questions
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
            Generated Questions Set
          </h2>

          {questions ? (
            <div className="border border-hairline bg-soft-stone p-8 rounded-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-hairline">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-primary" /> Profile: {selectedEmployee?.name}
                </span>

                <div className="flex gap-2">
                  <CopyButton text={questions} />
                  <button
                    onClick={save}
                    className="bg-primary text-on-primary font-mono text-[10px] uppercase tracking-wider rounded-pill px-4 py-2 hover:bg-cohere-black transition-colors inline-flex items-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" /> Save Set
                  </button>
                </div>
              </div>

              <div className="font-body text-sm text-ink leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto pr-2">
                {questions}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-hairline rounded-sm bg-soft-stone/30 p-8 text-center">
              <FileText className="mx-auto h-8 w-8 text-slate opacity-60 mb-2" />
              <p className="font-mono text-xs uppercase tracking-wider text-slate">
                No interview questions generated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
