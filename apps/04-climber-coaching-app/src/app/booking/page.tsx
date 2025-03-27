"use client";

import { useState } from "react";
import { addBookingRequest } from "@/lib/storage";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferred_date: "",
    goals: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addBookingRequest(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        preferred_date: "",
        goals: "",
      });
    } catch (error) {
      console.error("Error submitting booking request:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">
        Book a Climbing Session
      </h1>

      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="preferred_date"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Preferred Date
            </label>
            <input
              type="date"
              id="preferred_date"
              required
              value={formData.preferred_date}
              onChange={(e) =>
                setFormData({ ...formData, preferred_date: e.target.value })
              }
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="goals"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Climbing Goals
            </label>
            <textarea
              id="goals"
              required
              rows={4}
              value={formData.goals}
              onChange={(e) =>
                setFormData({ ...formData, goals: e.target.value })
              }
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
              placeholder="Tell me about your climbing experience and what you'd like to achieve..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200"
          >
            {status === "loading" ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Request"
            )}
          </button>
        </form>
      </div>

      {status === "success" && (
        <div className="bg-green-900/50 border border-green-500 text-green-400 px-4 py-3 rounded-md flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Your request has been submitted successfully!
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded-md flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          There was an error submitting your request. Please try again.
        </div>
      )}
    </div>
  );
}
