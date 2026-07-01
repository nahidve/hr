import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const nav = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Onboarding",
      path: "/onboarding",
    },
    {
      label: "Policy Assistant",
      path: "/policy",
    },
    {
      label: "Leave AI",
      path: "/leave",
    },
  ];

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">
          AI HR Portal
        </h1>

        <div className="flex gap-6">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium ${
                location.pathname ===
                item.path
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}