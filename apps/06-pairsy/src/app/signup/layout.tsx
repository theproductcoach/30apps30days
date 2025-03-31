import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Pairsy",
  description: "Create a new couple account on Pairsy",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
