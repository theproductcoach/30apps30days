"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BarcodeScanner from "@/components/BarcodeScanner";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { useStorage } from "@/contexts/StorageContext";

export default function ScanPage() {
  const router = useRouter();
  const { addItem } = useStorage();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleScan = (barcode: string) => {
    setScannedBarcode(barcode);
  };

  const handleSave = async () => {
    if (!scannedBarcode) {
      alert("Please scan or enter a barcode first");
      return;
    }

    try {
      setIsSaving(true);

      // Add item to local storage
      addItem({
        name: `Product ${scannedBarcode}`,
        barcode: scannedBarcode,
        quantity: 1,
        imageUrl: capturedImage || undefined,
      });

      // Clear the form
      setScannedBarcode(null);
      setCapturedImage(null);

      // Show success message and redirect
      alert("Product saved successfully!");
      router.push("/pantry");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setIsSaving(false);
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

        <div className="flex-1 p-4">
          {!scannedBarcode ? (
            <BarcodeScanner onScan={handleScan} />
          ) : (
            <ProductForm
              barcode={scannedBarcode}
              onSubmit={handleSave}
              isLoading={isSaving}
            />
          )}
        </div>
      </div>
    </main>
  );
}
