"use client";

import { useAssessmentStore } from "@/store/assessment";
import RadarChart from "@/components/RadarChart";
import { competencies } from "@/data/competencies";

export default function Comparison() {
  const { currentUser, assessments } = useAssessmentStore();

  if (!currentUser) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please select a user first
        </p>
      </div>
    );
  }

  const selfAssessment = assessments.find(
    (a) => a.userId === currentUser.id && a.type === "self"
  );

  const managerAssessment = assessments.find(
    (a) => a.userId === currentUser.id && a.type === "manager"
  );

  const gaps = competencies
    .map((competency) => {
      const selfScore = selfAssessment?.competencies[competency.id] || 0;
      const managerScore = managerAssessment?.competencies[competency.id] || 0;
      const idealScore = competency.idealScores[currentUser.role];
      const gap = Math.max(idealScore - selfScore, idealScore - managerScore);
      const selfNote = selfAssessment?.notes?.[competency.id];
      const managerNote = managerAssessment?.notes?.[competency.id];

      return {
        competency,
        gap,
        selfScore,
        managerScore,
        idealScore,
        selfNote,
        managerNote,
      };
    })
    .filter((item) => item.gap > 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Assessment Comparison
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Compare your self-assessment with manager feedback and ideal targets
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {currentUser.name}
          </h2>
          <div className="inline-block px-3 py-1 mt-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            {currentUser.role}
          </div>
        </div>

        <RadarChart
          selfAssessment={selfAssessment}
          managerAssessment={managerAssessment}
          user={currentUser}
        />
      </div>

      {gaps.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Areas for Improvement
          </h2>
          <div className="space-y-6">
            {gaps.map(
              ({
                competency,
                gap,
                selfScore,
                managerScore,
                idealScore,
                selfNote,
                managerNote,
              }) => (
                <div
                  key={competency.id}
                  className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {competency.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {competency.description}
                  </p>
                  <div className="mt-4 text-sm space-y-1">
                    <p className="text-blue-700 dark:text-blue-300">
                      Target Level: {idealScore}
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Current: Self ({selfScore}) | Manager ({managerScore})
                    </p>
                  </div>

                  {(selfNote || managerNote) && (
                    <div className="mt-4 space-y-4 border-t border-blue-200 dark:border-blue-800 pt-4">
                      {selfNote && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            Self Assessment Notes
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line break-words">
                            {selfNote}
                          </p>
                        </div>
                      )}
                      {managerNote && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            Manager Assessment Notes
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line break-words">
                            {managerNote}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
