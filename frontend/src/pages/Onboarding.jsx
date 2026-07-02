import { useState } from "react";
import api from "../services/api";
import {
  Upload,
  User,
  Mail,
  Building2,
  FileUp,
  CheckCircle,
} from "lucide-react";

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
    if (!resume) return;
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
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Personnel Onboarding</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
            Ingest Employee
          </h1>
          <p className="font-body text-slate text-sm mt-1">
            Provide profile telemetry and upload career resume (PDF format) for system parser.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 space-y-8">
        {/* Form Container */}
        <div className="border border-hairline bg-canvas p-8 rounded-lg shadow-sm">
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-6 pb-2 border-b border-hairline">
            Profile Credentials
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                  <User className="h-4 w-4 opacity-60" />
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                  <Mail className="h-4 w-4 opacity-60" />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="e.g. email@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                Target Department
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                  <Building2 className="h-4 w-4 opacity-60" />
                </span>
                <input
                  name="department"
                  type="text"
                  placeholder="e.g. Engineering"
                  value={form.department}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                Resume Document (PDF)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
                  <FileUp className="h-4 w-4 opacity-60" />
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xs border border-hairline bg-canvas font-mono text-xs text-primary file:mr-4 file:rounded-xs file:border-0 file:bg-soft-stone file:px-3 file:py-1.5 file:text-xs file:font-mono file:uppercase file:tracking-wider file:text-primary file:cursor-pointer hover:file:bg-hairline focus:outline-none focus:border-form-focus transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill py-3 hover:bg-cohere-black transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary border-t-transparent" />
                  Processing Resume...
                </span>
              ) : (
                "Upload & Onboard"
              )}
            </button>
          </form>
        </div>

        {/* Success Result Panel */}
        {employee && (
          <div className="border border-hairline bg-canvas p-8 rounded-sm space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-hairline">
              <CheckCircle className="h-5 w-5 text-deep-green" />
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                Telemetry Output: Employee Record Created
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-display text-2xl font-bold tracking-tight text-primary uppercase">
                  {employee.name}
                </p>
                <p className="font-mono text-xs text-slate mt-1">{employee.email}</p>
                <span className="inline-block mt-3 font-mono text-[10px] uppercase tracking-wider bg-soft-stone text-primary px-2 py-0.5 rounded-xs">
                  {employee.department}
                </span>
              </div>

              <div className="border border-hairline p-4 rounded-sm bg-soft-stone/30">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1">
                  System Candidate Fit Score
                </span>
                <span className="font-mono text-4xl font-bold text-primary">
                  {employee.fitScore ?? 0}%
                </span>
              </div>
            </div>

            {/* AI recommendation */}
            <div className="border border-hairline bg-pale-blue/30 p-5 rounded-sm">
              <h3 className="font-mono text-xs uppercase tracking-wider text-action-blue font-bold mb-2">
                AI Alignment Placement Recommendation
              </h3>
              <p className="font-body text-sm font-semibold text-primary">
                {employee.recommendedDepartment}
              </p>
              <p className="font-body text-xs text-slate mt-2 leading-relaxed">
                {employee.departmentReason}
              </p>
            </div>

            {/* Suggested role details */}
            {employee.suggestedRole && (
              <div className="border border-hairline p-5 rounded-sm">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1">
                  Suggested Corporate Role
                </span>
                <p className="font-body text-sm font-semibold text-primary">{employee.suggestedRole}</p>
              </div>
            )}

            {/* Skills categorizations */}
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate mb-2">Identified Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.skills?.map((skill, index) => (
                    <span key={index} className="font-mono text-[9px] uppercase tracking-wider border border-hairline px-1.5 py-0.5 rounded-xs bg-canvas text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-deep-green mb-2">Matched Competencies</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.matchedSkills?.map((skill) => (
                    <span key={skill} className="font-mono text-[9px] uppercase tracking-wider bg-pale-green text-deep-green px-1.5 py-0.5 rounded-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-coral mb-2">Development Areas</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.missingSkills?.map((skill) => (
                    <span key={skill} className="font-mono text-[9px] uppercase tracking-wider bg-coral-soft/10 text-coral px-1.5 py-0.5 rounded-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid gap-4 md:grid-cols-2">
              {employee.strengths?.length > 0 && (
                <div className="border border-hairline bg-pale-green/10 p-4 rounded-sm">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-deep-green font-bold mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-1">
                    {employee.strengths.map((s) => (
                      <span key={s} className="font-mono text-[9px] uppercase bg-pale-green text-deep-green px-1.5 py-0.5 rounded-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {employee.weaknesses?.length > 0 && (
                <div className="border border-hairline bg-coral-soft/5 p-4 rounded-sm">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-coral font-bold mb-2">Development Items</h4>
                  <div className="flex flex-wrap gap-1">
                    {employee.weaknesses.map((w) => (
                      <span key={w} className="font-mono text-[9px] uppercase bg-coral-soft/10 text-coral px-1.5 py-0.5 rounded-xs">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Training */}
            {employee.suggestedTraining?.length > 0 && (
              <div className="border border-hairline p-4 rounded-sm bg-soft-stone/20">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary font-bold mb-2">Suggested Curriculums</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.suggestedTraining.map((t) => (
                    <span key={t} className="font-mono text-[9px] uppercase bg-canvas border border-hairline px-2 py-0.5 rounded-xs text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!employee && (
          <div className="border border-dashed border-hairline rounded-sm bg-soft-stone/30 p-8 text-center">
            <Upload className="mx-auto h-8 w-8 text-slate opacity-60 mb-2" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate">
              Awaiting credentials and resume submission.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
