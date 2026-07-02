import { useEffect, useState } from "react";
import api from "../services/api";
import { Calendar, User, Clock, CheckCircle, XCircle, Sparkles, Users } from "lucide-react";

export default function LeaveRecommendation() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employeeId: "", startDate: "", endDate: "", reason: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data } = await api.get("/onboarding");
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/leave/recommend", form);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to get recommendation");
    } finally {
      setLoading(false);
    }
  };

  const leaveDays = form.startDate && form.endDate
    ? Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  const selectedEmployee = employees.find((emp) => emp._id === form.employeeId);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Automated Operations</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
            Leave Evaluator
          </h1>
          <p className="font-body text-slate text-sm mt-1">
            Analyze leave requests against corporate guidelines, active schedules, and coverage plans.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 space-y-8">
        {/* Form Container */}
        <div className="border border-hairline bg-canvas p-8 rounded-lg shadow-sm">
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-6 pb-2 border-b border-hairline">
            Request Parameters
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                Target Employee
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                  <Users className="h-4 w-4 opacity-60" />
                </span>
                <select
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
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

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Start Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                    <Calendar className="h-4 w-4 opacity-60" />
                  </span>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  End Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                    <Calendar className="h-4 w-4 opacity-60" />
                  </span>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                Stated Reason
              </label>
              <textarea
                name="reason"
                rows="4"
                placeholder="Explain the operational rationale for leave..."
                value={form.reason}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill py-3 hover:bg-cohere-black transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary border-t-transparent" />
                  Running Recommendation Model...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-coral" />
                  Evaluate Leave Request
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Summary */}
        {result && (
          <div className="border border-hairline bg-canvas p-8 rounded-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                Evaluation Output
              </h2>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-xs border ${
                  result.recommendation === "Approve"
                    ? "bg-pale-green text-deep-green border-deep-green/10"
                    : "bg-coral-soft/10 text-coral border-coral-soft/20"
                }`}
              >
                {result.recommendation}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="border border-hairline p-4 rounded-sm bg-soft-stone/30">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate block mb-1">
                  Employee
                </span>
                <p className="font-body text-sm font-semibold text-primary">{selectedEmployee?.name || "—"}</p>
              </div>

              <div className="border border-hairline p-4 rounded-sm bg-soft-stone/30">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate block mb-1">
                  Start Date
                </span>
                <p className="font-mono text-xs font-semibold text-primary">{form.startDate}</p>
              </div>

              <div className="border border-hairline p-4 rounded-sm bg-soft-stone/30">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate block mb-1">
                  End Date
                </span>
                <p className="font-mono text-xs font-semibold text-primary">{form.endDate}</p>
              </div>

              <div className="border border-hairline p-4 rounded-sm bg-soft-stone/30">
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate block mb-1">
                  Duration
                </span>
                <p className="font-mono text-xs font-semibold text-primary">
                  {leaveDays} day{leaveDays !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="border border-hairline p-5 rounded-sm">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1">Stated Reason</span>
              <p className="font-body text-sm text-ink leading-relaxed">{form.reason}</p>
            </div>

            <div className="border border-hairline bg-pale-blue/30 p-5 rounded-sm">
              <span className="font-mono text-[10px] uppercase tracking-wider text-action-blue font-bold block mb-1">AI Recommendation Telemetry</span>
              <p className="font-body text-xs text-slate mt-1 leading-relaxed whitespace-pre-line">{result.aiReason}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && (
          <div className="border border-dashed border-hairline rounded-sm bg-soft-stone/30 p-8 text-center">
            <Calendar className="mx-auto h-8 w-8 text-slate opacity-60 mb-2" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate">
              Awaiting query parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}