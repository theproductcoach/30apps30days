"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { PantryItem } from "@/lib/supabase";
import PantryItemComponent from "@/components/PantryItem";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PantryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      console.log("No user found, redirecting to sign-in");
      router.push("/sign-in");
      return;
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchItems() {
      if (!user) {
        console.log("[Client] No user in fetchItems");
        return;
      }

      try {
        setError(null);
        console.log("[Client] User ID:", user.id);
        console.log("[Client] Starting API request");

        // Get the session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error("No access token available");
        }

        const response = await fetch("/api/pantry-items", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        console.log("[Client] API response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.log("[Client] API error:", errorData);
          throw new Error(errorData.error || "Failed to fetch items");
        }

        const data = await response.json();
        console.log("[Client] API success, items:", data?.length || 0);
        setItems(data || []);
      } catch (err) {
        console.error("[Client] Error:", err);
        setError(err instanceof Error ? err.message : "Failed to load items");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchItems();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      // Get the session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("No access token available");
      }

      const response = await fetch(`/api/pantry-items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete item");
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item. Please try again.");
    }
  };

  if (authLoading || loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Pantry</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 px-4 py-2 rounded-lg"
          >
            ← Back to Home
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
            <p className="font-medium">Error loading pantry items</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm underline hover:no-underline mt-2"
            >
              Try refreshing the page
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your pantry is empty. Add some items to get started!
            </p>
            <div className="space-x-4">
              <Link
                href="/scan"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Scan Barcode
              </Link>
              <Link
                href="/enter"
                className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Enter Barcode
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <PantryItemComponent
                key={item.id}
                id={item.id}
                barcode={item.barcode}
                imageUrl={item.image_url}
                createdAt={item.created_at}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
