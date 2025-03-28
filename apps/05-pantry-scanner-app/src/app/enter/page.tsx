"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";

export default function EnterPage() {
  const router = useRouter();
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (barcode: string, imageUrl?: string) => {
    try {
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barcode, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      router.push("/");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) {
      setError("Please enter a barcode");
      return;
    }
    setError("");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Enter Barcode</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-lg"
          >
            ← Back to Home
          </Link>
        </div>

        <form
          onSubmit={handleBarcodeSubmit}
          className="max-w-md mx-auto space-y-4"
        >
          <div>
            <label
              htmlFor="barcode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Barcode
            </label>
            <input
              type="text"
              id="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              placeholder="Enter barcode number"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg
              hover:bg-blue-700 transition-colors duration-200"
          >
            Continue
          </button>
        </form>

        {barcode && !error && (
          <div className="mt-8">
            <ProductForm barcode={barcode} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </main>
  );
}
