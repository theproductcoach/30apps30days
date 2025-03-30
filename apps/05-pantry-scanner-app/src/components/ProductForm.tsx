"use client";

interface ProductFormProps {
  barcode: string | null;
  onSubmit: (barcode: string, imageUrl?: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({
  barcode,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode) {
      await onSubmit(barcode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Confirm barcode
        </p>
        <p className="text-2xl font-mono text-gray-900 dark:text-white mb-8">
          {barcode}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!barcode || isLoading}
          className={`px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            !barcode || isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}
