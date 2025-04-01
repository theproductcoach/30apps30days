"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";

// Mock data type
type CoupleProfile = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string;
  interests: string[];
  avatar?: string;
  distance?: string;
  compatibility?: number;
  joined_date: string;
  location?: string;
  relationship_status?: string;
  looking_for?: string[];
};

// Mock data for profiles
const MOCK_PROFILES: { [key: string]: CoupleProfile } = {
  "couple-1": {
    id: "couple-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    bio: "We love exploring urban landscapes and finding hidden gems in the city. Always up for coffee shop hopping and discovering new neighborhoods. Big movie buffs who enjoy everything from indie films to blockbusters.",
    interests: ["travel", "coffee", "movies"],
    avatar: "/avatars/sam-taylor.png",
    distance: "2 miles away",
    compatibility: 85,
    joined_date: "March 2023",
    location: "Inner East London",
    relationship_status: "Dating",
    looking_for: ["Double dates", "Activity partners", "City adventures"],
  },
  "couple-2": {
    id: "couple-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    bio: "Board game enthusiasts looking for other couples to join us for game nights! We have a massive collection and are always learning new games. We also enjoy cooking together and trying new recipes.",
    interests: ["games", "cooking", "movies"],
    avatar: "/avatars/riley-casey.png",
    distance: "5 miles away",
    compatibility: 72,
    joined_date: "January 2023",
    location: "Ballard",
    relationship_status: "Dating",
    looking_for: ["Game nights", "Dinner parties", "Movie marathons"],
  },
  "couple-3": {
    id: "couple-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    bio: "Always on the hunt for new restaurants and cooking experiences. We love trying different cuisines and hosting dinner parties. On weekends, we enjoy farmers markets and cooking classes.",
    interests: ["brunch", "cooking", "travel"],
    avatar: "/avatars/jamie-morgan.png",
    distance: "3 miles away",
    compatibility: 90,
    joined_date: "April 2023",
    location: "Capitol Hill",
    relationship_status: "Engaged",
    looking_for: ["Dining companions", "Cooking buddies", "Travel partners"],
  },
  "couple-4": {
    id: "couple-4",
    couple_name: "Outdoor Adventurers",
    partner1_name: "Alex",
    partner2_name: "Jordan",
    bio: "Hikers, climbers, and outdoor enthusiasts seeking like-minded couples. We spend most weekends exploring trails and parks. We're training for our first marathon together!",
    interests: ["hikes", "fitness", "travel"],
    avatar: "/avatars/alex-jordan.png",
    distance: "10 miles away",
    compatibility: 65,
    joined_date: "February 2023",
    location: "Fremont",
    relationship_status: "Partners",
    looking_for: ["Hiking buddies", "Workout partners", "Weekend trips"],
  },
};

export default function CoupleProfile() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<CoupleProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarError, setAvatarError] = useState(false);

  // Get couple ID from params
  const coupleId = params.id as string;

  useEffect(() => {
    // Simulate loading profile data
    const timer = setTimeout(() => {
      const profileData = MOCK_PROFILES[coupleId];
      if (profileData) {
        setProfile(profileData);
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [coupleId]);

  const handleBack = () => {
    router.back();
  };

  const handleConnect = () => {
    // In a real app, this would send a connection request
    alert(`Connection request sent to ${profile?.couple_name}!`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Couple Profile" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading profile...</div>
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
          <StatusBar title="Couple Profile" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Profile not found</h3>
                <p>The couple profile you're looking for doesn't exist</p>
                <button onClick={handleBack} className="btn btn-connect">
                  Back to Explore
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
        <StatusBar title={profile.couple_name} />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <button onClick={handleBack} className="back-link">
                ← Back
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
              {profile.distance && (
                <div className="profile-distance-detail">
                  <span className="distance-icon">🗺️</span> {profile.distance}
                </div>
              )}
              {profile.compatibility && (
                <div className="profile-compatibility">
                  <span className="compatibility-icon">✨</span>
                  <span className="compatibility-text">
                    {profile.compatibility}% match
                  </span>
                </div>
              )}
            </div>

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

            <div className="profile-footer couple-profile-actions">
              <button onClick={handleConnect} className="btn btn-connect">
                Send Connection Request
              </button>
              <Link
                href={`/dashboard/messages/new?couple=${profile.id}`}
                className="btn btn-message-profile"
              >
                Send Message
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
