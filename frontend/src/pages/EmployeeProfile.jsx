import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await api.get("/auth/profile");
      // backend returns employee document directly
      setEmployee(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="mx-auto max-w-6xl p-6">Loading profile...</div>;
  if (!employee) return <div className="mx-auto max-w-6xl p-6">Profile not found.</div>;

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Top hero */}
      <section className="rounded-[22px] bg-white border border-hairline p-8 md:p-12" style={{ boxSizing: 'border-box' }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1
              className="font-display text-4xl md:text-6xl leading-tight"
              style={{ letterSpacing: '-1px', fontFamily: 'CohereText, Space Grotesk, Inter, system-ui' }}
            >
              {employee.name}
            </h1>

            <p className="mt-3 text-sm text-ink" style={{ color: '#212121' }}>
              {employee.email}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full bg-[#f5f6f7] px-3 py-1 text-sm" style={{ borderRadius: 20 }}>
                {employee.department || '—'}
              </div>

              <div className="ml-2">
                <button className="px-4 py-2 rounded-[32px] bg-[#17171c] text-white text-sm font-medium">Edit profile</button>
              </div>

              <button className="ml-3 text-sm text-action-blue underline" style={{ color: '#1863dc' }}>Download resume</button>
            </div>
          </div>

          {/* small stat card cluster */}
          <div className="flex gap-4 md:gap-6">
            <div className="rounded-[16px] bg-white border border-hairline p-4 text-center min-w-[140px]">
              <div className="text-sm text-slate-500">Fit Score</div>
              <div className="mt-2 text-2xl font-bold">{employee.fitScore ?? 0}%</div>
            </div>

            <div className="rounded-[16px] bg-white border border-hairline p-4 text-center min-w-[140px]">
              <div className="text-sm text-slate-500">Matched Skills</div>
              <div className="mt-2 text-2xl font-bold">{employee.matchedSkills?.length ?? 0}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-[16px] bg-white border border-hairline p-6">
            <h2 className="mb-4 text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {employee.skills?.length ? (
                employee.skills.map((skill) => (
                  <span key={skill} className="rounded-sm bg-[#fff6f3] px-3 py-1 text-sm" style={{ borderRadius: 8 }}>
                    {skill}
                  </span>
                ))
              ) : (
                <div className="text-sm text-slate-500">No skills listed.</div>
              )}
            </div>
          </div>

          <div className="rounded-[16px] bg-white border border-hairline p-6">
            <h2 className="mb-4 text-xl font-semibold">Strengths</h2>
            <ul className="space-y-2 list-inside">
              {employee.strengths?.length ? (
                employee.strengths.map((s, i) => <li key={i}>• {s}</li>)
              ) : (
                <li className="text-slate-500">No strengths listed.</li>
              )}
            </ul>
          </div>

          <div className="rounded-[16px] bg-white border border-hairline p-6">
            <h2 className="mb-4 text-xl font-semibold">Areas To Improve</h2>
            <ul className="space-y-2 list-inside">
              {employee.weaknesses?.length ? (
                employee.weaknesses.map((w, i) => <li key={i}>• {w}</li>)
              ) : (
                <li className="text-slate-500">No weaknesses listed.</li>
              )}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[16px] bg-white border border-hairline p-6">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">Suggested Role</h3>
            <div className="text-lg font-semibold">{employee.suggestedRole || '—'}</div>
          </div>

          <div className="rounded-[16px] bg-white border border-hairline p-6">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">Recommended Training</h3>
            <ul className="space-y-2">
              {employee.suggestedTraining?.length ? (
                employee.suggestedTraining.map((t, i) => <li key={i}>• {t}</li>)
              ) : (
                <li className="text-slate-500">No recommendations yet.</li>
              )}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}