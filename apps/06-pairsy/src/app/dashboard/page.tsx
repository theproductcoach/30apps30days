"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import BottomNavigation from "@/components/BottomNavigation";
import StatusBar from "@/components/StatusBar";

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
  avatar: "/images/avatars/will-bri.png",
};

const MOCK_SUGGESTIONS: Couple[] = [
  {
    id: "match-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    interests: ["travel", "coffee", "movies"],
    avatar: "/images/avatars/sam-taylor.png",
  },
  {
    id: "match-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    interests: ["games", "cooking", "movies"],
    avatar: "/images/avatars/riley-casey.png",
  },
  {
    id: "match-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    interests: ["brunch", "cooking", "travel"],
    avatar: "/images/avatars/jamie-morgan.png",
  },
];

// Mock data types
type UserProfile = {
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
  interests: string[];
};

type SuggestedCouple = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
  compatibility: number;
};

type RecentMessage = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
  last_message: string;
  time: string;
  unread: boolean;
};

type Activity = {
  id: string;
  title: string;
  date: string;
  time: string;
  icon: string;
};

// Mock data
const MOCK_PROFILE: UserProfile = {
  couple_name: "The Adventurers",
  partner1_name: "Will",
  partner2_name: "Bri",
  avatar: "/images/avatars/will-bri.png",
  interests: ["hikes", "travel", "cooking", "movies"],
};

const MOCK_SUGGESTED_COUPLES: SuggestedCouple[] = [
  {
    id: "couple-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    avatar: "/images/avatars/sam-taylor.png",
    compatibility: 85,
  },
  {
    id: "couple-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    avatar: "/images/avatars/jamie-morgan.png",
    compatibility: 90,
  },
];

