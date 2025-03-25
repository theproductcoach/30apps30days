import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PM Coaching App",
  description:
    "Track your professional development and get personalized coaching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Navigation />
              <ThemeToggle />
            </div>
            <main className="py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
