"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";

// Mock data type
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

// Mock data for the profile
const MOCK_PROFILE: CoupleProfile = {
  id: "user-profile",
  couple_name: "The Adventurers",
  partner1_name: "Will",
  partner2_name: "Bri",
  bio: "We love hiking and exploring new places together! We're always up for a coffee date or game night with other couples.",
  interests: ["hikes", "travel", "cooking", "movies"],
  email: "couple@example.com",
  avatar: "/images/avatars/Will & Bri.png",
  joined_date: "May 2023",
  location: "Seattle, WA",
  relationship_status: "Married",
  looking_for: ["Double dates", "Couple friends", "Activity partners"],
};

export default function Profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<CoupleProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"public" | "private">("public");
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      setProfile(MOCK_PROFILE);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEditProfile = () => {
    router.push("/dashboard/profile/edit");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "public" ? "private" : "public");
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Profile" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading your profile...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Profile" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Profile not found</h3>
                <p>There was an error loading your profile</p>
                <button
                  onClick={() => router.refresh()}
                  className="btn btn-connect"
                >
                  Try Again
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Profile" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="profile-view-toggle">
              <button
                className={`view-toggle-btn ${
                  viewMode === "public" ? "active" : ""
                }`}
                onClick={() => setViewMode("public")}
              >
                Public View
              </button>
              <button
                className={`view-toggle-btn ${
                  viewMode === "private" ? "active" : ""
                }`}
                onClick={() => setViewMode("private")}
              >
                Private Details
              </button>
            </div>

            <div className="profile-header-large">
              <div className="profile-avatar-large">
                {profile.avatar && !avatarError ? (
                  <Image
                    src={profile.avatar}
                    alt={`${profile.partner1_name} & ${profile.partner2_name}`}
                    width={120}
                    height={120}
                    className="avatar-image"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="avatar-placeholder large">
                    {profile.partner1_name[0]}
                    {profile.partner2_name[0]}
                  </div>
                )}
              </div>
              <h1 className="profile-title">{profile.couple_name}</h1>
              <div className="profile-partners-large">
                {profile.partner1_name} & {profile.partner2_name}
              </div>
              {profile.location && (
                <div className="profile-location">
                  <span className="location-icon">📍</span> {profile.location}
                </div>
              )}
            </div>

            {viewMode === "public" ? (
              <div className="profile-public-content">
                <div className="profile-section">
                  <h2 className="section-title">About Us</h2>
                  <p className="profile-bio-full">
                    {profile.bio || "No bio added yet."}
                  </p>
                </div>

                <div className="profile-section">
                  <h2 className="section-title">Interests</h2>
                  <div className="profile-interests-grid">
                    {profile.interests.map((interest, idx) => (
                      <div key={idx} className="interest-badge">
                        <span className="interest-icon">
                          {interest === "hikes" && "🥾"}
                          {interest === "travel" && "✈️"}
                          {interest === "cooking" && "👨‍🍳"}
                          {interest === "movies" && "🎬"}
                          {interest === "coffee" && "☕"}
                          {interest === "games" && "🎲"}
                          {interest === "brunch" && "🍳"}
                          {interest === "fitness" && "💪"}
                        </span>
                        <span className="interest-name">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {profile.looking_for && (
                  <div className="profile-section">
                    <h2 className="section-title">Looking For</h2>
                    <div className="looking-for-tags">
                      {profile.looking_for.map((item, idx) => (
                        <span key={idx} className="looking-for-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="profile-private-content">
                <div className="profile-section">
                  <h2 className="section-title">Account Information</h2>
                  <div className="profile-detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{profile.email}</span>
                  </div>
                  {profile.relationship_status && (
                    <div className="profile-detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">
                        {profile.relationship_status}
                      </span>
                    </div>
                  )}
                  <div className="profile-detail-item">
                    <span className="detail-label">Joined:</span>
                    <span className="detail-value">{profile.joined_date}</span>
                  </div>
                </div>

                <div className="profile-section">
                  <h2 className="section-title">Account Actions</h2>
                  <div className="profile-actions">
                    <button
                      onClick={handleSignOut}
                      className="btn-action sign-out"
                    >
                      Sign Out
                    </button>
                    <button className="btn-action delete-account">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="profile-footer">
              <button
                onClick={handleEditProfile}
                className="btn btn-edit-profile"
              >
                Edit Profile
              </button>
            </div>
          </main>
          <BottomNavigation activePath="/dashboard/profile" />
        </div>
      </div>
    </div>
  );
}
