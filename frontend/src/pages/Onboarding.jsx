import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import {
  Upload,
  User,
  Mail,
  Building2,
  FileUp,
  CheckCircle,
} from "lucide-react";
import { MovingBorder } from "../components/ui/moving-border";
import { ShimmerButton } from "../components/ui/shimmer-button";

export default function Onboarding() {
  const [form, setForm] = useState({ name: "", email: "", department: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("department", form.department);
      formData.append("resume", resume);

      const { data } = await api.post("/onboarding", formData);
      setEmployee(data);
      setForm({ name: "", email: "", department: "" });
      setResume(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-semibold text-slate-900">
            Employee Onboarding
          </h1>
          <p className="text-sm text-slate-500">
            Add new employees to the system
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <MovingBorder className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm outline-none transition-colors focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="relative">
                <FileUp className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  className="w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-500 outline-none transition-colors file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:text-slate-700 hover:file:bg-slate-200 focus:border-slate-400 focus:bg-white"
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
                    Processing...
                  </span>
                ) : (
                  "Create Employee"
                )}
              </ShimmerButton>
            </form>
          </MovingBorder>
        </motion.div>

        {/* Success Result */}
        <AnimatePresence>
          {employee && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-xl border border-emerald-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Employee Created
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {employee.name}
                  </p>

                  <p className="text-sm text-slate-500">{employee.email}</p>

                  <p className="text-sm text-slate-500">
                    {employee.department}
                  </p>
                </div>

                {/* Fit Score */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Candidate Fit Score</p>

                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    {employee.fitScore ?? 0}%
                  </p>
                </div>

                {/* Skills */}
                {employee.skills?.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Skills */}
                {employee.matchedSkills?.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-green-700">
                      Matched Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {employee.matchedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {employee.missingSkills?.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-red-700">
                      Missing Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {employee.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {employee.experienceSummary && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Experience Summary
                    </p>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {employee.experienceSummary}
                    </p>
                  </div>
                )}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900">
                    AI Department Recommendation
                  </h3>

                  <p className="mt-2 text-lg font-bold text-blue-700">
                    {employee.recommendedDepartment}
                  </p>

                  <p className="mt-2 text-sm text-blue-800">
                    {employee.departmentReason}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!employee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white/50 p-8 text-center backdrop-blur-sm"
          >
            <Upload className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm text-slate-400">
              Fill in the details and upload a resume to onboard an employee
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
