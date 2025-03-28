import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PantrySnap - Barcode Scanner",
  description: "Scan and save your pantry items with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} bg-gray-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
