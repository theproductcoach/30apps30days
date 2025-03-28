"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BarcodeScanner from "@/components/BarcodeScanner";
import ProductForm from "@/components/ProductForm";

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
      <h1 className="text-2xl font-bold text-center mb-8">Scan Barcode</h1>

      {!scannedBarcode ? (
        <BarcodeScanner onScan={handleScan} />
      ) : (
        <ProductForm barcode={scannedBarcode} onSubmit={handleSubmit} />
      )}
    </main>
  );
}
