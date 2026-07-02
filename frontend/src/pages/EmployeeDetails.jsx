import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function EmployeeDetails() {
  const { id } = useParams();
  console.log("ID:", id);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      console.log(`/onboarding/${id}`);
      const { data } = await api.get(`/onboarding/${id}`);
      console.log(data);
      setEmployee(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-6xl p-6">Loading...</div>;
  }
  if (!employee) {
    return <div className="mx-auto max-w-6xl p-6">Employee not found</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{employee.name}</h1>

        <p className="mt-2 text-slate-500">{employee.email}</p>

        <span className="mt-4 inline-block rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
          {employee.department}
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Skills</h2>

        <div className="flex flex-wrap gap-2">
          {employee.skills?.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Experience Summary</h2>

        <p className="leading-relaxed text-slate-700">
          {employee.experienceSummary}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Resume Content</h2>

        <div className="max-h-80 overflow-y-auto rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          {employee.resumeText}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">AI Recommendation</h2>

        <p className="text-lg font-semibold">
          {employee.recommendedDepartment}
        </p>

        <p className="mt-2 text-slate-600">{employee.departmentReason}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Resume Insights</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Suggested Role</h3>

            <p className="mt-2">{employee.suggestedRole}</p>
          </div>

          <div>
            <h3 className="font-medium">Strengths</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {employee.strengths?.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium">Development Areas</h3>

            <div className="mt-2 flex flex-wrap gap-2">
              {employee.weaknesses?.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">Profile Metadata</h2>

        <p className="text-slate-500">
          Created: {new Date(employee.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
