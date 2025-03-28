"use client";

import { useState } from "react";

interface ProductFormProps {
  barcode: string;
  onSubmit: (barcode: string, imageUrl?: string) => void;
}

export default function ProductForm({ barcode, onSubmit }: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <p className="text-lg font-semibold">Barcode: {barcode}</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Product Photo (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Product preview"
            className="mt-2 max-w-xs mx-auto rounded-lg shadow-md"
          />
        )}
      </div>

      <button
        onClick={() => onSubmit(barcode, imageUrl || undefined)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg
          hover:bg-blue-700 transition-colors duration-200"
      >
        Save Product
      </button>
    </div>
  );
}
