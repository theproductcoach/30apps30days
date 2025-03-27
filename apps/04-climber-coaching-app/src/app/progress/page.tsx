"use client";

import { useState, useEffect } from "react";
import { ClimbLog } from "@/types";
import { getClimbLogs, addClimbLog } from "@/lib/storage";
import { format } from "date-fns";

export default function ProgressPage() {
  const [climbs, setClimbs] = useState<ClimbLog[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    climb_name: "",
    grade: "",
    notes: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const fetchClimbs = () => {
      const climbData = getClimbLogs();
      setClimbs(climbData);
    };

    fetchClimbs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addClimbLog(formData);
      setStatus("success");
      setFormData({
        date: "",
        climb_name: "",
        grade: "",
        notes: "",
      });
      const updatedClimbs = getClimbLogs();
      setClimbs(updatedClimbs);
    } catch (error) {
      console.error("Error logging climb:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">
        Track Your Progress
      </h1>

      <form onSubmit={handleSubmit} className="mb-12 space-y-6">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="climb_name"
            className="block text-sm font-medium text-gray-300"
          >
            Climb Name
          </label>
          <input
            type="text"
            id="climb_name"
            required
            value={formData.climb_name}
            onChange={(e) =>
              setFormData({ ...formData, climb_name: e.target.value })
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-gray-300"
          >
            Grade
          </label>
          <input
            type="text"
            id="grade"
            required
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-300"
          >
            Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Add any notes about the climb, beta, or areas for improvement..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {status === "loading" ? "Logging..." : "Log Climb"}
        </button>

        {status === "success" && (
          <p className="text-green-500 text-center">
            Climb logged successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center">
            There was an error logging your climb. Please try again.
          </p>
        )}
      </form>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-white">Climbing History</h2>
        {climbs.map((climb) => (
          <div key={climb.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {climb.climb_name}
                </h3>
                <p className="text-gray-300">Grade: {climb.grade}</p>
                <time className="text-gray-400 text-sm block mt-1">
                  {format(new Date(climb.date), "MMMM d, yyyy")}
                </time>
              </div>
            </div>
            {climb.notes && (
              <div className="mt-4">
                <p className="text-gray-300">{climb.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
