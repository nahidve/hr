import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import Prism from "../components/Prism"; // adjust path if different

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white p-6">
      <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.9 }}>
        <Prism
          animationType="rotate"
          timeScale={0.6}
          height={3.5}
          baseWidth={5.5}
          scale={3.8}
          hueShift={0.25}
          colorFrequency={1.8}
          noise={0.03}
          glow={1.4}
          bloom={1.2}
          suspendWhenOffscreen
        />
      </div>

      <div className="relative w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Register to access the HR Portal
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-lg border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}