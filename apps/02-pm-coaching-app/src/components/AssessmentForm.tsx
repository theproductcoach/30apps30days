"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { competencies } from "@/data/competencies";
import { useAssessmentStore } from "@/store/assessment";
import { Assessment } from "@/types/assessment";

interface AssessmentFormProps {
  type: "self" | "manager";
}

export default function AssessmentForm({ type }: AssessmentFormProps) {
  const router = useRouter();
  const { currentUser, addAssessment } = useAssessmentStore();
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    const assessment: Assessment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      type,
      competencies: scores,
      notes: Object.entries(notes)
        .filter(([_, note]) => note.trim() !== "")
        .reduce(
          (acc, [id, note]) => ({
            ...acc,
            [id]: note.trim(),
          }),
          {}
        ),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const confirmed = window.confirm(
      `Are you sure you want to submit this ${type} assessment? This action cannot be undone.`
    );

    if (confirmed) {
      addAssessment(assessment);
      router.push("/comparison");
    }
  };

  const handleScoreChange = (competencyId: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [competencyId]: value,
    }));
  };

  const handleNoteChange = (competencyId: string, value: string) => {
    setNotes((prev) => ({
      ...prev,
      [competencyId]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {competencies.map((competency) => (
        <div
          key={competency.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {competency.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {competency.description}
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Score (1-5)
            </label>
            <div className="mt-2 flex items-center justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => handleScoreChange(competency.id, score)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                    scores[competency.id] === score
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes for {competency.name}
            </label>
            <textarea
              value={notes[competency.id] || ""}
              onChange={(e) => handleNoteChange(competency.id, e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              rows={3}
              placeholder={`Add any comments or observations about ${competency.name.toLowerCase()}...`}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          disabled={Object.keys(scores).length !== competencies.length}
        >
          Submit Assessment
        </button>
      </div>
    </form>
  );
}
