import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Register() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "Employee",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await api.post(
          "/auth/register",
          form
        );

        navigate("/login");
      } catch {
        alert(
          "Registration failed"
        );
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm"
      >
        <h1 className="mb-6 text-2xl font-bold">
          Register
        </h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mb-4 w-full rounded-lg border p-3"
        >
          <option>
            Employee
          </option>

          <option>
            HR
          </option>
        </select>

        <button className="w-full rounded-lg bg-slate-900 p-3 text-white">
          Create Account
        </button>
      </form>
    </div>
  );
}