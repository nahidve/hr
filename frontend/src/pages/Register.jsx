import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="font-display text-4xl leading-tight" style={{ letterSpacing: '-1px' }}>Create account</h2>
          <p className="mt-2 text-sm text-slate-600">Register to start using the HR system.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-hairline rounded-[16px] p-6 shadow-sm">
          <label className="block text-sm mb-2 text-slate-600">Full name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mb-4 rounded-md border border-light px-3 py-3"
            placeholder="Jane Doe"
          />

          <label className="block text-sm mb-2 text-slate-600">Work email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mb-4 rounded-md border border-light px-3 py-3"
            placeholder="you@company.com"
          />

          <label className="block text-sm mb-2 text-slate-600">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mb-4 rounded-md border border-light px-3 py-3"
            placeholder="Choose a secure password"
          />

          <label className="block text-sm mb-2 text-slate-600">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full mb-4 rounded-md border border-light px-3 py-3">
            <option value="Employee">Employee</option>
            <option value="HR">HR (request access)</option>
          </select>

          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center rounded-pill bg-[#17171c] text-white py-3 px-4 text-sm font-medium" style={{ borderRadius: 32 }}>
            {loading ? 'Creating...' : 'Create account'}
          </button>

          <div className="mt-4 text-sm text-center">
            <button type="button" onClick={() => navigate('/login')} className="text-action-blue underline" style={{ color: '#1863dc' }}>
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}