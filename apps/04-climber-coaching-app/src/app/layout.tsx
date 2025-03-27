import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Will Chan Climbing Coach",
  description: "Professional climbing coaching services by Will Chan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 min-h-screen`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
