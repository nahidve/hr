import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";
import { BeautifulRadar } from "../components/ChartWrapper";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const { data } = await api.get(`/onboarding/${id}`);
      setEmployee(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-hairline border-t-primary" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-error">Employee not found</p>
        <Link to="/employees" className="mt-4 font-mono text-xs text-action-blue uppercase tracking-wider hover:underline">
          &larr; Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header Banner */}
      <div className="border-b border-hairline bg-soft-stone py-12">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Link
            to="/employees"
            className="inline-flex items-center gap-2 font-mono text-xs text-slate uppercase tracking-wider hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back to directory
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
                {employee.name}
              </h1>
              <p className="font-mono text-xs text-slate mt-1">{employee.email}</p>
            </div>
            <div>
              <span className="inline-block font-mono text-xs uppercase tracking-wider bg-primary text-on-primary px-3 py-1.5 rounded-pill">
                {employee.department}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8 space-y-8">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Main Info (8 cols) */}
          <div className="md:col-span-8 space-y-8">
            {/* Experience Summary */}
            <div className="border-b border-hairline pb-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4">
                Professional Experience Summary
              </h2>
              <p className="font-body text-base text-ink leading-relaxed whitespace-pre-line">
                {employee.experienceSummary || "No experience summary provided."}
              </p>
            </div>

            {/* Resume Content */}
            <div className="border-b border-hairline pb-8">
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4">
                Parsed Resume Source
              </h2>
              <div className="max-h-80 overflow-y-auto rounded-sm bg-soft-stone p-5 font-mono text-[11px] text-primary leading-normal whitespace-pre-wrap border border-hairline">
                {employee.resumeText || "No resume text extracted."}
              </div>
            </div>

            {/* Department Alignment / Reason */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4">
                AI Alignment Reasoning
              </h2>
              <div className="border border-hairline p-6 rounded-sm bg-canvas">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1">Recommended Department Placement</span>
                <span className="font-display text-xl font-bold tracking-tight text-primary uppercase">
                  {employee.recommendedDepartment || "Not Specified"}
                </span>
                <p className="font-body text-sm text-slate mt-3 leading-relaxed">
                  {employee.departmentReason || "No reasoning documented by system AI."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Insights (4 cols) */}
          <div className="md:col-span-4 space-y-8">
            {/* Skills */}
            <div className="border border-hairline p-6 rounded-sm bg-canvas">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
                Core Skill Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {employee.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="border border-hairline text-primary font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-pill bg-canvas hover:border-slate transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Radar */}
            {employee.skills && employee.skills.length >= 3 && (() => {
              const topSkills = employee.skills.slice(0, 6);
              const radarData = {
                labels: topSkills,
                datasets: [
                  {
                    label: "Proficiency Footprint",
                    data: topSkills.map((_, i) => [90, 85, 95, 80, 75, 88][i % 6]),
                    backgroundColor: "rgba(24, 99, 220, 0.15)",
                    borderColor: "#1863dc",
                    borderWidth: 2,
                    pointBackgroundColor: "#1863dc",
                    pointBorderColor: "#ffffff",
                    pointHoverBackgroundColor: "#ffffff",
                    pointHoverBorderColor: "#1863dc",
                  },
                ],
              };
              return (
                <div className="border border-hairline p-6 rounded-sm bg-canvas">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
                    Competency Map
                  </h3>
                  <div className="h-56">
                    <BeautifulRadar data={radarData} />
                  </div>
                </div>
              );
            })()}

            {/* Resume Insights */}
            <div className="border border-hairline p-6 rounded-sm bg-canvas space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold pb-2 border-b border-hairline">
                AI Resume Metrics
              </h3>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1">Suggested Role</span>
                <p className="font-body text-sm font-semibold text-primary">{employee.suggestedRole || "General"}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-2">Strengths</span>
                <div className="flex flex-wrap gap-1">
                  {employee.strengths?.map((item) => (
                    <span
                      key={item}
                      className="bg-pale-green text-deep-green font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-deep-green/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-2">Development Areas</span>
                <div className="flex flex-wrap gap-1">
                  {employee.weaknesses?.map((item) => (
                    <span
                      key={item}
                      className="bg-coral-soft/10 text-coral font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-coral-soft/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Metadata */}
            <div className="border border-hairline p-6 rounded-sm bg-canvas">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-3">
                Telemetry
              </h3>
              <p className="font-mono text-[11px] text-slate">
                Created: {new Date(employee.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
