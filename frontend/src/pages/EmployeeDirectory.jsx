import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BlurText from "../components/BlurText";
import { Search } from "lucide-react";

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data } = await api.get("/onboarding");
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = !department || emp.department === department;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(employees.map((emp) => emp.department))];

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Internal Directory</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
            Personnel Roster
          </h1>
          <p className="font-body text-slate text-sm mt-1">
            Browse and query employee profiles, skill sets, and department deployments.
          </p>
          <BlurText
            text={"Find the right people, faster."}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-lg mt-4"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 space-y-8">
        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search personnel by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
            />
          </div>

          <div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-hairline rounded-sm bg-soft-stone/30">
            <p className="font-mono text-xs uppercase tracking-wider text-slate">No employees matches the query</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <Link
                key={employee._id}
                to={`/employees/${employee._id}`}
                className="group border border-hairline bg-canvas p-6 rounded-sm hover:border-primary transition-colors flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-primary group-hover:text-action-blue transition-colors">
                    {employee.name}
                  </h2>
                  <p className="font-mono text-xs text-slate mt-1">{employee.email}</p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-soft-stone text-primary px-2.5 py-1 rounded-xs">
                    {employee.department}
                  </span>
                  <span className="font-mono text-[11px] text-action-blue uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    View Profile &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
