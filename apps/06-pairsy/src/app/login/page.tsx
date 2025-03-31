"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  // We need to use signIn so marking with eslint-disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulated sign in - no actual auth
      await signIn(email, password);

      // Redirect to dashboard on "successful login"
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Error during sign in:", error);
      setError(error instanceof Error ? error.message : "Failed to sign in");
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

              <div className="auth-footer">
                <p>
                  Don&apos;t have an account?{" "}
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
