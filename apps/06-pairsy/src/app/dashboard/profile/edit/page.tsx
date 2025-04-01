"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";

// Types
type CoupleProfile = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string;
  interests: string[];
  email?: string;
  avatar?: string;
  joined_date: string;
  location?: string;
  relationship_status?: string;
  looking_for?: string[];
};

// Mock data
const MOCK_PROFILE: CoupleProfile = {
  id: "user-profile",
  couple_name: "The Adventurers",
  partner1_name: "Will",
  partner2_name: "Bri",
  bio: "We love hiking and exploring new places together! We're always up for a coffee date or game night with other couples.",
  interests: ["hikes", "travel", "cooking", "movies"],
  email: "couple@example.com",
  avatar: "/images/avatars/will-bri.png",
  joined_date: "May 2023",
  location: "London, UK",
  relationship_status: "Dating",
  looking_for: ["Double dates", "Couple friends", "Activity partners"],
};

// Available interests
const AVAILABLE_INTERESTS = [
  { id: "hikes", name: "Hikes", icon: "🥾" },
  { id: "coffee", name: "Coffee", icon: "☕" },
  { id: "brunch", name: "Brunch", icon: "🍳" },
  { id: "games", name: "Games", icon: "🎲" },
  { id: "movies", name: "Movies", icon: "🎬" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "cooking", name: "Cooking", icon: "👨‍🍳" },
  { id: "fitness", name: "Fitness", icon: "💪" },
];

// Available relationship statuses
const RELATIONSHIP_STATUSES = [
  "Dating",
  "Engaged",
  "Married",
  "Partners",
  "Other",
];

// Available looking for options
const LOOKING_FOR_OPTIONS = [
  "Double dates",
  "Couple friends",
  "Activity partners",
  "Game nights",
  "Dining companions",
  "Travel buddies",
];

export default function EditProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarError, setAvatarError] = useState(false);

  // Form state
  const [coupleName, setCoupleName] = useState("");
  const [partner1Name, setPartner1Name] = useState("");
  const [partner2Name, setPartner2Name] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [lookingFor, setLookingFor] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      // Populate form with mock data
      setCoupleName(MOCK_PROFILE.couple_name);
      setPartner1Name(MOCK_PROFILE.partner1_name);
      setPartner2Name(MOCK_PROFILE.partner2_name);
      setBio(MOCK_PROFILE.bio || "");
      setInterests(MOCK_PROFILE.interests);
      setLocation(MOCK_PROFILE.location || "");
      setRelationshipStatus(MOCK_PROFILE.relationship_status || "");
      setLookingFor(MOCK_PROFILE.looking_for || []);

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleInterestToggle = (interestId: string) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter((id) => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  const handleLookingForToggle = (option: string) => {
    if (lookingFor.includes(option)) {
      setLookingFor(lookingFor.filter((item) => item !== option));
    } else {
      setLookingFor([...lookingFor, option]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setSaving(true);

    // Validate form
    if (!coupleName || !partner1Name || !partner2Name) {
      setErrorMessage("Please fill out all required fields");
      setSaving(false);
      return;
    }

    try {
      // Simulate API call to save profile
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      setSuccessMessage("Profile updated successfully!");

      // Navigate back to profile after a delay
      setTimeout(() => {
        router.push("/dashboard/profile");
      }, 2000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Edit Profile" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading profile data...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Edit Profile" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <button onClick={handleCancel} className="back-link">
                ← Back
              </button>
              <h1 className="app-title">Edit Profile</h1>
            </div>

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="edit-profile-form">
              <div className="avatar-upload-section">
                <div className="current-avatar">
                  {MOCK_PROFILE.avatar && !avatarError ? (
                    <Image
                      src={MOCK_PROFILE.avatar}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="avatar-image"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {partner1Name[0]}
                      {partner2Name[0]}
                    </div>
                  )}
                </div>
                <button type="button" className="upload-avatar-btn">
                  Change Avatar
                </button>
                <p className="avatar-help-text">
                  Upload a photo that represents your couple
                </p>
              </div>

              <div className="form-section">
                <h2 className="section-title">Basic Information</h2>

                <div className="form-group">
                  <label htmlFor="coupleName">Couple Name*</label>
                  <input
                    type="text"
                    id="coupleName"
                    value={coupleName}
                    onChange={(e) => setCoupleName(e.target.value)}
                    className="form-input"
                    placeholder="How you want to be known"
                    required
                  />
                  <p className="input-help">
                    This will be visible to other users
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="partner1Name">Partner 1 Name*</label>
                  <input
                    type="text"
                    id="partner1Name"
                    value={partner1Name}
                    onChange={(e) => setPartner1Name(e.target.value)}
                    className="form-input"
                    placeholder="First partner's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="partner2Name">Partner 2 Name*</label>
                  <input
                    type="text"
                    id="partner2Name"
                    value={partner2Name}
                    onChange={(e) => setPartner2Name(e.target.value)}
                    className="form-input"
                    placeholder="Second partner's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-input"
                    placeholder="City, State"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="relationshipStatus">
                    Relationship Status
                  </label>
                  <select
                    id="relationshipStatus"
                    value={relationshipStatus}
                    onChange={(e) => setRelationshipStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select status</option>
                    {RELATIONSHIP_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">About Your Couple</h2>

                <div className="form-group">
                  <label htmlFor="bio">Couple Bio</label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="form-textarea"
                    placeholder="Tell others about yourselves"
                    rows={4}
                  />
                  <p className="input-help">
                    Share what makes your couple unique (max 300 characters)
                  </p>
                </div>

                <div className="form-group">
                  <label>Interests</label>
                  <p className="input-help">
                    Select activities you enjoy together
                  </p>
                  <div className="interests-grid edit-mode">
                    {AVAILABLE_INTERESTS.map((interest) => (
                      <div
                        key={interest.id}
                        className={`interest-item ${
                          interests.includes(interest.id) ? "selected" : ""
                        }`}
                        onClick={() => handleInterestToggle(interest.id)}
                      >
                        <span className="interest-icon">{interest.icon}</span>
                        <span className="interest-name">{interest.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Looking For</label>
                  <p className="input-help">
                    What kind of connections are you seeking?
                  </p>
                  <div className="looking-for-options">
                    {LOOKING_FOR_OPTIONS.map((option) => (
                      <div
                        key={option}
                        className={`looking-for-option ${
                          lookingFor.includes(option) ? "selected" : ""
                        }`}
                        onClick={() => handleLookingForToggle(option)}
                      >
                        <span className="option-name">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-connect"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
