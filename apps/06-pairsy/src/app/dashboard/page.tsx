"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";

// Mock data type
type Couple = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string;
  interests?: string[];
  email?: string;
  avatar?: string;
};

// Mock data for the dashboard
const MOCK_COUPLE: Couple = {
  id: "mock-id",
  couple_name: "The Adventurers",
  partner1_name: "Will",
  partner2_name: "Bri",
  bio: "We love hiking and exploring new places together!",
  interests: ["hikes", "travel", "cooking", "movies"],
  avatar: "/images/avatars/Will & Bri.png",
};

const MOCK_SUGGESTIONS: Couple[] = [
  {
    id: "match-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    interests: ["travel", "coffee", "movies"],
    avatar: "/images/avatars/Sam & Taylor.png",
  },
  {
    id: "match-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    interests: ["games", "cooking", "movies"],
    avatar: "/images/avatars/Riley & Casey.png",
  },
  {
    id: "match-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    interests: ["brunch", "cooking", "travel"],
    avatar: "/images/avatars/Jamie & Morgan.png",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [coupleData, setCoupleData] = useState<Couple | null>(null);
  const [matchSuggestions, setMatchSuggestions] = useState<Couple[]>([]);
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCoupleData(MOCK_COUPLE);
      setMatchSuggestions(MOCK_SUGGESTIONS);
      setLoading(false);
    }, 1000);

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

  const handleAvatarError = (matchId: string) => {
    setAvatarErrors((prev) => ({ ...prev, [matchId]: true }));
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
            <div className="status-left">Pairsy</div>
            <div className="status-right">
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          </header>

          <main className="content-wrapper">
            <div className="dashboard-header">
              <h1>Welcome, {coupleData?.couple_name || "Couple"}!</h1>
              <p className="dashboard-subtitle">Find your next double date</p>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Your Profile</h2>
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {coupleData?.avatar && !avatarErrors["user"] ? (
                      <Image
                        src={coupleData.avatar}
                        alt={`${coupleData.partner1_name} & ${coupleData.partner2_name}`}
                        width={80}
                        height={80}
                        className="avatar-image"
                        onError={() => handleAvatarError("user")}
                      />
                    ) : (
                      <div className="avatar-placeholder profile-avatar-placeholder">
                        {coupleData?.partner1_name?.[0]}
                        {coupleData?.partner2_name?.[0]}
                      </div>
                    )}
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">
                      {coupleData?.couple_name}
                    </div>
                    <div className="profile-partners">
                      {coupleData?.partner1_name} & {coupleData?.partner2_name}
                    </div>
                  </div>
                </div>
                <div className="profile-bio">
                  {coupleData?.bio || "No bio yet"}
                </div>
                <div className="profile-interests">
                  {coupleData?.interests?.map((interest, idx) => (
                    <span key={idx} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
                <Link
                  href="/dashboard/edit-profile"
                  className="edit-profile-link"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Suggested Matches</h2>
              {matchSuggestions.length > 0 ? (
                <div className="matches-grid">
                  {matchSuggestions.map((match) => (
                    <div key={match.id} className="match-card">
                      <div className="match-avatar">
                        {match.avatar && !avatarErrors[match.id] ? (
                          <Image
                            src={match.avatar}
                            alt={`${match.partner1_name} & ${match.partner2_name}`}
                            width={60}
                            height={60}
                            className="avatar-image"
                            onError={() => handleAvatarError(match.id)}
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            {match.partner1_name[0]}
                            {match.partner2_name[0]}
                          </div>
                        )}
                      </div>
                      <div className="match-info">
                        <div className="match-name">{match.couple_name}</div>
                        <div className="match-partners">
                          {match.partner1_name} & {match.partner2_name}
                        </div>
                        <div className="match-common-interests">
                          {match.interests
                            ?.filter((i) => coupleData?.interests?.includes(i))
                            .map((interest, idx) => (
                              <span key={idx} className="interest-tag">
                                {interest}
                              </span>
                            ))}
                        </div>
                      </div>
                      <button className="btn btn-connect match-connect-btn">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-matches">
                  <p>No matches available right now. Check back later!</p>
                </div>
              )}
            </div>

            <div className="dashboard-nav">
              <Link href="/dashboard" className="nav-item active">
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
              </Link>
              <Link href="/dashboard/explore" className="nav-item">
                <span className="nav-icon">🔍</span>
                <span className="nav-label">Explore</span>
              </Link>
              <Link href="/dashboard/messages" className="nav-item">
                <span className="nav-icon">💬</span>
                <span className="nav-label">Messages</span>
              </Link>
              <Link href="/dashboard/profile" className="nav-item">
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
