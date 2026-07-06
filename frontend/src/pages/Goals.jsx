import { useEffect, useState } from "react";
import api from "../services/api";
import { Trash2, AlertCircle } from "lucide-react";
import BlurText from "../components/BlurText";

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
    try {
      const [employeesRes, goalsRes] = await Promise.all([
        api.get("/onboarding"),
        api.get("/goals"),
      ]);
      setEmployees(employeesRes.data);
      setGoals(goalsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createGoal = async (e) => {
    e.preventDefault();
    if (!form.employeeId || !form.title) return;
    try {
      await api.post("/goals", form);
      setForm({
        employeeId: "",
        title: "",
        description: "",
        dueDate: "",
      });
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProgress = async (id, progress) => {
    try {
      await api.put(`/goals/${id}`, {
        progress,
        status: progress >= 100 ? "Completed" : "In Progress",
      });
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Performance Tracking</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
            Objective Key Results
          </h1>
          <p className="font-body text-slate text-sm mt-1">
            Establish strategic milestones, track completion rates, and assign goals to personnel.
          </p>
          <BlurText
            text={"Measure, iterate, succeed."}
            delay={180}
            animateBy="words"
            direction="top"
            className="text-lg mt-4"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 grid gap-8 lg:grid-cols-12">
        {/* Form Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="border border-hairline bg-canvas p-8 rounded-lg shadow-sm">
            <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-6 pb-2 border-b border-hairline">
              Establish New Milestone
            </h2>

            <form onSubmit={createGoal} className="space-y-5">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Assignee
                </label>
                <select
                  value={form.employeeId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      employeeId: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Goal Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Complete System Integration"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Detail the metrics for goal evaluation..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Target Due Date
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dueDate: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill py-3 hover:bg-cohere-black transition-colors"
              >
                Create Goal
              </button>
            </form>
          </div>
        </div>

        {/* Goals List Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
            Active Telemetry
          </h2>

          {goals.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-hairline rounded-sm bg-soft-stone/30">
              <AlertCircle className="mx-auto h-6 w-6 text-slate mb-2 opacity-60" />
              <p className="font-mono text-xs uppercase tracking-wider text-slate">No goals configured</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal._id} className="border border-hairline bg-canvas p-6 rounded-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-primary uppercase">
                        {goal.title}
                      </h3>
                      <p className="font-mono text-xs text-slate mt-1">
                        Assignee: <span className="text-primary font-medium">{goal.employeeId?.name || "Unassigned"}</span>
                      </p>
                    </div>

                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                        goal.status === "Completed"
                          ? "bg-pale-green text-deep-green"
                          : goal.status === "In Progress"
                            ? "bg-pale-blue text-action-blue"
                            : "bg-soft-stone text-primary"
                      }`}
                    >
                      {goal.status}
                    </span>
                  </div>

                  <p className="font-body text-sm text-slate leading-relaxed">
                    {goal.description}
                  </p>

                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate">Progress Meter</span>
                      <span className="font-mono text-[11px] font-bold text-primary">{goal.progress}%</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) =>
                        updateProgress(goal._id, Number(e.target.value))
                      }
                      className="w-full accent-primary h-1 bg-soft-stone rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 border-t border-hairline flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate">
                      Due: {goal.dueDate ? new Date(goal.dueDate).toLocaleDateString() : "No Date"}
                    </span>

                    <button
                      onClick={async () => {
                        try {
                          await api.delete(`/goals/${goal._id}`);
                          loadData();
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                      className="font-mono text-[10px] uppercase tracking-wider text-error hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
