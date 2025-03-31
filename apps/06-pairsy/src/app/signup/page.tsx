"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function SignUp() {
  // We need router and signUp but don't use them directly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Final step state
  const [signupComplete, setSignupComplete] = useState(false);

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
      // Simplified signup - no actual API calls
      await signUp(email, password);

      // Just show the success screen
      setSignupComplete(true);
    } catch (error: unknown) {
      console.error("Error during sign up:", error);
      setError(error instanceof Error ? error.message : "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const isCurrentStepValid = () => {
    if (step === 1) {
      return email && password && coupleName;
    }
    if (step === 2) {
      return partner1Name && partner2Name;
    }
    if (step === 3) {
      return interests.length > 0;
    }
    return true;
  };

  const renderStepContent = () => {
    if (signupComplete) {
      return (
        <div className="signup-success">
          <h2 className="success-title">You&apos;re all set!</h2>
          <p className="success-message">
            Your account has been created successfully.
          </p>
          <button
            className="btn btn-connect"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="signup-step">
            <h2 className="step-title">Basic Info</h2>
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
              <p className="input-help">At least 6 characters</p>
            </div>
            <div className="form-group">
              <label htmlFor="coupleName">Couple Name</label>
              <input
                type="text"
                id="coupleName"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                className="form-input"
                placeholder="How you want to be known"
                required
              />
              <p className="input-help">This will be visible to other users</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="signup-step">
            <h2 className="step-title">Partner Names</h2>
            <div className="form-group">
              <label htmlFor="partner1Name">Partner 1 Name</label>
              <input
                type="text"
                id="partner1Name"
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="form-input"
                placeholder="Enter first partner's name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="partner2Name">Partner 2 Name</label>
              <input
                type="text"
                id="partner2Name"
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="form-input"
                placeholder="Enter second partner's name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Couple Bio (Optional)</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-textarea"
                placeholder="Tell others a bit about yourselves"
                rows={3}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="signup-step">
            <h2 className="step-title">Your Interests</h2>
            <p className="step-description">
              Select activities you enjoy doing together
            </p>
            <div className="interests-grid">
              {availableInterests.map((interest) => (
                <div
                  key={interest.id}
                  className={`interest-item ${
                    interests.includes(interest.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleInterest(interest.id)}
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
          <div className="signup-step">
            <h2 className="step-title">Ready to Connect?</h2>
            <p className="step-description">
              You&apos;re all set to start connecting with other couples!
            </p>
            <div className="profile-preview">
              <h3>{coupleName}</h3>
              <p>
                {partner1Name} & {partner2Name}
              </p>
              {bio && <p className="preview-bio">{bio}</p>}
              <div className="preview-interests">
                {interests.map((id) => (
                  <span key={id} className="interest-tag">
                    {availableInterests.find((i) => i.id === id)?.name}
                  </span>
                ))}
              </div>
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
              <h1 className="app-title">Sign Up</h1>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              {/* Step indicator */}
              {!signupComplete && (
                <div className="step-indicator">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`step-dot ${step >= num ? "active" : ""}`}
                    ></div>
                  ))}
                </div>
              )}

              {renderStepContent()}

              {!signupComplete && (
                <div className="form-buttons">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn btn-secondary"
                    >
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-connect"
                      disabled={!isCurrentStepValid() || loading}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-connect"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </button>
                  )}
                </div>
              )}
            </form>

            {!signupComplete && step === 1 && (
              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="text-link">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
