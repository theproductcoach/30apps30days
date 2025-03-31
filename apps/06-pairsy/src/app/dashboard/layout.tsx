import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Pairsy",
  description: "Your couple dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
