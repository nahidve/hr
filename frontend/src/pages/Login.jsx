import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import Prism from "../components/Prism"; // adjust if your path is different

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

      const { data } = await api.post(
        "/auth/login",
        form
      );

      login(data.token, data.user);

      if (data.user.role === "HR") {
        navigate("/");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Invalid credentials"
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
          Welcome Back
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Sign in to continue to the HR Portal
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}