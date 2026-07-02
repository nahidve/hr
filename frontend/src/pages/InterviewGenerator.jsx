import { useEffect, useState } from "react";

import api from "../services/api";

export default function InterviewGenerator() {
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");

  const [questions, setQuestions] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const { data } = await api.get("/onboarding");

    setEmployees(data);
  };

  const generate = async () => {
    if (!employeeId) return;

    try {
      setLoading(true);

      const { data } = await api.post("/interviews/generate", {
        employeeId,
      });

      setQuestions(data.questions);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    await api.post("/interviews/save", {
      employeeId,
      questions,
    });

    alert("Interview set saved");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">AI Interview Generator</h1>

      <div className="rounded-xl border bg-white p-6">
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <button
          onClick={generate}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-white"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {questions && (
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-4 flex justify-end">
            <button
              onClick={save}
              className="rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Save Set
            </button>
          </div>

          <pre className="whitespace-pre-wrap font-sans">{questions}</pre>
        </div>
      )}
    </div>
  );
}
