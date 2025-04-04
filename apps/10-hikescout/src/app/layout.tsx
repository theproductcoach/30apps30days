import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HikeScout - Find Your Perfect Hike",
  description: "Discover the best hiking trips around the world",
  icons: {
    icon: "/faviconsmall.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/faviconsmall.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
