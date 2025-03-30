"use client";

import { useState } from "react";
import { useStorage } from "@/contexts/StorageContext";
import { format } from "date-fns";

interface PantryItemProps {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  addedDate: string;
  imageUrl?: string;
  brand?: string;
}

export default function PantryItem({
  id,
  name,
  barcode,
  quantity,
  addedDate,
  imageUrl,
  brand,
}: PantryItemProps) {
  const { updateItem, removeItem } = useStorage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const displayName = brand ? `${brand}: ${name}` : name;

  const handleSave = () => {
    updateItem(id, {
      name: editedName,
      quantity: editedQuantity,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      removeItem(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(Number(e.target.value))}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Barcode: {barcode}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quantity: {quantity}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Added: {format(new Date(addedDate), "MMM d, yyyy")}
              </p>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={displayName}
                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                />
              )}
            </>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 