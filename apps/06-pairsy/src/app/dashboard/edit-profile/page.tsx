"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Import type from types folder
import { Couple } from "@/types/supabase";

// Mock couple data
const MOCK_COUPLE: Couple = {
  id: "mock-id",
  couple_name: "The Adventurers",
  partner1_name: "Will",
  partner2_name: "Bri",
  bio: "We love hiking and exploring new places together!",
  interests: ["hikes", "travel", "cooking", "movies"],
};

export default function EditProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [coupleName, setCoupleName] = useState("");
  const [partner1Name, setPartner1Name] = useState("");
  const [partner2Name, setPartner2Name] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

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

  useEffect(() => {
    // Simulate loading profile data
    setTimeout(() => {
      // Set form state with mock data
      setCoupleName(MOCK_COUPLE.couple_name);
      setPartner1Name(MOCK_COUPLE.partner1_name);
      setPartner2Name(MOCK_COUPLE.partner2_name);
      setBio(MOCK_COUPLE.bio || "");
      setInterests(MOCK_COUPLE.interests || []);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!coupleName || !partner1Name || !partner2Name) {
        throw new Error("Please fill out all required fields");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);

      // Redirect back to dashboard after a delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      setError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <header className="status-bar">
            <div className="status-left">
              <Link href="/dashboard" className="back-link">
                ← Back
              </Link>
            </div>
            <div className="status-center">Edit Profile</div>
            <div className="status-right"></div>
          </header>

          <main className="content-wrapper">
            {error && <div className="error-message">{error}</div>}
            {success && (
              <div className="success-message">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="edit-profile-form">
              <div className="form-group">
                <label htmlFor="coupleName">Couple Name</label>
                <input
                  type="text"
                  id="coupleName"
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  className="form-input"
                  placeholder="Your couple name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="partner1">Partner 1 Name</label>
                <input
                  type="text"
                  id="partner1"
                  value={partner1Name}
                  onChange={(e) => setPartner1Name(e.target.value)}
                  className="form-input"
                  placeholder="First partner's name"
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
                  placeholder="Second partner's name"
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
                  placeholder="Tell other couples a bit about yourselves"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Interests</label>
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

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
