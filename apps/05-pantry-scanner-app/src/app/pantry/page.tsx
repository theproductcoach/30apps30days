"use client";

import { useStorage } from "@/contexts/StorageContext";
import PantryItem from "@/components/PantryItem";
import Link from "next/link";

export default function PantryPage() {
  const { items } = useStorage();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Pantry</h1>
          <div className="flex gap-4">
            <Link
              href="/scan"
              className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Scan New Item
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-lg"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Your pantry is empty. Add some items to get started!
            </p>
            <Link
              href="/scan"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Scan Your First Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <PantryItem key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 