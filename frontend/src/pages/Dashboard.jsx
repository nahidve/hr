import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await api.get(
      "/dashboard/stats"
    );

    setStats(data);
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div className="space-y-6">
  <h1 className="text-3xl font-bold">
    Dashboard
  </h1>

  <div className="grid gap-6 md:grid-cols-3">
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
</div>
  );
}