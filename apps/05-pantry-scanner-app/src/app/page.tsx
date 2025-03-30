"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative w-24 h-24">
            <Image
              src="/pantrysnapimage.png"
              alt="PantrySnap Logo"
              fill
              className="object-contain dark:invert"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold">PantrySnap</h1>
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
