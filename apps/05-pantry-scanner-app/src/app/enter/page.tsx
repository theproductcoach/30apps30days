"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { supabase } from "@/lib/supabase";

export default function EnterPage() {
  const { push } = useRouter();
  const [barcode, setBarcode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (submittedBarcode: string) => {
    if (!submittedBarcode) {
      setError("Please enter a barcode");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        push("/sign-in");
        return;
      }

      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          barcode: submittedBarcode,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save product");
      }

      const savedItem = await response.json();
      console.log("Product saved:", savedItem);

      // Clear the form
      setBarcode("");

      // Show success message and redirect
      alert("Product saved successfully!");
      push("/pantry");
    } catch (error) {
      console.error("Error saving product:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to save product. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8">Enter Barcode</h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="barcode"
              className="block text-sm font-medium text-gray-700"
            >
              Barcode
            </label>
            <input
              type="text"
              id="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter barcode number"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {barcode && !error && (
          <div className="mt-8">
            <ProductForm
              barcode={barcode}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </main>
  );
}
