import { useEffect, useState } from "react";
import api from "../services/api";

export default function EmployeeProfile() {
  const [employee, setEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const { data } =
          await api.get(
            "/auth/profile"
          );

        setEmployee(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        Loading profile...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">
          {employee.name}
        </h1>

        <p className="mt-2 text-slate-500">
          {employee.email}
        </p>

        <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm">
          {employee.department}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">
            Fit Score
          </p>

          <p className="mt-2 text-3xl font-bold">
            {employee.fitScore}%
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">
            Matched Skills
          </p>

          <p className="mt-2 text-3xl font-bold">
            {
              employee
                .matchedSkills
                ?.length
            }
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">
            Missing Skills
          </p>

          <p className="mt-2 text-3xl font-bold">
            {
              employee
                .missingSkills
                ?.length
            }
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {employee.skills?.map(
            (skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Strengths
          </h2>

          <ul className="space-y-2">
            {employee.strengths?.map(
              (
                item,
                index
              ) => (
                <li
                  key={index}
                >
                  • {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Areas To Improve
          </h2>

          <ul className="space-y-2">
            {employee.weaknesses?.map(
              (
                item,
                index
              ) => (
                <li
                  key={index}
                >
                  • {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Suggested Role
        </h2>

        <p>
          {
            employee.suggestedRole
          }
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Recommended Training
        </h2>

        <ul className="space-y-2">
          {employee.suggestedTraining?.map(
            (
              item,
              index
            ) => (
              <li
                key={index}
              >
                • {item}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}