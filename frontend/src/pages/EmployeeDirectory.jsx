import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

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
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Employee Directory</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-300 p-3"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-xl border border-slate-300 p-3"
        >
          <option value="">All Departments</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Link
            key={employee._id}
            to={`/employees/${employee._id}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{employee.name}</h2>

            <p className="mt-1 text-sm text-slate-500">{employee.email}</p>

            <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm">
              {employee.department}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
