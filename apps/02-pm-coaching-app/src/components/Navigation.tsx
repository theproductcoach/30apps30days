"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationProps {
  showBack?: boolean;
}

export default function Navigation({ showBack = false }: NavigationProps) {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800">
      <Link
        href="/"
        className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
      >
        PM Coaching
      </Link>
      {showBack && (
        <button
          onClick={() => router.back()}
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          ← Back
        </button>
      )}
    </nav>
  );
}
