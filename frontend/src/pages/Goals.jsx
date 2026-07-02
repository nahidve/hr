import { useEffect, useState } from "react";

import api from "../services/api";

export default function Goals() {
  const [employees, setEmployees] = useState([]);

  const [goals, setGoals] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [employeesRes, goalsRes] = await Promise.all([
      api.get("/onboarding"),
      api.get("/goals"),
    ]);

    setEmployees(employeesRes.data);

    setGoals(goalsRes.data);
  };

  const createGoal = async (e) => {
    e.preventDefault();

    await api.post("/goals", form);

    setForm({
      employeeId: "",
      title: "",
      description: "",
      dueDate: "",
    });

    loadData();
  };

  const updateProgress = async (id, progress) => {
    await api.put(`/goals/${id}`, {
      progress,
      status: progress >= 100 ? "Completed" : "In Progress",
    });

    loadData();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Goal Tracking</h1>

      <div className="rounded-xl border bg-white p-6">
        <form onSubmit={createGoal} className="space-y-4">
          <select
            value={form.employeeId}
            onChange={(e) =>
              setForm({
                ...form,
                employeeId: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Goal"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <button className="rounded-lg bg-slate-900 px-5 py-3 text-white">
            Create Goal
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal._id} className="rounded-xl border bg-white p-5">
            <h2 className="font-semibold">{goal.title}</h2>

            <p className="text-sm text-slate-500">{goal.employeeId?.name}</p>

            <p className="mt-2">{goal.description}</p>

            <div className="mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) =>
                  updateProgress(goal._id, Number(e.target.value))
                }
                className="w-full"
              />
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium">{goal.progress}%</p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    goal.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : goal.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {goal.status}
                </span>
              </div>{" "}
              <button
                onClick={async () => {
                  await api.delete(`/goals/${goal._id}`);

                  loadData();
                }}
                className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm text-white"
              >
                Delete Goal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
