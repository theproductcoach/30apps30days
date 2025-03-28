"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/lib/supabase";

interface PantryItemProps {
  id: string;
  barcode: string;
  imageUrl?: string | null;
  productName?: string | null;
  brand?: string | null;
  quantity?: string | null;
  categories?: string | null;
  createdAt: string;
  onDelete: (id: string) => Promise<void>;
}

export default function PantryItem({
  id,
  barcode,
  imageUrl,
  productName,
  brand,
  quantity,
  categories,
  createdAt,
  onDelete,
}: PantryItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setIsDeleting(true);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex flex-col space-y-4">
        {imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={imageUrl}
              alt={productName || "Product image"}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        )}
        <div>
          {productName && (
            <h3 className="text-lg font-semibold">{productName}</h3>
          )}
          {brand && <p className="text-gray-600 dark:text-gray-400">{brand}</p>}
          {quantity && (
            <p className="text-gray-600 dark:text-gray-400">{quantity}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Barcode: {barcode}
          </p>
          {categories && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Categories: {categories}
            </p>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Added {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`text-red-600 hover:text-red-800 text-sm font-medium ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
