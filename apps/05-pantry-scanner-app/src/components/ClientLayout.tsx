"use client";

import { StorageProvider } from "@/contexts/StorageContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StorageProvider>{children}</StorageProvider>;
}
