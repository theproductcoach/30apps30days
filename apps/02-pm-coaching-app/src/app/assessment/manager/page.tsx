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
    <div className="flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl"></div>
          <div className="relative p-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-200">
              Manager Assessment
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Evaluate {currentUser.name}'s competencies from your perspective
              as their manager
            </p>
          </div>
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
    </div>
  );
}
