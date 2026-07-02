import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = [
    { label: "Dashboard", path: "/" },
    { label: "Employees", path: "/employees" },
    { label: "Onboarding", path: "/onboarding" },
    { label: "Policy Assistant", path: "/policy" },
    { label: "Policies", path: "/policies" },
    { label: "Goals", path: "/goals" },
    { label: "JD Generator", path: "/job-descriptions" },
    { label: "Interviews", path: "/interviews" },
    { label: "Leave AI", path: "/leave" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 md:px-8">
        <div className="flex h-10 items-center justify-between">
          {/* Zone 1: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-display text-lg font-bold tracking-[-0.04em] text-primary uppercase">
                VE{" "}
                <span className="font-mono text-xs font-normal tracking-wider text-coral ml-1">
                  HR
                </span>
              </span>
            </Link>
          </div>

          {/* Zone 2: Centered Menu (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider font-mono transition-colors ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-slate hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Zone 3: CTA / Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/policy"
              className="bg-primary text-on-primary font-mono text-[11px] uppercase tracking-wider rounded-pill px-4 py-2 hover:bg-cohere-black transition-colors"
            >
              Ask Assistant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-slate focus:outline-none"
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

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-hairline bg-canvas px-6 py-4 space-y-2">
          {nav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-mono uppercase tracking-wider font-medium ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-slate hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-hairline">
            <Link
              to="/policy"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill py-2.5 hover:bg-cohere-black transition-colors"
            >
              Ask Assistant
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
