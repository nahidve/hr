import { useState } from "react";
import api from "../services/api";

export default function Onboarding() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

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

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("department", form.department);
      formData.append("resume", resume);

      const { data } = await api.post(
        "/onboarding",
        formData
      );

      setEmployee(data);

      setForm({
        name: "",
        email: "",
        department: "",
      });

      setResume(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Employee Onboarding
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResume(e.target.files[0])
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : "Create Employee"}
          </button>
        </form>
      </div>

      {employee && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              {employee.name}
            </h2>

            <p className="text-slate-600">
              {employee.email}
            </p>

            <p className="text-slate-600">
              {employee.department}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {employee.skills?.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">
              Experience Summary
            </h3>

            <p className="leading-relaxed text-slate-700">
              {employee.experienceSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}