const MOCK_RECENT_MESSAGES: RecentMessage[] = [
  {
    id: "conv-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    avatar: "/images/avatars/sam-taylor.png",
    last_message: "That sounds great! We're free this Saturday.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: "conv-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    avatar: "/images/avatars/riley-casey.png",
    last_message: "We'll bring Settlers of Catan and some snacks!",
    time: "2 hours ago",
    unread: true,
  },
];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "activity-1",
    title: "Wine Tasting Evening",
    date: "June 15",
    time: "7:00 PM",
    icon: "🍷",
  },
  {
    id: "activity-4",
    title: "Weekend Hiking Trip",
    date: "June 25",
    time: "9:00 AM",
    icon: "🥾",
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [suggestedCouples, setSuggestedCouples] = useState<SuggestedCouple[]>(
    []
  );
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCoupleData(MOCK_COUPLE);
      setMatchSuggestions(MOCK_SUGGESTIONS);
      setProfile(MOCK_PROFILE);
      setSuggestedCouples(MOCK_SUGGESTED_COUPLES);
      setRecentMessages(MOCK_RECENT_MESSAGES);
      setActivities(MOCK_ACTIVITIES);
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
          <StatusBar title="Dashboard" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading your dashboard...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Dashboard" />
        <div className="main-content">
          <header className="status-bar">
            <div className="status-left">
              <Image
                src="/pairsy-icon.png"
                alt="Pairsy"
                width={28}
                height={28}
                className="pairsy-logo"
              />
            </div>
            <div className="status-right">
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          </header>

          <main className="content-wrapper">
            <div className="header">
              <h1 className="app-title">Welcome Back!</h1>
              <p className="app-subtitle">Here's what's new today</p>
            </div>

            {/* Profile Summary */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Your Profile</h2>
                <Link href="/dashboard/profile" className="section-link">
                  View Full Profile
                </Link>
              </div>
              <div className="profile-summary-card">
                <div className="profile-summary-avatar">
                  {profile?.avatar && !avatarErrors["profile"] ? (
                    <Image
                      src={profile.avatar}
                      alt={`${profile.partner1_name} & ${profile.partner2_name}`}
                      width={60}
                      height={60}
                      className="avatar-image"
                      onError={() => handleAvatarError("profile")}
                    />
                  ) : (
                    <div className="avatar-placeholder medium">
                      {profile?.partner1_name[0]}
                      {profile?.partner2_name[0]}
                    </div>
                  )}
                </div>
                <div className="profile-summary-info">
                  <div className="profile-summary-name">
                    {profile?.couple_name}
                  </div>
                  <div className="profile-summary-partners">
                    {profile?.partner1_name} & {profile?.partner2_name}
                  </div>
                  <div className="profile-summary-interests">
                    {profile?.interests.slice(0, 3).map((interest, idx) => (
                      <span key={idx} className="interest-tag small">
                        {interest}
                      </span>
                    ))}
                    {profile?.interests && profile.interests.length > 3 && (
                      <span className="more-interests">
                        +{profile.interests.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Matches */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Suggested Matches</h2>
                <Link href="/dashboard/explore" className="section-link">
                  See All
                </Link>
              </div>
              <div className="dashboard-suggestions">
                {suggestedCouples.map((couple) => (
                  <div key={couple.id} className="suggestion-card">
                    <div className="suggestion-avatar">
                      {couple.avatar && !avatarErrors[couple.id] ? (
                        <Image
                          src={couple.avatar}
                          alt={`${couple.partner1_name} & ${couple.partner2_name}`}
                          width={50}
                          height={50}
                          className="avatar-image"
                          onError={() => handleAvatarError(couple.id)}
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {couple.partner1_name[0]}
                          {couple.partner2_name[0]}
                        </div>
                      )}
                    </div>
                    <div className="suggestion-info">
                      <div className="suggestion-name">
                        {couple.couple_name}
                      </div>
                      <div className="suggestion-partners">
                        {couple.partner1_name} & {couple.partner2_name}
                      </div>
                      <div className="suggestion-match">
                        {couple.compatibility}% match
                      </div>
                    </div>
                    <div className="suggestion-actions">
                      <Link
                        href={`/dashboard/explore/profile/${couple.id}`}
                        className="btn-view small"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Recent Messages</h2>
                <Link href="/dashboard/messages" className="section-link">
                  See All
                </Link>
              </div>
              <div className="dashboard-messages">
                {recentMessages.map((message) => (
                  <Link
                    href={`/dashboard/messages/${message.id}`}
                    key={message.id}
                    className="dashboard-message-item-link"
                  >
                    <div
                      className={`dashboard-message-item ${
                        message.unread ? "unread" : ""
                      }`}
                    >
                      <div className="message-avatar">
                        {message.avatar && !avatarErrors[message.id] ? (
                          <Image
                            src={message.avatar}
                            alt={`${message.partner1_name} & ${message.partner2_name}`}
                            width={40}
                            height={40}
                            className="avatar-image"
                            onError={() => handleAvatarError(message.id)}
                          />
                        ) : (
                          <div className="avatar-placeholder small">
                            {message.partner1_name[0]}
                            {message.partner2_name[0]}
                          </div>
                        )}
                        {message.unread && (
                          <div className="unread-indicator small"></div>
                        )}
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <div className="message-name">
                            {message.couple_name}
                          </div>
                          <div className="message-time">{message.time}</div>
                        </div>
                        <div className="message-preview">
                          {message.last_message}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Activities */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Upcoming Activities</h2>
                <Link
                  href="/dashboard/explore?mode=activities"
                  className="section-link"
                >
                  Find More
                </Link>
              </div>
              <div className="dashboard-activities">
                {activities.map((activity) => (
                  <div key={activity.id} className="dashboard-activity-item">
                    <div className="activity-dashboard-icon">
                      {activity.icon}
                    </div>
                    <div className="activity-dashboard-info">
                      <div className="activity-dashboard-title">
                        {activity.title}
                      </div>
                      <div className="activity-dashboard-date">
                        {activity.date} at {activity.time}
                      </div>
                    </div>
                    <div className="activity-dashboard-actions">
                      <Link
                        href={`/dashboard/explore/activity/${activity.id}`}
                        className="btn-view small"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <BottomNavigation activePath="/dashboard" />
        </div>
      </div>
    </div>
  );
}
