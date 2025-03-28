"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BarcodeScanner from "@/components/BarcodeScanner";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";

export default function ScanPage() {
  const router = useRouter();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  const handleScan = (barcode: string) => {
    setScannedBarcode(barcode);
  };

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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Scan Barcode</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-lg"
          >
            ← Back to Home
          </Link>
        </div>

        {!scannedBarcode ? (
          <BarcodeScanner onScan={handleScan} />
        ) : (
          <ProductForm barcode={scannedBarcode} onSubmit={handleSubmit} />
        )}
      </div>
    </main>
  );
}
