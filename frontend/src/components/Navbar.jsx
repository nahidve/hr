import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  useState,
  useEffect,
} from "react";
import {
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const { user, logout } =
    useAuth();

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const authPages = [
    "/login",
    "/register",
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (
    authPages.includes(
      location.pathname
    )
  ) {
    return null;
  }

  const hrNav = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Employees",
      path: "/employees",
    },
    {
      label: "Onboarding",
      path: "/onboarding",
    },
    {
      label: "Policies",
      path: "/policies",
    },
    {
      label: "Goals",
      path: "/goals",
    },
    {
      label: "JD Generator",
      path: "/job-descriptions",
    },
    {
      label: "Interviews",
      path: "/interviews",
    },
    {
      label:
        "Policy Assistant",
      path: "/policy",
    },
    {
      label: "Leave AI",
      path: "/leave",
    },
  ];

  const employeeNav = [
    {
      label: "My Profile",
      path: "/profile",
    },
    {
      label:
        "Policy Assistant",
      path: "/policy",
    },
    {
      label: "Leave AI",
      path: "/leave",
    },
  ];

  const nav = !user
    ? []
    : user.role === "HR"
      ? hrNav
      : employeeNav;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
        <div className="flex h-10 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
  to={
    !user
      ? "/login"
      : user.role ===
          "Employee"
        ? "/profile"
        : "/"
  }
              className="flex items-center"
            >
              <span className="font-display text-lg font-bold uppercase tracking-[-0.04em] text-primary">
                VE{" "}
                <span className="ml-1 font-mono text-xs font-normal tracking-wider text-coral">
                  HR
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                    isActive
                      ? "border-b-2 border-primary text-primary"
                      : "text-slate hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="font-mono text-xs uppercase tracking-wider text-primary"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-pill bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-on-primary"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="rounded-pill border border-hairline px-3 py-1 text-[11px] font-mono uppercase tracking-wider">
                  {user.name} •{" "}
                  {user.role}
                </div>

                <button
                  onClick={
                    handleLogout
                  }
                  className="rounded-pill bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-on-primary"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="text-primary"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="space-y-2 border-t border-hairline bg-canvas px-6 py-4 lg:hidden">
          {!user ? (
            <>
              <Link
                to="/login"
                className="block py-2 font-mono text-sm uppercase tracking-wider"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block py-2 font-mono text-sm uppercase tracking-wider"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="mb-3 rounded-lg border border-hairline p-3 font-mono text-xs uppercase tracking-wider">
                <div>
                  {user.name}
                </div>

                <div className="mt-1 text-slate">
                  {user.role}
                </div>
              </div>

              {nav.map((item) => {
                const isActive =
                  location.pathname ===
                  item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block py-2 font-mono text-sm uppercase tracking-wider ${
                      isActive
                        ? "font-bold text-primary"
                        : "text-slate hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                onClick={
                  handleLogout
                }
                className="mt-3 w-full rounded-pill bg-primary py-2.5 text-center font-mono text-xs uppercase tracking-wider text-on-primary"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}