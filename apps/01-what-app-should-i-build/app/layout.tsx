import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Idea Generator",
  description: "Generate creative app ideas instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
