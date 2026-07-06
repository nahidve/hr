import { useEffect, useState } from "react";
import api from "../services/api";
import { Edit3, Trash2, BookOpen, Plus, Search, ChevronDown, ChevronUp } from "lucide-react";

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

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

  const handleEdit = (policy, e) => {
    e.stopPropagation(); // Avoid triggering accordion toggle
    setEditingId(policy._id);
    setForm({ title: policy.title, content: policy.content });
    setShowForm(true);
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Avoid triggering accordion toggle
    if (!window.confirm("Delete policy?")) return;
    try {
      await api.delete(`/policies/${id}`);
      loadPolicies();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredPolicies = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

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
                className="bg-primary text-on-primary font-mono text-[11px] uppercase tracking-wider rounded-pill px-4 py-2 hover:bg-cohere-black transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                {showForm ? "Cancel Edit" : <><Plus className="h-3 w-3" /> Add Policy</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 space-y-8">
        {/* Contact Form Card */}
        {showForm && (
          <div className="border border-hairline bg-canvas p-8 rounded-sm shadow-sm transition-all duration-300">
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
                className="bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-pill px-6 py-3 hover:bg-cohere-black transition-colors cursor-pointer"
              >
                {editingId ? "Publish Update" : "Publish Directive"}
              </button>
            </form>
          </div>
        )}

        {/* Live Filter Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search Policy Codex by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xs border border-hairline bg-canvas font-body text-sm text-primary placeholder-slate focus:outline-none focus:border-form-focus focus:ring-1 focus:ring-form-focus transition-colors"
          />
        </div>

        {/* Accordion Publication List */}
        <div className="border border-hairline rounded-sm bg-canvas overflow-hidden">
          <div className="bg-soft-stone px-6 py-3 border-b border-hairline flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-slate font-bold">
            <span>Published Codex Directives</span>
            <span>Count: {filteredPolicies.length}</span>
          </div>

          <div className="divide-y divide-hairline">
            {filteredPolicies.length === 0 ? (
              <div className="text-center py-12 bg-canvas">
                <BookOpen className="mx-auto h-6 w-6 text-slate opacity-40 mb-2" />
                <p className="font-mono text-xs uppercase tracking-wider text-slate">No matching directives found</p>
              </div>
            ) : (
              filteredPolicies.map((policy) => {
                const isExpanded = expandedId === policy._id;
                return (
                  <div
                    key={policy._id}
                    onClick={() => toggleExpand(policy._id)}
                    className="bg-canvas hover:bg-soft-stone/10 transition-colors cursor-pointer"
                  >
                    {/* Header Row */}
                    <div className="p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-slate flex-shrink-0">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                        <h3 className="font-display text-base font-bold tracking-tight text-primary uppercase select-none">
                          {policy.title}
                        </h3>
                      </div>
                      
                      {/* Action Links */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleEdit(policy, e)}
                          className="font-mono text-[10px] uppercase tracking-wider text-action-blue hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(policy._id, e)}
                          className="font-mono text-[10px] uppercase tracking-wider text-error hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>

                    {/* Expandable Content Panel */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-dashed border-hairline/60 bg-soft-stone/20 animate-fade-in">
                        <p className="font-body text-sm text-ink leading-relaxed whitespace-pre-line max-w-4xl pr-4">
                          {policy.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
