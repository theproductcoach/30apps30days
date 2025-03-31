"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Simplified function that just pretends to resend an email
  const handleResendVerification = async () => {
    setLoading(true);
    setMessage(null);

    // Simulate API call delay
    setTimeout(() => {
      setMessage("Verification email sent! Please check your inbox.");
      setLoading(false);
    }, 1000);
  };

  // Simplified function to skip verification and go to dashboard
  const handleSkipVerification = () => {
    router.push("/dashboard");
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
                We&apos;ve sent a verification link to your email address.
              </p>

              <p className="verify-instructions">
                Please click the link in the email to verify your account. If
                you don&apos;t see it, check your spam folder.
              </p>

              {message && <div className="message success">{message}</div>}

              <div className="verify-actions">
                <button
                  onClick={handleSkipVerification}
                  className="btn btn-primary"
                >
                  Continue to Dashboard
                </button>
              </div>

              <div className="verify-help">
                <p>
                  Didn&apos;t receive an email?{" "}
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
