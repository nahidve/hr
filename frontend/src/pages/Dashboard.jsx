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
import BlurText from "../components/BlurText";
import LogoLoop from "../components/LogoLoop";
import MagnetLines from "../components/MagnetLines";
import ClickSpark from "../components/ClickSpark";
import {
  BeautifulDoughnut,
  BeautifulBar,
  BeautifulLine,
} from "../components/ChartWrapper";
import { DashboardSkeleton } from "../components/ui/Skeleton";
import { FlipWords } from "../components/ui/flip-words";
import {
  LiveTelemetryConsole,
  CandidateRadarSweep,
  TelemetryGauge,
} from "../components/MesmerizingUI";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [goals, setGoals] = useState([]);
  const [timelineData, setTimelineData] = useState(null);

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

      // Calculate timeline data based on onboarding dates
      const allEmployees = employeesResponse.data || [];
      const monthCounts = {};
      
      allEmployees.forEach((emp) => {
        if (!emp.createdAt) return;
        const date = new Date(emp.createdAt);
        const label = date.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        });
        monthCounts[label] = (monthCounts[label] || 0) + 1;
      });

      // Sort labels chronologically
      const sortedLabels = Object.keys(monthCounts).sort((a, b) => {
        const dateA = new Date("01 " + a);
        const dateB = new Date("01 " + b);
        return dateA - dateB;
      });

      const counts = sortedLabels.map((lbl) => monthCounts[lbl]);
      let cumulativeSum = 0;
      const cumulativeCounts = counts.map((count) => {
        cumulativeSum += count;
        return cumulativeSum;
      });

      setTimelineData({
        labels: sortedLabels,
        counts,
        cumulativeCounts,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return <DashboardSkeleton />;
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

  const deptData = {
    labels: (analytics?.departmentData || []).map((d) => d.name),
    datasets: [
      {
        data: (analytics?.departmentData || []).map((d) => d.value),
        backgroundColor: COLORS,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const skillsData = {
    labels: (analytics?.topSkills || []).map((s) => s.skill),
    datasets: [
      {
        label: "Skill Frequency",
        data: (analytics?.topSkills || []).map((s) => s.count),
        backgroundColor: "rgba(0, 60, 51, 0.85)",
        hoverBackgroundColor: "#003c33",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Editorial space / Hero Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <MagnetLines
              rows={6}
              columns={10}
              containerSize="28vmin"
              lineColor="#f3f4f6"
              lineWidth="1px"
              lineHeight="36px"
              baseAngle={-12}
              className="absolute right-4 top-4 pointer-events-none opacity-10 hidden md:block"
              style={{ zIndex: 0 }}
            />
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">System Overview</p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl uppercase">
                Enterprise Employee <FlipWords words={["Management", "Compliance", "Objectives", "Telemetry"]} className="text-action-blue" />
              </h1>
              <p className="font-body text-slate text-sm mt-1">
                Real-time workforce deployment and policy compliance telemetry.
              </p>
              <BlurText
                text={"Optimize your workforce, streamline operations, and enhance productivity."}
                delay={200}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => console.log('Animation completed!')}
                className="text-lg mt-4"
              />
            </div>
            <div>
              <ClickSpark sparkColor="#111" sparkSize={8} sparkRadius={18} sparkCount={6} duration={500}>
                <span className="inline-flex items-center gap-2 border border-hairline bg-soft-stone px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-primary rounded-xs">
                  <Clock className="h-3 w-3 text-slate" /> Last 30 Days
                </span>
              </ClickSpark>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {/* Partner logos loop */}
        <div className="mb-8">
          {/* <LogoLoop
            logos={[
              { node: <span className="font-mono text-sm px-3">React</span>, title: 'React' },
              { node: <span className="font-mono text-sm px-3">Next.js</span>, title: 'Next.js' },
              { node: <span className="font-mono text-sm px-3">TypeScript</span>, title: 'TypeScript' },
              { node: <span className="font-mono text-sm px-3">Tailwind</span>, title: 'Tailwind' }
            ]}
            speed={80}
            direction="left"
            gap={48}
            logoHeight={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
            className="w-full"
          /> */}
        </div>
        {/* Key Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 mb-12">
          {cardData.map((item) => (
            <div
              key={item.title}
              className="border border-hairline bg-canvas p-5 rounded-sm hover:border-action-blue hover:shadow-[0_0_15px_rgba(24,99,220,0.12)] transition-all duration-300 flex flex-col justify-between"
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

            {/* Workforce Growth & Onboarding Timeline */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm">
              <div className="mb-6 pb-2 border-b border-hairline flex items-center justify-between">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    Workforce Analytics
                  </h2>
                  <p className="font-body text-xs text-slate mt-0.5">
                    Growth rate and onboarding velocity trend metrics.
                  </p>
                </div>
              </div>
              <div className="h-72">
                {timelineData ? (
                  <BeautifulLine
                    data={{
                      labels: timelineData.labels,
                      datasets: [
                        {
                          label: "Total Workforce",
                          data: timelineData.cumulativeCounts,
                          borderColor: "#1863dc",
                          backgroundColor: "rgba(24, 99, 220, 0.08)",
                          fill: true,
                          tension: 0.4,
                          borderWidth: 3,
                          pointBackgroundColor: "#1863dc",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 2,
                          pointRadius: 4,
                          pointHoverRadius: 6,
                        },
                        {
                          label: "New Hires",
                          data: timelineData.counts,
                          borderColor: "#ff7759",
                          backgroundColor: "rgba(255, 119, 89, 0.05)",
                          fill: true,
                          tension: 0.4,
                          borderWidth: 2,
                          borderDash: [4, 4],
                          pointBackgroundColor: "#ff7759",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 1.5,
                          pointRadius: 3.5,
                          pointHoverRadius: 5.5,
                        },
                      ],
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-xs text-slate">
                    Loading timeline telemetry...
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
              <TelemetryGauge value={analytics?.averageFitScore || 0} label="System Average" />
            </div>

            {/* Live Telemetry Console Feed */}
            <LiveTelemetryConsole />
          </div>

          {/* Right Column: Analytics & Charts (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Department Breakdown */}
            <div className="border border-hairline bg-canvas p-6 rounded-sm">
              <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-4 pb-2 border-b border-hairline">
                Department Allocation
              </h2>
              <div className="h-64 flex items-center justify-center">
                <BeautifulDoughnut data={deptData} />
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
                <BeautifulBar data={skillsData} />
              </div>
            </div>

            {/* Candidate Radar Scan Sweep */}
            <CandidateRadarSweep />
          </div>
        </div>
      </div>
    </div>
  );
}
