"use client";

interface ProductFormProps {
  barcode: string | null;
  onSubmit: () => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({
  barcode,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={barcode || ""}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={!barcode || isLoading}
          className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            !barcode || isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
