"use client";

import { useState, useEffect } from "react";
import { Climb } from "@/types";
import ClimbCard from "@/components/ClimbCard";

export default function JournalPage() {
  const [climbs, setClimbs] = useState<Climb[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    grade: "",
    notes: "",
    status: "in progress",
  });

  useEffect(() => {
    fetch("/api/climbs")
      .then((response) => response.json())
      .then((data) => {
        setClimbs(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/climbs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((newClimb) => {
        setClimbs([...climbs, newClimb]);
        setForm({ name: "", grade: "", notes: "", status: "in progress" });
      });
  };

  if (loading)
    return <div className="max-w-3xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Redpoint Journal</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input-field mb-4 block w-full"
          required
        />
        <input
          type="text"
          placeholder="Grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          className="input-field mb-4 block w-full"
          required
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="input-field mb-4 block w-full"
          rows={3}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="input-field mb-4 block w-full"
        >
          <option value="in progress">In Progress</option>
          <option value="sent">Sent</option>
        </select>
        <button type="submit" className="btn-primary">
          Add Climb
        </button>
      </form>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {climbs.length === 0 ? (
          <p className="text-gray-400 col-span-3">No climbs recorded yet.</p>
        ) : (
          climbs.map((climb) => <ClimbCard key={climb.id} climb={climb} />)
        )}
      </div>
    </div>
  );
}
