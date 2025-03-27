"use client";

import { useState, useEffect } from "react";
import { BlogPost, BookingRequest, Question } from "@/types";
import { format } from "date-fns";
import {
  getBlogPosts,
  addBlogPost,
  getBookingRequests,
  getQuestions,
  updateQuestionAnswer,
} from "@/lib/storage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "bookings" | "qa">(
    "blog"
  );
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newBlogPost, setNewBlogPost] = useState({ title: "", content: "" });
  const [newAnswer, setNewAnswer] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  function fetchData() {
    setStatus("loading");
    try {
      switch (activeTab) {
        case "blog":
          setBlogPosts(getBlogPosts());
          break;
        case "bookings":
          setBookings(getBookingRequests());
          break;
        case "qa":
          setQuestions(getQuestions());
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setStatus("idle");
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addBlogPost(newBlogPost);
      setStatus("success");
      setNewBlogPost({ title: "", content: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating blog post:", error);
      setStatus("error");
    }
  };

  const handleAnswerSubmit = async (questionId: string) => {
    if (!newAnswer[questionId]) return;

    setStatus("loading");

    try {
      await updateQuestionAnswer(questionId, newAnswer[questionId]);
      setStatus("success");
      setNewAnswer({ ...newAnswer, [questionId]: "" });
      fetchData();
    } catch (error) {
      console.error("Error submitting answer:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("blog")}
            className={`${
              activeTab === "blog"
                ? "border-green-500 text-green-500"
                : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`${
              activeTab === "bookings"
                ? "border-green-500 text-green-500"
                : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Booking Requests
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`${
              activeTab === "qa"
                ? "border-green-500 text-green-500"
                : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Questions & Answers
          </button>
        </nav>
      </div>

      {activeTab === "blog" && (
        <div className="space-y-8 mt-8">
          <form onSubmit={handleBlogSubmit} className="card space-y-4">
            <h2 className="text-xl font-semibold text-white">New Blog Post</h2>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={newBlogPost.title}
                onChange={(e) =>
                  setNewBlogPost({ ...newBlogPost, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Content (Markdown)
              </label>
              <textarea
                id="content"
                required
                rows={6}
                value={newBlogPost.content}
                onChange={(e) =>
                  setNewBlogPost({ ...newBlogPost, content: e.target.value })
                }
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {status === "loading" ? "Publishing..." : "Publish Post"}
            </button>
          </form>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Published Posts
            </h2>
            {blogPosts.map((post) => (
              <div key={post.id} className="card">
                <h3 className="text-lg font-medium text-white">{post.title}</h3>
                <time className="text-sm text-gray-400 block mt-1">
                  {format(new Date(post.created_at), "MMMM d, yyyy")}
                </time>
                <div className="mt-4 text-gray-300">{post.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold text-white">Booking Requests</h2>
          {bookings.map((booking) => (
            <div key={booking.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {booking.name}
                  </h3>
                  <p className="text-gray-300">{booking.email}</p>
                  <p className="text-gray-300">
                    Preferred Date:{" "}
                    {format(new Date(booking.preferred_date), "MMMM d, yyyy")}
                  </p>
                  <p className="text-gray-300">Status: {booking.status}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-300">Goals:</h4>
                <p className="mt-1 text-gray-300">{booking.goals}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "qa" && (
        <div className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold text-white">
            Questions & Answers
          </h2>
          {questions.map((q) => (
            <div key={q.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-100">{q.question}</p>
                  <time className="text-sm text-gray-400 block mt-1">
                    {format(new Date(q.created_at), "MMMM d, yyyy")}
                  </time>
                </div>
              </div>
              {q.answer ? (
                <div className="mt-4 pl-4 border-l-2 border-green-500">
                  <p className="text-gray-300">{q.answer}</p>
                  <time className="text-sm text-gray-400 block mt-1">
                    Answered on{" "}
                    {format(new Date(q.updated_at!), "MMMM d, yyyy")}
                  </time>
                </div>
              ) : (
                <div className="mt-4">
                  <textarea
                    rows={3}
                    value={newAnswer[q.id] || ""}
                    onChange={(e) =>
                      setNewAnswer({ ...newAnswer, [q.id]: e.target.value })
                    }
                    className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="Write your answer here..."
                  />
                  <button
                    onClick={() => handleAnswerSubmit(q.id)}
                    disabled={status === "loading"}
                    className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {status === "loading" ? "Submitting..." : "Submit Answer"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {status === "success" && (
        <p className="text-green-500 text-center mt-4">
          Operation completed successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-center mt-4">
          There was an error. Please try again.
        </p>
      )}
    </div>
  );
}
