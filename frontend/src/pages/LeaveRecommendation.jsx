import { useEffect, useState } from "react";
import api from "../services/api";

export default function LeaveRecommendation() {
  const [employees, setEmployees] =
    useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees =
    async () => {
      try {
        const { data } =
          await api.get("/onboarding");

        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await api.post(
          "/leave/recommend",
          form
        );

      setResult(data);
    } catch (error) {
      console.error(error);
      alert(
        "Failed to get recommendation"
      );
    } finally {
      setLoading(false);
    }
  };

  const leaveDays =
  form.startDate && form.endDate
    ? Math.ceil(
        (new Date(form.endDate) -
          new Date(form.startDate)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : 0;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        AI Leave Recommendation
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Employee
            </label>

            <select
              name="employeeId"
              value={
                form.employeeId
              }
              onChange={
                handleChange
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                Select Employee
              </option>

              {employees.map(
                (emp) => (
                  <option
                    key={emp._id}
                    value={
                      emp._id
                    }
                  >
                    {emp.name}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={
                  form.startDate
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={
                  form.endDate
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <textarea
              rows="5"
              name="reason"
              placeholder="Explain why the employee is requesting leave..."
              value={form.reason}
              onChange={
                handleChange
              }
              className="w-full rounded-lg border border-slate-300 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Analyzing..."
              : "Get AI Recommendation"}
          </button>
        </form>
      </div>

      {result && (
  <div
    className={`mt-6 rounded-xl border p-6 shadow-sm ${
      result.recommendation === "Approve"
        ? "border-green-200 bg-green-50"
        : "border-red-200 bg-red-50"
    }`}
  >
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold">
        Leave Review Summary
      </h2>

      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${
          result.recommendation === "Approve"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {result.recommendation}
      </span>
    </div>

    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <div className="rounded-lg bg-white p-4">
        <p className="text-sm text-slate-500">
          Employee
        </p>

        <p className="mt-1 font-semibold">
          {
            employees.find(
              (emp) =>
                emp._id === form.employeeId
            )?.name
          }
        </p>
      </div>

      <div className="rounded-lg bg-white p-4">
        <p className="text-sm text-slate-500">
          Start Date
        </p>

        <p className="mt-1 font-semibold">
          {form.startDate}
        </p>
      </div>

      <div className="rounded-lg bg-white p-4">
  <p className="text-sm text-slate-500">
    End Date
  </p>

  <p className="mt-1 font-semibold">
    {form.endDate}
  </p>
</div>

<div className="rounded-lg bg-white p-4">
  <p className="text-sm text-slate-500">
    Duration
  </p>

  <p className="mt-1 font-semibold">
    {leaveDays} day
    {leaveDays !== 1 ? "s" : ""}
  </p>
</div>
    </div>

    <div className="mb-4 rounded-lg bg-white p-4">
      <h3 className="mb-2 font-semibold">
        Leave Reason
      </h3>

      <p className="text-slate-700">
        {form.reason}
      </p>
    </div>

    <div className="rounded-lg bg-white p-4">
      <h3 className="mb-2 font-semibold">
        AI Analysis
      </h3>

      <p className="leading-relaxed text-slate-700">
        {result.aiReason}
      </p>
    </div>
  </div>
)}

      {!result && (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Select an employee, provide leave
          details, and let AI evaluate the
          request based on company policies.
        </div>
      )}
    </div>
  );
}