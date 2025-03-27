"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types";
import { getQuestions, addQuestion } from "@/lib/storage";
import { format } from "date-fns";

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const fetchQuestions = () => {
      const qaData = getQuestions();
      setQuestions(qaData);
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setStatus("loading");

    try {
      await addQuestion({ question: newQuestion.trim() });
      setNewQuestion("");
      setStatus("success");
      const updatedQuestions = getQuestions();
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error submitting question:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Ask a Question</h1>

      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Question
            </label>
            <textarea
              id="question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What would you like to know about climbing?"
              rows={4}
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === "loading" || !newQuestion.trim()}
              className="flex justify-center py-2 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200"
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
                "Submit Question"
              )}
            </button>
          </div>
        </form>
      </div>

      {status === "success" && (
        <div className="bg-green-900/50 border border-green-500 text-green-400 px-4 py-3 rounded-md flex items-center mb-8">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Your question has been submitted successfully!
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded-md flex items-center mb-8">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          There was an error submitting your question. Please try again.
        </div>
      )}

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Recent Questions
        </h2>
        {questions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No questions yet. Be the first to ask!
          </p>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 transition-all duration-200 hover:border-green-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-100 text-lg font-medium">
                    {q.question}
                  </p>
                  <time className="text-gray-400 text-sm mt-1 block">
                    Asked on {format(new Date(q.created_at), "MMMM d, yyyy")}
                  </time>
                </div>
              </div>
              {q.answer && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-300">{q.answer}</p>
                    <time className="text-gray-400 text-sm mt-2 block">
                      Answered on{" "}
                      {format(new Date(q.updated_at!), "MMMM d, yyyy")}
                    </time>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
