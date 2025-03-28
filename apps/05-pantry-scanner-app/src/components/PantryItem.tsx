"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface PantryItemProps {
  id: string;
  barcode: string;
  imageUrl?: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function PantryItem({
  id,
  barcode,
  imageUrl,
  createdAt,
  onDelete,
}: PantryItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("pantry_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
      onDelete(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Product ${barcode}`}
          className="w-16 h-16 object-cover rounded-md"
        />
      )}
      <div className="flex-1">
        <p className="font-medium text-gray-900 dark:text-gray-100">
          Barcode: {barcode}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Added: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
      >
        {isDeleting ? "Deleting..." : "🗑️"}
      </button>
    </div>
  );
}
