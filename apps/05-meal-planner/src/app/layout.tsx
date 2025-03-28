import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meal Planner",
  description: "Plan your meals, organize your pantry, and find recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="bg-emerald-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Meal Planner
              </Link>
              <nav className="flex space-x-4">
                <Link href="/pantry" className="hover:underline">
                  Pantry
                </Link>
                <Link href="/questionnaire" className="hover:underline">
                  Preferences
                </Link>
                <Link href="/plan" className="hover:underline">
                  Meal Plan
                </Link>
                <Link href="/dinner" className="hover:underline">
                  Tonight's Dinner
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-6">
            {children}
          </main>
          <footer className="bg-slate-100 p-4 text-center text-slate-600 text-sm">
            <div className="container mx-auto">
              <p>Meal Planner App &copy; {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
