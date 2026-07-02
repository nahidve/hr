// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  Calendar,
  ArrowRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { AnimatedGrid } from "../components/ui/animated-grid";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { MovingBorder } from "../components/ui/moving-border";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        statsResponse,
        employeesResponse,
        leaveResponse,
        analyticsResponse,
        goalsResponse,
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/onboarding"),
        api.get("/leave/recent"),
        api.get("/dashboard/analytics"),
        api.get("/goals"),
      ]);

      setStats(statsResponse.data);
      setEmployees(employeesResponse.data.slice(0, 5));
      setLeaveRequests(leaveResponse.data);
      setAnalytics(analyticsResponse.data);
      setGoals(goalsResponse.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
      </div>
    );
  }

  const cardData = [
    {
      title: "Employees",
      value: stats.employees,
      icon: Users,
    },

    {
      title: "Policies",
      value: stats.policies,
      icon: FileText,
    },

    {
      title: "Leaves",
      value: stats.leaves,
      icon: Calendar,
    },

    {
      title: "Goals",
      value: stats.totalGoals || 0,
      icon: ArrowRight,
    },

    {
      title: "Completed Goals",
      value: stats.completedGoals || 0,
      icon: ArrowRight,
    },

    {
      title: "In Progress",
      value: stats.inProgressGoals || 0,
      icon: Clock,
    },

    {
      title: "Overdue",
      value: stats.overdueGoals || 0,
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatedGrid className="opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Dashboard
              </h1>
              <p className="text-sm text-slate-500">HR analytics overview</p>
            </div>
            <ShimmerButton className="px-4 py-2 text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors rounded-lg">
              <Clock className="mr-2 h-4 w-4" />
              Last 30 days
            </ShimmerButton>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {cardData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-slate-900">
                    {item.value}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-3">
                  <item.icon className="h-5 w-5 text-slate-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Employees */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MovingBorder className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent Employees
                </h2>
                <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>

              {employees.length === 0 ? (
                <p className="text-sm text-slate-400">No employees found.</p>
              ) : (
                <div className="space-y-3">
                  {employees.map((emp, index) => (
                    <motion.div
                      key={emp._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.03 }}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700">
                          {emp.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <Link
                            to={`/employees/${emp._id}`}
                            className="text-sm font-medium text-slate-900 hover:text-slate-700 hover:underline"
                          >
                            {emp.name}
                          </Link>
                          <p className="text-xs text-slate-400">{emp.email}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                        {emp.department || "General"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </MovingBorder>
          </motion.div>

          {/* Leave Requests */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <MovingBorder className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Leave Requests
                </h2>
                <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>

              {leaveRequests.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No leave requests found.
                </p>
              ) : (
                <div className="space-y-3">
                  {leaveRequests.map((leave, index) => (
                    <motion.div
                      key={leave._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.03 }}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {leave.employeeId?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {leave.reason || "No reason"}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          leave.recommendation === "Approve"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {leave.recommendation || "Pending"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </MovingBorder>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MovingBorder className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent Goals
                </h2>
              </div>

              {goals.length === 0 ? (
                <p className="text-sm text-slate-400">No goals found.</p>
              ) : (
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div
                      key={goal._id}
                      className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {goal.title}
                        </p>

                        <p className="text-xs text-slate-400">
                          {goal.employeeId?.name}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {goal.progress}%
                        </p>

                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            goal.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : goal.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {goal.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </MovingBorder>
          </motion.div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Average Candidate Fit</h2>

            <p className="mt-3 text-4xl font-bold">
              {analytics?.averageFitScore}%
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Employees By Department
            </h2>

            <div className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={analytics?.departmentData || []}
                    dataKey="value"
                    nameKey="name"
                  >
                    {analytics?.departmentData?.map((entry, index) => (
                      <Cell key={index} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Top Skills</h2>

            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={analytics?.topSkills || []}>
                  <XAxis dataKey="skill" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
