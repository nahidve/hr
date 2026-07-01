import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] =
    useState(null);

  const [employees, setEmployees] =
    useState([]);

  const [leaveRequests, setLeaveRequests] =
    useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        statsResponse,
        employeesResponse,
        leaveResponse,
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/onboarding"),
        api.get("/leave/recent"),
      ]);

      setStats(statsResponse.data);

      setEmployees(
        employeesResponse.data.slice(
          0,
          5
        )
      );

      setLeaveRequests(
        leaveResponse.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          HR Analytics & AI Insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Employees"
          value={stats.employees}
        />

        <StatCard
          title="Policies"
          value={stats.policies}
        />

        <StatCard
          title="Leave Requests"
          value={stats.leaves}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Employees
          </h2>

          {employees.length === 0 ? (
            <p className="text-slate-500">
              No employees found.
            </p>
          ) : (
            <div className="space-y-3">
              {employees.map((emp) => (
                <div
                  key={emp._id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-b-0"
                >
                  <div>
                    <p className="font-medium">
                      {emp.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {emp.email}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                    {
                      emp.department
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Leave Requests
          </h2>

          {leaveRequests.length ===
          0 ? (
            <p className="text-slate-500">
              No leave requests
              found.
            </p>
          ) : (
            <div className="space-y-3">
              {leaveRequests.map(
                (leave) => (
                  <div
                    key={leave._id}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">
                        {
                          leave
                            .employeeId
                            ?.name
                        }
                      </p>

                      <p className="text-sm text-slate-500">
                        {
                          leave.reason
                        }
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        leave.recommendation ===
                        "Approve"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        leave.recommendation
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}