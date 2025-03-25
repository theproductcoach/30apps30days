"use client";

import Link from "next/link";
import { useAssessmentStore } from "@/store/assessment";
import { users } from "@/data/users";
import { User, CompetencyLevel } from "@/types/assessment";
import { useState } from "react";

const roleOrder: CompetencyLevel[] = [
  "APM",
  "PM",
  "Senior PM",
  "GPM",
  "Director",
  "Senior Director",
  "VP",
  "CPO",
];
const roleLabels: Record<CompetencyLevel, string> = {
  APM: "Associate Product Managers",
  PM: "Product Managers",
  "Senior PM": "Senior Product Managers",
  GPM: "Group Product Managers",
  Director: "Product Directors",
  "Senior Director": "Senior Product Directors",
  VP: "VP of Product",
  CPO: "Chief Product Officer",
};

export default function Home() {
  const { currentUser, setCurrentUser } = useAssessmentStore();
  const [selectedRole, setSelectedRole] = useState<CompetencyLevel>("APM");

  const usersByRole = roleOrder.reduce((acc, role) => {
    acc[role] = users.filter((user) => user.role === role);
    return acc;
  }, {} as Record<CompetencyLevel, User[]>);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          PM Coaching App
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your professional development and get personalized coaching
        </p>
      </div>

      <div className="flex flex-col space-y-6">
        {/* Role tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav
            className="-mb-px flex space-x-4 overflow-x-auto"
            aria-label="Role levels"
          >
            {roleOrder.map((role) => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                  if (currentUser?.role !== role) {
                    setCurrentUser(null);
                  }
                }}
                className={`whitespace-nowrap px-4 py-2 border-b-2 font-medium text-sm ${
                  selectedRole === role
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {role}
              </button>
            ))}
          </nav>
        </div>

        {/* User selection grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {usersByRole[selectedRole].map((user: User) => (
            <button
              key={user.id}
              onClick={() => setCurrentUser(user)}
              className={`relative p-3 rounded-lg text-left transition-all ${
                currentUser?.id === user.id
                  ? "bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500 shadow-sm"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {currentUser?.id === user.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-75"></div>
                  <div className="absolute inset-0 rounded-full bg-primary-500"></div>
                </div>
              )}
              <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                {user.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Next steps */}
        {currentUser && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Next Steps for {currentUser.name}
              </h2>
              <div className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                {currentUser.role}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/assessment/self"
                className="relative p-3 rounded-lg text-left transition-all bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 text-lg">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-primary-500 dark:group-hover:text-primary-400">
                      Self Assessment
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Evaluate your own competencies
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/assessment/manager"
                className="relative p-3 rounded-lg text-left transition-all bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 text-lg">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-primary-500 dark:group-hover:text-primary-400">
                      Manager Assessment
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Get feedback from your manager
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/comparison"
                className="relative p-3 rounded-lg text-left transition-all bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 text-lg">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-primary-500 dark:group-hover:text-primary-400">
                      View Comparison
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Compare assessments and identify gaps
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
