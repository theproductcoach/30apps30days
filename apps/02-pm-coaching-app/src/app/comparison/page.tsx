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
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-2xl"></div>
        <div className="relative p-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-200">
            Assessment Comparison
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Compare your self-assessment with manager feedback and ideal targets
          </p>
        </div>
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

                  <div className="mt-4 space-y-3">
                    {selfScore < managerScore && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          You rated yourself lower than your manager. Consider:
                        </p>
                        <ul className="mt-2 ml-4 list-disc text-sm text-yellow-700 dark:text-yellow-300">
                          <li>
                            Documenting your achievements and contributions
                          </li>
                          <li>
                            Seeking regular feedback to validate your
                            self-assessment
                          </li>
                          <li>
                            Building confidence in your capabilities through
                            small wins
                          </li>
                        </ul>
                      </div>
                    )}

                    {selfScore > managerScore && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <p className="text-sm text-red-800 dark:text-red-200">
                          You rated yourself higher than your manager. Consider:
                        </p>
                        <ul className="mt-2 ml-4 list-disc text-sm text-red-700 dark:text-red-300">
                          <li>
                            Requesting specific examples of areas needing
                            improvement
                          </li>
                          <li>
                            Setting up regular check-ins to align on
                            expectations
                          </li>
                          <li>
                            Seeking peer feedback to get a broader perspective
                          </li>
                        </ul>
                      </div>
                    )}

                    {gap > 0 && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Recommended Actions:
                        </p>
                        <ul className="mt-2 ml-4 list-disc text-sm text-green-700 dark:text-green-300">
                          {competency.id === "quality-assurance" && (
                            <>
                              <li>
                                Create a quality checklist for your deliverables
                              </li>
                              <li>
                                Set up automated testing for critical features
                              </li>
                              <li>
                                Establish regular QA review sessions with your
                                team
                              </li>
                            </>
                          )}
                          {competency.id === "fluency-with-data" && (
                            <>
                              <li>Take an online course in data analysis</li>
                              <li>
                                Start tracking key metrics for your product
                              </li>
                              <li>
                                Practice presenting data insights to
                                stakeholders
                              </li>
                            </>
                          )}
                          {competency.id === "voice-of-customer" && (
                            <>
                              <li>Schedule regular customer interviews</li>
                              <li>
                                Create a customer feedback collection system
                              </li>
                              <li>Build a customer journey map</li>
                            </>
                          )}
                          {competency.id === "ux-design" && (
                            <>
                              <li>Learn basic UX design principles</li>
                              <li>Conduct user research sessions</li>
                              <li>Create user personas and scenarios</li>
                            </>
                          )}
                          {competency.id === "business-outcome" && (
                            <>
                              <li>
                                Define clear success metrics for your projects
                              </li>
                              <li>
                                Create a business impact tracking dashboard
                              </li>
                              <li>
                                Regularly review and adjust based on business
                                goals
                              </li>
                            </>
                          )}
                          {competency.id === "product-vision" && (
                            <>
                              <li>Develop a 6-month product roadmap</li>
                              <li>Create a product vision document</li>
                              <li>
                                Practice communicating your vision to
                                stakeholders
                              </li>
                            </>
                          )}
                          {competency.id === "strategic-impact" && (
                            <>
                              <li>Map out your product's strategic position</li>
                              <li>Identify key strategic initiatives</li>
                              <li>
                                Build relationships with senior stakeholders
                              </li>
                            </>
                          )}
                          {competency.id === "stakeholder-management" && (
                            <>
                              <li>Create a stakeholder map</li>
                              <li>
                                Set up regular stakeholder update meetings
                              </li>
                              <li>Develop a communication plan</li>
                            </>
                          )}
                          {competency.id === "team-leadership" && (
                            <>
                              <li>Mentor junior team members</li>
                              <li>Lead team retrospectives</li>
                              <li>Develop team-building activities</li>
                            </>
                          )}
                          {competency.id === "managing-up" && (
                            <>
                              <li>Prepare detailed status updates</li>
                              <li>Schedule regular 1:1s with your manager</li>
                              <li>Proactively identify and solve problems</li>
                            </>
                          )}
                          {competency.id === "feature-specification" && (
                            <>
                              <li>Create detailed PRD templates</li>
                              <li>
                                Document user stories and acceptance criteria
                              </li>
                              <li>Set up a specification review process</li>
                            </>
                          )}
                          {competency.id === "product-delivery" && (
                            <>
                              <li>Create a delivery timeline</li>
                              <li>Set up regular progress tracking</li>
                              <li>Implement agile ceremonies</li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}

                    {(selfNote || managerNote) && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          Additional Notes:
                        </p>
                        {selfNote && (
                          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Your notes:</span>{" "}
                            {selfNote}
                          </p>
                        )}
                        {managerNote && (
                          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Manager notes:</span>{" "}
                            {managerNote}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
