"use client";

import AssessmentForm from "@/components/AssessmentForm";
import { useAssessmentStore } from "@/store/assessment";

export default function ManagerAssessment() {
  const { currentUser } = useAssessmentStore();

  if (!currentUser) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please select a user first
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manager Assessment
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Evaluate {currentUser.name}'s competencies from your perspective as their manager
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentUser.name}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manager assessment in progress
            </p>
          </div>
          <div className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            {currentUser.role}
          </div>
        </div>

        <AssessmentForm type="manager" />
      </div>
    </div>
  );
}
