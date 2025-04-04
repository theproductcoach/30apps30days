import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HikeScout - Find Your Perfect Hike",
  description: "Discover the best hiking trips around London",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
