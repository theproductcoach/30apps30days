"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import BarcodeScanner from "@/components/BarcodeScanner";
import { Button } from "@/components/Button";
import {
  PantryItem,
  addPantryItem,
  getPantryItems,
  uploadPantryImage,
} from "@/lib/supabase";

export default function PantryPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [isAddingManually, setIsAddingManually] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("spice");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPantryItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = await getPantryItems();
      setPantryItems(items);
    } catch (error) {
      console.error("Error fetching pantry items:", error);
      setError("Failed to load pantry items");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPantryItems();
  }, [fetchPantryItems]);

  const handleScan = (result: string) => {
    // When a barcode is scanned, we'd ideally look it up in a database
    // For simplicity, we'll just auto-populate a form with the barcode value
    setIsScanning(false);
    setIsAddingManually(true);
    setItemName(`Item (Barcode: ${result})`);
  };

  const handleScanError = (error: Error) => {
    console.error("Scan error:", error);
    setError("Error scanning barcode: " + error.message);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemName.trim()) {
      setError("Item name is required");
      return;
    }

    if (!imageFile) {
      setError("Please upload an image of the item");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      // Upload image to Supabase Storage
      const imageUrl = await uploadPantryImage(imageFile);

      // Create new pantry item
      const newItem: PantryItem = {
        name: itemName,
        category: itemCategory,
        image_url: imageUrl,
      };

      await addPantryItem(newItem);

      // Reset form
      setItemName("");
      setItemCategory("spice");
      setImageFile(null);
      setImagePreview(null);
      setIsAddingManually(false);

      // Refresh pantry items
      await fetchPantryItems();
    } catch (error) {
      console.error("Error saving pantry item:", error);
      setError("Failed to save pantry item");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Your Pantry</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!isScanning && !isAddingManually && (
        <div className="flex flex-col gap-4 mb-8">
          <Button onClick={() => setIsScanning(true)}>Scan Barcode</Button>
          <Button onClick={() => setIsAddingManually(true)} variant="secondary">
            Add Item Manually
          </Button>
        </div>
      )}

      {isScanning && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Scan Barcode</h2>
          <BarcodeScanner onScan={handleScan} onError={handleScanError} />
          <div className="mt-4">
            <Button onClick={() => setIsScanning(false)} variant="secondary">
              Cancel Scanning
            </Button>
          </div>
        </div>
      )}

      {isAddingManually && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Pantry Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g. Soy Sauce"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="spice">Spice</option>
                <option value="condiment">Condiment</option>
                <option value="sauce">Sauce</option>
                <option value="herb">Herb</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Item Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />

              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Item preview"
                    className="max-h-40 rounded border border-gray-300"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSaving} className="w-1/2">
                {isSaving ? "Saving..." : "Save Item"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsAddingManually(false);
                  setItemName("");
                  setItemCategory("spice");
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="w-1/2"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4">Your Items</h2>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading items...</div>
        ) : pantryItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No items in your pantry yet
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {pantryItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
