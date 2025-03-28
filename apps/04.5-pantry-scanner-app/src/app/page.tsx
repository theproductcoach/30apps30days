import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">PantrySnap</h1>

      <div className="max-w-md mx-auto space-y-4">
        <Link
          href="/scan"
          className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg
            hover:bg-blue-700 transition-colors duration-200 text-center"
        >
          Scan Barcode
        </Link>

        <Link
          href="/enter"
          className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg
            hover:bg-green-700 transition-colors duration-200 text-center"
        >
          Enter Barcode
        </Link>
      </div>
    </main>
  );
}
