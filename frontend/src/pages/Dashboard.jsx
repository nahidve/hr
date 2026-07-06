// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  Calendar,
  ArrowRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import CountUp from "../components/ui/CountUp";
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
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-hairline border-t-primary" />
      </div>
    );
  }

  const cardData = [
    { title: "Employees", value: stats.employees, icon: Users },
    { title: "Policies", value: stats.policies, icon: FileText },
    { title: "Leaves", value: stats.leaves, icon: Calendar },
    { title: "Goals", value: stats.totalGoals || 0, icon: ArrowRight },
    { title: "Completed Goals", value: stats.completedGoals || 0, icon: ArrowRight },
    { title: "In Progress", value: stats.inProgressGoals || 0, icon: Clock },
    { title: "Overdue", value: stats.overdueGoals || 0, icon: Clock },
  ];

  const COLORS = ["#003c33", "#ff7759", "#1863dc", "#75758a", "#17171c", "#eeece7"];

  return (
    <div className="min-h-screen bg-canvas">
      {/* Editorial space / Hero Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">System Overview</p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl uppercase">
                Enterprise Cockpit
              </h1>
              <p className="font-body text-slate text-sm mt-1">
                Real-time workforce deployment and policy compliance telemetry.
              </p>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 border border-hairline bg-soft-stone px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-primary rounded-xs">
                <Clock className="h-3 w-3 text-slate" /> Last 30 Days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {/* Key Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mb-12">
          {cardData.map((item) => (
            <div
              key={item.title}
              className="border border-hairline bg-canvas p-5 rounded-sm hover:border-slate transition-colors flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate mb-1">
                  {item.title}
                </p>
                        <p className="font-display text-2xl font-bold tracking-tight text-primary">
                          {typeof item.value === 'number' ? (
                            <CountUp to={item.value} className="count-up-text" />
                          ) : (
                            item.value
                          )}
                        </p>
              </div>
              <div className="mt-4 flex items-center justify-end text-slate">
                <item.icon className="h-4 w-4 opacity-60" />
              </div>
            </div>
          ))}
        </div>

        {/* Dash Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Activity & Lists (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Recent Employees & Leaves grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Employees */}
              <div className="border border-hairline bg-canvas p-6 rounded-sm">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-hairline">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    Recent Employees
                  </h2>
                  <Link
                    to="/employees"
                    className="font-mono text-[11px] uppercase tracking-wider text-action-blue hover:underline flex items-center gap-1"
                  >
                    View all <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                {employees.length === 0 ? (
                  <p className="font-body text-xs text-slate py-4">No employees recorded.</p>
                ) : (
                  <div className="space-y-4">
                    {employees.map((emp) => (
                      <div
                        key={emp._id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-soft-stone font-mono text-xs font-bold text-primary">
                            {emp.name?.charAt(0) || "?"}
                          </div>
                          <div>
                            <Link
                              to={`/employees/${emp._id}`}
                              className="font-body text-sm font-semibold text-primary hover:text-action-blue"
                            >
                              {emp.name}
                            </Link>
                            <p className="font-mono text-[11px] text-slate">{emp.email}</p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-wider bg-soft-stone text-primary px-2 py-0.5 rounded-xs">
                          {emp.department || "General"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Leave Requests */}
              <div className="border border-hairline bg-canvas p-6 rounded-sm">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-hairline">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    Leave Requests
                  </h2>
                  <Link
                    to="/leave"
                    className="font-mono text-[11px] uppercase tracking-wider text-action-blue hover:underline flex items-center gap-1"
                  >
                    View all <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>

                {leaveRequests.length === 0 ? (
                  <p className="font-body text-xs text-slate py-4">No requests pending.</p>
                ) : (
                  <div className="space-y-4">
                    {leaveRequests.map((leave) => (
                      <div
                        key={leave._id}
                        className="flex items-center justify-between py-1"
                      >
                        <div>
                          <p className="font-body text-sm font-semibold text-primary">
                            {leave.employeeId?.name || "Unknown"}
                          </p>
                          <p className="font-mono text-[11px] text-slate">
                            {leave.reason || "No reason"}
                          </p>
                        </div>
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                            leave.recommendation === "Approve"
                              ? "bg-pale-green text-deep-green"
                              : "bg-coral-soft/20 text-coral"
                          }`}
                        >
                          {leave.recommendation || "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Goals & Fit Scores */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Recent Goals (2 cols) */}
              <div className="border border-hairline bg-canvas p-6 rounded-sm md:col-span-2">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-hairline">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    Active Goals
                  </h2>
                  <Link
                    to="/goals"
                    className="font-mono text-[11px] uppercase tracking-wider text-action-blue hover:underline"
                  >
                    Manage
                  </Link>
                </div>

                {goals.length === 0 ? (
                  <p className="font-body text-xs text-slate py-4">No goals configured.</p>
                ) : (
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <div
                        key={goal._id}
                        className="flex items-center justify-between py-2 border-b border-card-border last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-body text-sm font-semibold text-primary">
                            {goal.title}
                          </p>
                          <p className="font-mono text-[11px] text-slate">
                            {goal.employeeId?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-xs font-semibold text-primary">
                            <CountUp to={goal.progress || 0} className="count-up-text" />%
                          </p>
                          <span
                            className={`inline-block font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-xs mt-1 ${
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
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fit score summary (1 col) */}
              <div className="border border-hairline bg-deep-green text-on-dark p-6 rounded-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-coral font-bold">
                    Recruitment Fit
                  </h3>
                  <p className="font-body text-xs text-on-dark/70 mt-2">
                    Average fit scoring generated from parsed candidate resumes.
                  </p>
                </div>
                <div className="mt-8">
                  <span className="font-mono text-5xl font-bold text-on-dark">
                    <CountUp to={analytics?.averageFitScore || 0} className="count-up-text" />%
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-on-dark/50 mt-1">
                    System-wide Average
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Analytics & Charts (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Department Breakdown */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm">
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
                Department Allocation
              </h2>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics?.departmentData || []}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {(analytics?.departmentData || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#d9d9dd",
                        borderRadius: "4px",
                        fontFamily: "Space Mono",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {(analytics?.departmentData || []).slice(0, 6).map((dept, index) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-mono text-[10px] text-slate truncate">
                      {dept.name} (<CountUp to={dept.value || 0} className="count-up-text inline" />)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Skills */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm">
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
                Skill Proliferation
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.topSkills || []} margin={{ left: -20 }}>
                    <XAxis
                      dataKey="skill"
                      tick={{ fill: "#75758a", fontSize: 10, fontFamily: "Space Mono" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#75758a", fontSize: 10, fontFamily: "Space Mono" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#d9d9dd",
                        borderRadius: "4px",
                        fontFamily: "Space Mono",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="count" fill="#003c33" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
