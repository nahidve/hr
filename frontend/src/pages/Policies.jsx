import { useEffect, useState } from "react";
import api from "../services/api";
import { Edit3, Trash2, BookOpen, Plus } from "lucide-react";

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const { data } = await api.get("/policies");
      setPolicies(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/policies/${editingId}`, form);
      } else {
        await api.post("/policies", form);
      }
      setForm({ title: "", content: "" });
      setEditingId(null);
      setShowForm(false);
      loadPolicies();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (policy) => {
    setEditingId(policy._id);
    setForm({ title: policy.title, content: policy.content });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete policy?")) return;
    try {
      await api.delete(`/policies/${id}`);
      loadPolicies();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-coral font-medium mb-2">Corporate Compliance</p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-primary uppercase">
                Policy Codex
              </h1>
              <p className="font-body text-slate text-sm mt-1">
                Formal directives, operational guidelines, and organizational policy documents.
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  if (showForm) {
                    setEditingId(null);
                    setForm({ title: "", content: "" });
                  }
                }}
                className="bg-primary text-on-primary font-mono text-[11px] uppercase tracking-wider rounded-pill px-4 py-2 hover:bg-cohere-black transition-colors inline-flex items-center gap-1.5"
              >
                {showForm ? "Cancel Edit" : <><Plus className="h-3 w-3" /> Add Policy</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 space-y-8">
        {/* Contact Form Card (Dropdown style based on State) */}
        {showForm && (
          <div className="border border-hairline bg-canvas p-8 rounded-lg shadow-sm">
            <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-6 pb-2 border-b border-hairline">
              {editingId ? "Modify Directive" : "Draft New Directive"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Directive Title
                </label>
                <input
                  placeholder="e.g. Employee Remuneration Scheme"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate block mb-1.5">
                  Directive Content
                </label>
                <textarea
                  rows="6"
                  placeholder="Define formal policy constraints..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill px-6 py-3 hover:bg-cohere-black transition-colors"
              >
                {editingId ? "Publish Update" : "Publish Directive"}
              </button>
            </form>
          </div>
        )}

        {/* Research Table Publication List */}
        <div className="border border-hairline rounded-sm bg-canvas overflow-hidden">
          <div className="bg-soft-stone px-6 py-3 border-b border-hairline grid grid-cols-12 font-mono text-[10px] uppercase tracking-wider text-slate font-bold">
            <span className="col-span-8 md:col-span-9">Directive Title</span>
            <span className="col-span-4 md:col-span-3 text-right">Actions</span>
          </div>

          <div className="divide-y divide-hairline">
            {policies.length === 0 ? (
              <div className="text-center py-12 bg-canvas">
                <BookOpen className="mx-auto h-6 w-6 text-slate opacity-40 mb-2" />
                <p className="font-mono text-xs uppercase tracking-wider text-slate">No compliance directives published</p>
              </div>
            ) : (
              policies.map((policy) => (
                <div
                  key={policy._id}
                  className="bg-canvas hover:bg-soft-stone/10 transition-colors p-6 grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-8 md:col-span-9 space-y-3">
                    <h3 className="font-display text-lg font-bold tracking-tight text-primary uppercase">
                      {policy.title}
                    </h3>
                    <p className="font-body text-sm text-ink leading-relaxed whitespace-pre-line max-w-4xl">
                      {policy.content}
                    </p>
                  </div>

                  <div className="col-span-4 md:col-span-3 flex justify-end gap-4">
                    <button
                      onClick={() => handleEdit(policy)}
                      className="font-mono text-[10px] uppercase tracking-wider text-action-blue hover:underline inline-flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(policy._id)}
                      className="font-mono text-[10px] uppercase tracking-wider text-error hover:underline inline-flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
