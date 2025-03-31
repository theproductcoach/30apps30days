"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // We need to use signIn so marking with eslint-disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [returnUrl, setReturnUrl] = useState("/dashboard");

  // Validation states
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Email validation
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Get return URL from query params
  useEffect(() => {
    const returnParam = searchParams.get("returnUrl");
    if (returnParam) {
      setReturnUrl(returnParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check validation before submit
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || !isEmailValid(email) || !password) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulated sign in - no actual auth
      await signIn(email, password);

      // Redirect to return URL or dashboard
      router.push(returnUrl);
    } catch (error: unknown) {
      console.error("Error during sign in:", error);
      setError(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return email && isEmailValid(email) && password;
  };

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Sign In" />
        <div className="main-content">
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
                  onBlur={() => setEmailTouched(true)}
                  className={`form-input ${
                    emailTouched && (!email || !isEmailValid(email))
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {emailTouched && !email && (
                  <p className="validation-message">Email is required</p>
                )}
                {emailTouched && email && !isEmailValid(email) && (
                  <p className="validation-message">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  className={`form-input ${
                    passwordTouched && !password ? "input-error" : ""
                  }`}
                  placeholder="Enter your password"
                  required
                />
                {passwordTouched && !password && (
                  <p className="validation-message">Password is required</p>
                )}
              </div>

              <div className="forgot-password">
                <Link href="/forgot-password" className="text-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-connect"
                disabled={loading || !isFormValid()}
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
