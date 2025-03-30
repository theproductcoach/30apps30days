"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductFormProps {
  barcode: string | null;
  onSubmit: (barcode: string, productData?: ProductData) => Promise<void>;
  isLoading?: boolean;
}

interface ProductData {
  name: string;
  brand: string;
  imageUrl: string | null;
  quantity: string | null;
  categories: string | null;
  ingredients: string | null;
  nutriments: any | null;
}

export default function ProductForm({
  barcode,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!barcode) return;

      setIsLoadingProduct(true);
      setError(null);

      try {
        const response = await fetch("/api/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ barcode }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch product");
        }

        const data = await response.json();
        setProductData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
        setProductData(null);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode) {
      await onSubmit(barcode, productData || undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Product Details
        </p>
        <p className="text-lg font-mono text-gray-600 dark:text-gray-400 mb-4">
          Barcode: {barcode}
        </p>

        {isLoadingProduct && (
          <p className="text-blue-600 dark:text-blue-400">
            Loading product information...
          </p>
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        )}

        {productData && (
          <div className="space-y-4 text-left p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {productData.name}
            </h3>
            {productData.brand && (
              <p className="text-gray-600 dark:text-gray-300">
                Brand: {productData.brand}
              </p>
            )}
            {productData.quantity && (
              <p className="text-gray-600 dark:text-gray-300">
                Quantity: {productData.quantity}
              </p>
            )}
            {productData.imageUrl && (
              <div className="relative w-full h-48 my-4">
                <Image
                  src={productData.imageUrl}
                  alt={productData.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            {productData.categories && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Categories: {productData.categories}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!barcode || isLoading || isLoadingProduct}
          className={`px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            !barcode || isLoading || isLoadingProduct
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
