"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Get email from user object or localStorage if available
    if (user?.email) {
      setEmail(user.email);
    } else {
      const storedEmail = localStorage.getItem("signupEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [user]);

  // Function to resend verification email
  const handleResendVerification = async () => {
    if (!email) {
      setMessage("Email address not found. Please go back and sign up again.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Call the API to resend verification email
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

      setMessage("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Error resending verification:", error);
      setMessage(error.message || "Failed to resend verification email");
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
              <h1 className="app-title">Verify Email</h1>
            </div>

            <div className="verify-email-content">
              <div className="verify-icon">✉️</div>
              <h2 className="verify-title">Check Your Email</h2>

              <p className="verify-message">
                We've sent a verification link to:
              </p>
              <p className="verify-email">{email || "your email address"}</p>

              <p className="verify-instructions">
                Please click the link in the email to verify your account. If
                you don't see it, check your spam folder.
              </p>

              {message && (
                <div
                  className={`message ${
                    message.includes("Failed") ? "error" : "success"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="verify-actions">
                <Link href="/login" className="btn btn-primary">
                  Go to Login
                </Link>
              </div>

              <div className="verify-help">
                <p>
                  Didn't receive an email?{" "}
                  <button
                    className="text-link"
                    onClick={handleResendVerification}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Resend verification email"}
                  </button>
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
