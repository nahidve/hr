import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  FileText,
  Calendar,
  UserSquare2,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const nav = [
    {
      label: "Dashboard",
      path: "/",
      icon: Briefcase,
    },
    {
      label: "Employees",
      path: "/employees",
      icon: UserSquare2,
    },
    {
      label: "Onboarding",
      path: "/onboarding",
      icon: Users,
    },
    {
      label: "Policy Assistant",
      path: "/policy",
      icon: FileText,
    },
    {
      label: "Policies",
      path: "/policies",
      icon: FileText,
    },
    {
      label: "Leave AI",
      path: "/leave",
      icon: Calendar,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-slate-900">
            HR Portal
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {nav.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"
                    transition={{
                      duration: 0.2,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
