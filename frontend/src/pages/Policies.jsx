import { useEffect, useState } from "react";

import api from "../services/api";

export default function Policies() {
  const [policies, setPolicies] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    const { data } = await api.get("/policies");

    setPolicies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/policies/${editingId}`, form);
      } else {
        await api.post("/policies", form);
      }

      setForm({
        title: "",
        content: "",
      });

      setEditingId(null);

      loadPolicies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (policy) => {
    setEditingId(policy._id);

    setForm({
      title: policy.title,
      content: policy.content,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete policy?")) return;

    await api.delete(`/policies/${id}`);

    loadPolicies();
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold">Policy Management</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Policy Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-lg border border-slate-200 px-4 py-3"
          />

          <textarea
            rows="6"
            placeholder="Policy Content"
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            className="w-full rounded-lg border border-slate-200 px-4 py-3"
          />

          <button className="rounded-lg bg-slate-900 px-5 py-3 text-white">
            {editingId ? "Update Policy" : "Create Policy"}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">{policy.title}</h2>

                <p className="mt-2 text-sm text-slate-600">{policy.content}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(policy)}
                  className="rounded-lg bg-blue-100 px-3 py-2 text-sm text-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(policy._id)}
                  className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
