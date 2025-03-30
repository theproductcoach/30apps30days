"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { useStorage } from "@/contexts/StorageContext";

interface ProductData {
  name: string;
  brand: string;
  imageUrl: string | null;
  quantity: string | null;
  categories: string | null;
  ingredients: string | null;
  nutriments: any | null;
}

export default function EnterPage() {
  const router = useRouter();
  const { addItem } = useStorage();
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);

  const handleSubmit = async (barcode: string, productData?: ProductData) => {
    try {
      // Add item to local storage with product data if available
      addItem({
        name: productData?.name || `Product ${barcode}`,
        barcode,
        quantity: 1,
        imageUrl: productData?.imageUrl || undefined,
        brand: productData?.brand,
        categories: productData?.categories,
        ingredients: productData?.ingredients,
        nutriments: productData?.nutriments,
      });

      router.push("/pantry");
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
    setShowProductForm(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Enter Barcode
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-lg"
          >
            ← Back to Home
          </Link>
        </div>

        {!showProductForm ? (
          <form
            onSubmit={handleBarcodeSubmit}
            className="max-w-md mx-auto space-y-6"
          >
            <div>
              <label
                htmlFor="barcode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Barcode
              </label>
              <input
                type="text"
                id="barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="w-full px-4 py-3 text-lg font-mono bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter barcode number"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Continue
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <ProductForm barcode={barcode} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </main>
  );
}
