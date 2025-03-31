"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNeedsVerification(false);

    try {
      // Try using the API route first
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signin",
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Check if the error is about email verification
        if (
          result.error &&
          (result.error.includes("Email not confirmed") ||
            result.error.includes("Email verification") ||
            result.error.includes("not verified") ||
            result.error.includes("not confirmed"))
        ) {
          setNeedsVerification(true);
          throw new Error(
            "Please verify your email before logging in. Check your inbox for a verification link."
          );
        }
        throw new Error(result.error || "Failed to sign in");
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error during sign in:", error);
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  // Function to resend verification email
  const handleResendVerification = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      // Call the Supabase API to resend verification email
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "resend_verification",
          email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to resend verification email");
      }

      // Show success message
      setError("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Error resending verification:", error);
      setError(error.message || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content-no-status">
          <main className="content-wrapper">
            <div className="header">
              <Link href="/" className="back-link">
                ← Home
              </Link>
              <h1 className="app-title">Sign In</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="forgot-password">
                <Link href="/forgot-password" className="text-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-connect"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {needsVerification && (
                <div className="verification-section">
                  <p className="verification-notice">
                    Your email needs verification. Check your inbox for the
                    verification link.
                  </p>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    Resend Verification Email
                  </button>
                </div>
              )}

              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-link">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
