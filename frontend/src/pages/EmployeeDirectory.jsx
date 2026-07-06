import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BlurText from "../components/BlurText";
import LogoLoop from "../components/LogoLoop";
import { Search, LayoutGrid, List, Award } from "lucide-react";

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [layout, setLayout] = useState("grid"); // "grid" or "list"

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
    const matchesSkill =
      !skillSearch ||
      (emp.skills || []).some((s) =>
        s.toLowerCase().includes(skillSearch.toLowerCase())
      );
    return matchesSearch && matchesDepartment && matchesSkill;
  });

  // Calculate unique departments (filtering out empty/null values)
  const departments = [
    "All",
    ...new Set(employees.map((emp) => emp.department).filter(Boolean)),
  ];

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
        
        {/* Search Bars */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative">
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

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
              <Award className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Filter by competency / skill (e.g. React, Node)..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills and Layout Toggle Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-hairline pb-6 pt-2">
          
          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate mr-2 block md:inline">Departments:</span>
            {departments.map((dept) => {
              const isActive = (dept === "All" && !department) || department === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setDepartment(dept === "All" ? "" : dept)}
                  className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-pill border transition-all ${
                    isActive
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-canvas text-primary border-hairline hover:border-slate hover:bg-soft-stone/10"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Grid/List Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate mr-1">View Layout:</span>
            <div className="flex border border-hairline rounded-xs overflow-hidden">
              <button
                onClick={() => setLayout("grid")}
                className={`p-2 transition-colors ${
                  layout === "grid"
                    ? "bg-soft-stone text-primary"
                    : "bg-canvas text-slate hover:text-primary"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 transition-colors ${
                  layout === "list"
                    ? "bg-soft-stone text-primary"
                    : "bg-canvas text-slate hover:text-primary"
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Directory Grid/List Render */}
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-hairline rounded-sm bg-soft-stone/30">
            <p className="font-mono text-xs uppercase tracking-wider text-slate">No employees matches the query</p>
          </div>
        ) : layout === "grid" ? (
          /* GRID VIEW */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <Link
                key={employee._id}
                to={`/employees/${employee._id}`}
                className="group border border-hairline bg-canvas p-6 rounded-sm hover:border-action-blue hover:shadow-[0_0_20px_rgba(24,99,220,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-stone font-mono text-sm font-bold text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      {employee.name?.charAt(0) || "?"}
                    </div>
                    {employee.fitScore !== undefined && (
                      <span className="font-mono text-[9px] uppercase tracking-wider bg-pale-green text-deep-green border border-deep-green/10 px-2 py-0.5 rounded-xs">
                        Fit Score: {employee.fitScore}%
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-primary group-hover:text-action-blue transition-colors uppercase">
                    {employee.name}
                  </h2>
                  <p className="font-mono text-xs text-slate mt-1">{employee.email}</p>
                  
                  {/* Skills tags footprint */}
                  {employee.skills && employee.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {employee.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="font-mono text-[8px] uppercase tracking-wider border border-hairline px-1.5 py-0.5 rounded-xs bg-canvas text-primary">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 3 && (
                        <span className="font-mono text-[8px] uppercase tracking-wider text-slate px-1.5 py-0.5">
                          +{employee.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between pt-4 border-t border-hairline/60">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-soft-stone text-primary px-2.5 py-1 rounded-xs">
                    {employee.department || "General"}
                  </span>
                  <span className="font-mono text-[11px] text-action-blue uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Profile &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="border border-hairline divide-y divide-hairline bg-canvas rounded-sm overflow-hidden">
            {filteredEmployees.map((employee) => (
              <Link
                key={employee._id}
                to={`/employees/${employee._id}`}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 hover:bg-soft-stone/20 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-stone font-mono text-sm font-bold text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {employee.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight text-primary group-hover:text-action-blue transition-colors uppercase">
                      {employee.name}
                    </h2>
                    <p className="font-mono text-xs text-slate">{employee.email}</p>
                  </div>
                </div>
                
                {/* Department, Fit Score, Skills */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-soft-stone text-primary px-2.5 py-1 rounded-xs">
                    {employee.department || "General"}
                  </span>
                  {employee.fitScore !== undefined && (
                    <span className="font-mono text-[9px] uppercase tracking-wider bg-pale-green text-deep-green border border-deep-green/10 px-2 py-0.5 rounded-xs">
                      Fit: {employee.fitScore}%
                    </span>
                  )}
                  {employee.skills && employee.skills.length > 0 && (
                    <div className="hidden md:flex flex-wrap gap-1">
                      {employee.skills.slice(0, 4).map((skill, index) => (
                        <span key={index} className="font-mono text-[8px] uppercase tracking-wider border border-hairline px-1.5 py-0.5 bg-canvas text-primary">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 4 && (
                        <span className="font-mono text-[8px] uppercase tracking-wider text-slate px-1.5 py-0.5">
                          +{employee.skills.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <span className="font-mono text-xs text-action-blue uppercase tracking-wider group-hover:underline flex items-center gap-0.5">
                    View profile &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Partner logos */}
        <div className="mt-12">
          <LogoLoop
            logos={[
              { node: <span className="font-mono text-sm px-3">Acme</span>, title: 'Acme' },
              { node: <span className="font-mono text-sm px-3">Globex</span>, title: 'Globex' },
              { node: <span className="font-mono text-sm px-3">Initech</span>, title: 'Initech' }
            ]}
            speed={60}
            gap={40}
            logoHeight={34}
            fadeOut
            ariaLabel="Customers"
          />
        </div>
      </div>
    </div>
  );
}
