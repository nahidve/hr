import { useState } from "react";
import api from "../services/api";

export default function JobDescriptionGenerator() {
  const [form, setForm] = useState({
    department: "",
    experienceLevel: "",
    skills: "",
  });

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/job-descriptions/generate", {
        department: form.department,

        experienceLevel: form.experienceLevel,

        skills: form.skills.split(",").map((s) => s.trim()),
      });

      setContent(data.content);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    await api.post("/job-descriptions/save", {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
      content,
      title: form.department,
    });

    alert("Saved successfully");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">AI Job Description Generator</h1>

      <div className="rounded-xl border bg-white p-6">
        <div className="grid gap-4">
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            placeholder="Experience Level"
            value={form.experienceLevel}
            onChange={(e) =>
              setForm({
                ...form,
                experienceLevel: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={(e) =>
              setForm({
                ...form,
                skills: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <button
            onClick={generate}
            className="rounded-lg bg-slate-900 px-4 py-3 text-white"
          >
            {loading ? "Generating..." : "Generate JD"}
          </button>
        </div>
      </div>

      {content && (
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-4 flex justify-end">
            <button
              onClick={save}
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Save Template
            </button>
          </div>

          <pre className="whitespace-pre-wrap font-sans">{content}</pre>
        </div>
      )}
    </div>
  );
}
