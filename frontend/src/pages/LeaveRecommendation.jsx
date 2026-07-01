import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { Calendar, User, Clock, CheckCircle, XCircle, Sparkles, Users } from "lucide-react";
import { MovingBorder } from "../components/ui/moving-border";
import { ShimmerButton } from "../components/ui/shimmer-button";

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
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-slate-900">AI Leave Recommendation</h1>
          <p className="text-sm text-slate-500">Get AI-powered leave request analysis</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <MovingBorder className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Employee</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">Reason</label>
                <textarea
                  rows="4"
                  name="reason"
                  placeholder="Explain why the employee is requesting leave..."
                  value={form.reason}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </div>

              <ShimmerButton
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-lg bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Get AI Recommendation
                  </span>
                )}
              </ShimmerButton>
            </form>
          </MovingBorder>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Leave Review Summary</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    result.recommendation === "Approve"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {result.recommendation}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Employee</p>
                  <p className="text-sm font-medium text-slate-900">{selectedEmployee?.name || "—"}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Start Date</p>
                  <p className="text-sm font-medium text-slate-900">{form.startDate}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">End Date</p>
                  <p className="text-sm font-medium text-slate-900">{form.endDate}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="text-sm font-medium text-slate-900">{leaveDays} day{leaveDays !== 1 ? "s" : ""}</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Reason</p>
                <p className="mt-1 text-sm text-slate-700">{form.reason}</p>
              </div>

              <div className="mt-3 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">AI Analysis</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{result.aiReason}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white/50 p-8 text-center backdrop-blur-sm"
          >
            <Calendar className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm text-slate-400">Select an employee and leave details to get AI-powered recommendation</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}