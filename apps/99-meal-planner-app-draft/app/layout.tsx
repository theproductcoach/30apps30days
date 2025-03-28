import { Inter } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black min-h-screen`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
