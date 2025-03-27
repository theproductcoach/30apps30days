"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Climb, ClimbSession } from "@/types";
import SessionForm from "@/components/SessionForm";

export default function ClimbDetailPage() {
  const params = useParams();
  const id = params?.id ? String(params.id) : "";
  const [climb, setClimb] = useState<Climb | null>(null);
  const [sessions, setSessions] = useState<ClimbSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch climb and sessions data
    fetch(`/api/climbs`)
      .then((response) => response.json())
      .then((data) => {
        const foundClimb = data.find((c: Climb) => c.id === id);
        setClimb(foundClimb || null);
      });

    fetch(`/api/sessions?climbId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddSession = (session: Omit<ClimbSession, "id">) => {
    fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    })
      .then((response) => response.json())
      .then((newSession) => setSessions([...sessions, newSession]));
  };

  if (loading)
    return <div className="max-w-3xl mx-auto px-4 py-12">Loading...</div>;
  if (!climb)
    return <div className="max-w-3xl mx-auto px-4 py-12">Climb not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-4">{climb.name}</h1>
      <p className="text-gray-400 mb-4">Grade: {climb.grade}</p>
      <p className="text-gray-400 mb-8">
        Status: {sessions[sessions.length - 1]?.status || "in progress"}
      </p>
      <SessionForm climbId={id} onAddSession={handleAddSession} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Session Logs</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-400">No sessions recorded yet.</p>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-300">{session.notes}</p>
              <p className="text-gray-500 text-sm">
                {session.date} - {session.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
