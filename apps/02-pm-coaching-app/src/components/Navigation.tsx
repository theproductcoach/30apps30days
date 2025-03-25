"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationProps {
  showBack?: boolean;
}

export default function Navigation({ showBack = false }: NavigationProps) {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between py-4">
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 bg-gray-900/90 dark:bg-gray-800 rounded-lg"
      >
        <span className="text-lg font-semibold text-primary-400">Home</span>
      </Link>
      {showBack && (
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          ← Back
        </button>
      )}
    </nav>
  );
}
