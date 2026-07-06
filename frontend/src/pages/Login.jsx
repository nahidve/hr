import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      if (data.user.role === "HR") navigate("/");
      else navigate("/profile");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="font-display text-4xl leading-tight" style={{ letterSpacing: '-1px' }}>Welcome back</h2>
          <p className="mt-2 text-sm text-slate-600">Sign in to access your HR dashboard and profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-hairline rounded-[16px] p-6 shadow-sm">
          <label className="block text-sm mb-2 text-slate-600">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mb-4 rounded-md border border-light px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[rgba(155,96,170,0.12)]"
            placeholder="you@company.com"
          />

          <label className="block text-sm mb-2 text-slate-600">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mb-4 rounded-md border border-light px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[rgba(76,110,230,0.12)]"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-pill bg-[#17171c] text-white py-3 px-4 text-sm font-medium"
            style={{ borderRadius: 32 }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="mt-4 flex items-center justify-between text-sm">
            <button type="button" onClick={() => navigate('/register')} className="text-action-blue underline" style={{ color: '#1863dc' }}>
              Create account
            </button>
            <button type="button" className="text-slate-500 underline">Forgot password?</button>
          </div>
        </form>
      </div>
    </div>
  );
}