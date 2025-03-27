"use client";

import { useState } from "react";
import { ClimbSession } from "@/types";

export default function SessionForm({
  climbId,
  onAddSession,
}: {
  climbId: string;
  onAddSession: (session: Omit<ClimbSession, "id">) => void;
}) {
  const [form, setForm] = useState({
    notes: "",
    status: "in progress",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSession({ ...form, climbId });
    setForm({
      notes: "",
      status: "in progress",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="input-field mb-4"
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="input-field mb-4"
      >
        <option value="in progress">In Progress</option>
        <option value="sent">Sent</option>
      </select>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="input-field mb-4"
      />
      <button type="submit" className="btn-primary">
        Add Session
      </button>
    </form>
  );
}
