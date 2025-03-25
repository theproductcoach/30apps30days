"use client";

import AssessmentForm from "@/components/AssessmentForm";
import { useAssessmentStore } from "@/store/assessment";

export default function SelfAssessment() {
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
              Self Assessment
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Evaluate your current competencies on a scale of 1-5
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-blue-200 dark:border-blue-800">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentUser.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Completing self-assessment
              </p>
            </div>
            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              {currentUser.role}
            </div>
          </div>

          <AssessmentForm type="self" />
        </div>
      </div>
    </div>
  );
}
