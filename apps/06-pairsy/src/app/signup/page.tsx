"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coupleName, setCoupleName] = useState("");
  const [partner1Name, setPartner1Name] = useState("");
  const [partner2Name, setPartner2Name] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  // Add this new state
  const [signupComplete, setSignupComplete] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const availableInterests = [
    { id: "hikes", name: "Hikes", icon: "👟" },
    { id: "coffee", name: "Coffee", icon: "☕" },
    { id: "brunch", name: "Brunch", icon: "🍳" },
    { id: "games", name: "Games", icon: "🎲" },
    { id: "movies", name: "Movies", icon: "🎬" },
    { id: "travel", name: "Travel", icon: "✈️" },
    { id: "cooking", name: "Cooking", icon: "👨‍🍳" },
    { id: "fitness", name: "Fitness", icon: "💪" },
  ];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!email || !password || !coupleName) {
        setError("Please fill out all fields");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    if (step === 2) {
      if (!partner1Name || !partner2Name) {
        setError("Please enter both partner names");
        return;
      }
    }

    if (step === 3) {
      if (interests.length < 1) {
        setError("Please select at least one interest");
        return;
      }
    }

    setError(null);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from("couples")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existingUsers) {
        throw new Error(
          "This email is already registered. Please try logging in instead."
        );
      }

      // 1. Sign up user directly with Supabase
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        throw new Error(signUpError.message || "Failed to sign up");
      }

      const newUserId = signUpData?.user?.id;

      if (!newUserId) {
        throw new Error("Failed to get user ID after signup");
      }

      // Store userId in state for display
      setUserId(newUserId);
      console.log("User created successfully with ID:", newUserId);

      // Try inserting couple profile data
      let profileSuccess = false;

      // Try approaches in sequence, stopping when one works

      // 1. First try the direct_insert_couple function (most likely to work)
      try {
        console.log("Trying direct_insert_couple RPC function");
        const { data: directData, error: directError } = await supabase.rpc(
          "direct_insert_couple",
          {
            p_id: newUserId,
            p_email: email,
            p_couple_name: coupleName,
            p_partner1_name: partner1Name,
            p_partner2_name: partner2Name,
            p_bio: bio || null,
            p_interests: interests.length > 0 ? interests : null,
          }
        );

        if (!directError && directData) {
          console.log(
            "Couple profile created via direct_insert_couple:",
            directData
          );
          profileSuccess = true;
        } else {
          console.error("direct_insert_couple error:", directError);
        }
      } catch (directErr) {
        console.error("Exception calling direct_insert_couple:", directErr);
      }

      // 2. If that failed, try insert_new_couple
      if (!profileSuccess) {
        try {
          console.log("Trying insert_new_couple RPC function");
          const { data: rpcData, error: rpcError } = await supabase.rpc(
            "insert_new_couple",
            {
              p_id: newUserId,
              p_email: email,
              p_couple_name: coupleName,
              p_partner1_name: partner1Name,
              p_partner2_name: partner2Name,
              p_bio: bio || null,
              p_interests: interests.length > 0 ? interests : null,
            }
          );

          if (!rpcError && rpcData) {
            console.log(
              "Couple profile created via insert_new_couple:",
              rpcData
            );
            profileSuccess = true;
          } else {
            console.error("insert_new_couple error:", rpcError);
          }
        } catch (rpcErr) {
          console.error("Exception calling insert_new_couple:", rpcErr);
        }
      }

      // 3. If RPC methods failed, try API endpoint
      if (!profileSuccess) {
        try {
          console.log("Falling back to API endpoint");
          const response = await fetch("/api/couples/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: newUserId,
              email,
              couple_name: coupleName,
              partner1_name: partner1Name,
              partner2_name: partner2Name,
              bio: bio || null,
              interests: interests.length > 0 ? interests : null,
            }),
          });

          const result = await response.json();

          if (response.ok) {
            console.log("Couple profile created via API:", result);
            profileSuccess = true;
          } else {
            console.error("API error:", result);
          }
        } catch (apiErr) {
          console.error("Exception calling API:", apiErr);
        }
      }

      // Even if profile creation fails, we'll still continue with signup
      // The trigger function may handle this, or admin intervention will be needed

      // Save email to localStorage for the verification page
      localStorage.setItem("signupEmail", email);

      // Set signup as complete for UI rendering
      setSignupComplete(true);

      // Only redirect if we want to navigate away
      // router.push("/signup/verify-email");
    } catch (error: any) {
      console.error("Error during sign up:", error);
      setError(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (step) {
      case 1:
        return email && password && coupleName;
      case 2:
        return partner1Name && partner2Name;
      case 3:
        return true; // Interests are optional
      case 4:
        return true; // Just reviewing
      default:
        return false;
    }
  };

  // Render the content for the current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <h2 className="step-title">Account Details</h2>
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
                placeholder="Create a password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="coupleName">Couple Name</label>
              <input
                type="text"
                id="coupleName"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                className="form-input"
                placeholder="How you'd like to be known"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2 className="step-title">Partner Details</h2>
            <div className="form-group">
              <label htmlFor="partner1">Partner 1 Name</label>
              <input
                type="text"
                id="partner1"
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="form-input"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="partner2">Partner 2 Name</label>
              <input
                type="text"
                id="partner2"
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="form-input"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">About You (Optional)</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-textarea"
                placeholder="Tell other couples a bit about yourselves..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2 className="step-title">Your Interests</h2>
            <p className="step-description">
              Select activities you enjoy as a couple.
            </p>
            <div className="interests-grid">
              {availableInterests.map((interest) => (
                <div
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`interest-item ${
                    interests.includes(interest.id) ? "selected" : ""
                  }`}
                >
                  <span className="interest-icon">{interest.icon}</span>
                  <span className="interest-name">{interest.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2 className="step-title">Review & Complete</h2>
            <div className="review-summary">
              <div className="review-item">
                <span className="review-label">Couple Name:</span>
                <span className="review-value">{coupleName}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Partners:</span>
                <span className="review-value">
                  {partner1Name} & {partner2Name}
                </span>
              </div>
              {bio && (
                <div className="review-item">
                  <span className="review-label">About:</span>
                  <span className="review-value">{bio}</span>
                </div>
              )}
              {interests.length > 0 && (
                <div className="review-item">
                  <span className="review-label">Interests:</span>
                  <div className="review-interests">
                    {interests.map((interest) => (
                      <span key={interest} className="interest-tag">
                        {
                          availableInterests.find((i) => i.id === interest)
                            ?.name
                        }
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="terms-agreement">
              <p>
                By completing sign-up, you agree to our{" "}
                <Link href="/terms" className="text-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-link">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        );

      default:
        return null;
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
              <h1 className="app-title">Create Account</h1>
            </div>

            {!signupComplete ? (
              <>
                <div className="steps-indicator">
                  <div
                    className={`step ${step >= 1 ? "active" : ""}`}
                    onClick={() => step > 1 && setStep(1)}
                  >
                    1
                  </div>
                  <div
                    className={`step ${step >= 2 ? "active" : ""}`}
                    onClick={() => step > 2 && setStep(2)}
                  >
                    2
                  </div>
                  <div
                    className={`step ${step >= 3 ? "active" : ""}`}
                    onClick={() => step > 3 && setStep(3)}
                  >
                    3
                  </div>
                  <div
                    className={`step ${step >= 4 ? "active" : ""}`}
                    onClick={() => step > 4 && setStep(4)}
                  >
                    4
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step content */}
                  {renderStepContent()}

                  {/* Navigation */}
                  <div className="form-navigation">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="btn btn-secondary"
                        disabled={loading}
                      >
                        Back
                      </button>
                    )}
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn btn-primary"
                        disabled={!isCurrentStepValid() || loading}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isCurrentStepValid() || loading}
                      >
                        {loading ? "Creating Account..." : "Sign Up"}
                      </button>
                    )}
                  </div>

                  {error && <p className="error-message">{error}</p>}
                </form>

                <div className="auth-footer">
                  Already have an account?{" "}
                  <Link href="/login" className="auth-link">
                    Log in
                  </Link>
                </div>
              </>
            ) : (
              <div className="verify-email-content">
                <div className="verify-icon">✅</div>
                <h2 className="verify-title">Account Created!</h2>

                <p className="verify-message">
                  We've sent a verification link to:
                </p>
                <p className="verify-email">{email}</p>

                <p className="verify-instructions">
                  Please check your email and click the link to verify your
                  account. If you don't see it, check your spam folder.
                </p>

                <div className="verify-actions">
                  <Link href="/login" className="btn btn-primary">
                    Go to Login
                  </Link>
                </div>

                <div className="verify-help mt-4">
                  <p>
                    <strong>
                      Verification emails may take a few minutes to arrive.
                    </strong>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your user ID is: {userId}
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
