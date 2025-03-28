"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">PantrySnap</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Keep track of your pantry items by scanning barcodes or entering
            them manually. Take photos of your items and organize them all in
            one place.
          </p>
          <Link
            href="/sign-in"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg
              hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In to Get Started
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">PantrySnap</h1>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-lg"
          >
            Sign Out
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          Keep track of your pantry items by scanning barcodes or entering them
          manually. Take photos of your items and organize them all in one
          place.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/pantry"
          className="group block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-purple-100 dark:border-purple-900 hover:border-purple-200 dark:hover:border-purple-800"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🏪</div>
            <h2 className="text-2xl font-semibold mb-2 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
              My Pantry
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage your saved items
            </p>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/scan"
            className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-100 dark:border-blue-900 hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📸</div>
              <h2 className="text-2xl font-semibold mb-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                Scan Barcode
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Use your camera to scan product barcodes
              </p>
            </div>
          </Link>

          <Link
            href="/enter"
            className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-green-100 dark:border-green-900 hover:border-green-200 dark:hover:border-green-800"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⌨️</div>
              <h2 className="text-2xl font-semibold mb-2 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300">
                Enter Barcode
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Manually enter product barcodes
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
