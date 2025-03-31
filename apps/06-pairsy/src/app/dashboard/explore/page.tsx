"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

// Mock data types
type Couple = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string;
  interests: string[];
  avatar?: string;
  distance?: string;
  compatibility?: number;
};

type Activity = {
  id: string;
  title: string;
  category: string;
  description: string;
  location?: string;
  date?: string;
  time?: string;
  image?: string;
  icon: string;
  couples_interested: number;
};

// Mock data
const MOCK_COUPLES: Couple[] = [
  {
    id: "couple-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    bio: "We love exploring urban landscapes and finding hidden gems in the city.",
    interests: ["travel", "coffee", "movies"],
    avatar: "/images/avatars/Sam & Taylor.png",
    distance: "2 miles away",
    compatibility: 85,
  },
  {
    id: "couple-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    bio: "Board game enthusiasts looking for other couples to join us for game nights!",
    interests: ["games", "cooking", "movies"],
    avatar: "/images/avatars/Riley & Casey.png",
    distance: "5 miles away",
    compatibility: 72,
  },
  {
    id: "couple-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    bio: "Always on the hunt for new restaurants and cooking experiences.",
    interests: ["brunch", "cooking", "travel"],
    avatar: "/images/avatars/Jamie & Morgan.png",
    distance: "3 miles away",
    compatibility: 90,
  },
  {
    id: "couple-4",
    couple_name: "Outdoor Adventurers",
    partner1_name: "Alex",
    partner2_name: "Jordan",
    bio: "Hikers, climbers, and outdoor enthusiasts seeking like-minded couples.",
    interests: ["hikes", "fitness", "travel"],
    avatar: "/images/avatars/Alex & Jordan.png",
    distance: "10 miles away",
    compatibility: 65,
  },
];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "activity-1",
    title: "Wine Tasting Evening",
    category: "Food & Drink",
    description:
      "Join other couples for a relaxed evening of wine tasting and socializing.",
    location: "Vineyard Lounge, Downtown",
    date: "June 15",
    time: "7:00 PM",
    icon: "🍷",
    couples_interested: 12,
  },
  {
    id: "activity-2",
    title: "Couples Cooking Class",
    category: "Cooking",
    description:
      "Learn to make gourmet dishes together in this fun, interactive class.",
    location: "Culinary Institute",
    date: "June 18",
    time: "6:30 PM",
    icon: "👨‍🍳",
    couples_interested: 8,
  },
  {
    id: "activity-3",
    title: "Double Date Movie Night",
    category: "Entertainment",
    description: "Watch the latest blockbuster and meet for drinks afterward.",
    location: "Cinema Plaza",
    date: "June 20",
    time: "8:00 PM",
    icon: "🎬",
    couples_interested: 15,
  },
  {
    id: "activity-4",
    title: "Weekend Hiking Trip",
    category: "Outdoors",
    description:
      "A group hike through scenic trails followed by a picnic lunch.",
    location: "Mountain View Trail",
    date: "June 25",
    time: "9:00 AM",
    icon: "🥾",
    couples_interested: 6,
  },
];

export default function Explore() {
  const [mode, setMode] = useState<"couples" | "activities">("couples");
  const [couples, setCouples] = useState<Couple[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCouples(MOCK_COUPLES);
      setActivities(MOCK_ACTIVITIES);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleAvatarError = (id: string) => {
    setAvatarErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredCouples = couples.filter((couple) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      couple.couple_name.toLowerCase().includes(searchLower) ||
      couple.partner1_name.toLowerCase().includes(searchLower) ||
      couple.partner2_name.toLowerCase().includes(searchLower) ||
      couple.interests.some((interest) =>
        interest.toLowerCase().includes(searchLower)
      )
    );
  });

  const filteredActivities = activities.filter((activity) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      activity.title.toLowerCase().includes(searchLower) ||
      activity.category.toLowerCase().includes(searchLower) ||
      activity.description.toLowerCase().includes(searchLower)
    );
  });

  const handleModeChange = (newMode: "couples" | "activities") => {
    setMode(newMode);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Explore" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading explore content...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Explore" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <h1 className="app-title">Explore</h1>
              <p className="app-subtitle">Find couples and activities</p>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder={`Search ${
                  mode === "couples" ? "couples" : "activities"
                }...`}
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="explore-toggle">
              <button
                className={`toggle-btn ${mode === "couples" ? "active" : ""}`}
                onClick={() => handleModeChange("couples")}
              >
                Couples
              </button>
              <button
                className={`toggle-btn ${
                  mode === "activities" ? "active" : ""
                }`}
                onClick={() => handleModeChange("activities")}
              >
                Activities
              </button>
            </div>

            {mode === "couples" ? (
              <>
                {filteredCouples.length > 0 ? (
                  <div className="couples-grid">
                    {filteredCouples.map((couple) => (
                      <div key={couple.id} className="couple-card">
                        <div className="couple-avatar">
                          {couple.avatar && !avatarErrors[couple.id] ? (
                            <Image
                              src={couple.avatar}
                              alt={`${couple.partner1_name} & ${couple.partner2_name}`}
                              width={80}
                              height={80}
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
                        <div className="couple-header">
                          <div className="couple-name">
                            {couple.couple_name}
                          </div>
                          {couple.compatibility && (
                            <div className="couple-compatibility">
                              <span className="compatibility-value">
                                {couple.compatibility}%
                              </span>
                              <span className="compatibility-label">match</span>
                            </div>
                          )}
                        </div>
                        <div className="couple-partners">
                          {couple.partner1_name} & {couple.partner2_name}
                        </div>
                        {couple.distance && (
                          <div className="couple-distance">
                            {couple.distance}
                          </div>
                        )}
                        <div className="couple-bio">{couple.bio}</div>
                        <div className="couple-interests">
                          {couple.interests.map((interest, idx) => (
                            <span key={idx} className="interest-tag">
                              {interest}
                            </span>
                          ))}
                        </div>
                        <div className="couple-actions">
                          <Link
                            href={`/dashboard/explore/profile/${couple.id}`}
                            className="btn btn-view-profile"
                          >
                            View Profile
                          </Link>
                          <button className="btn btn-connect">Connect</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No couples found</h3>
                    <p>Try adjusting your search terms</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {filteredActivities.length > 0 ? (
                  <div className="activities-grid">
                    {filteredActivities.map((activity) => (
                      <div key={activity.id} className="activity-card-detailed">
                        <div className="activity-icon-large">
                          {activity.icon}
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">{activity.title}</div>
                          <div className="activity-category">
                            {activity.category}
                          </div>
                          <div className="activity-details">
                            {activity.date && activity.time && (
                              <div className="activity-time">
                                <span className="detail-icon">📅</span>
                                {activity.date} at {activity.time}
                              </div>
                            )}
                            {activity.location && (
                              <div className="activity-location">
                                <span className="detail-icon">📍</span>
                                {activity.location}
                              </div>
                            )}
                            <div className="activity-couples">
                              <span className="detail-icon">👥</span>
                              {activity.couples_interested} couples interested
                            </div>
                          </div>
                          <p className="activity-description">
                            {activity.description}
                          </p>
                          <div className="activity-actions">
                            <button className="btn btn-interested">
                              I'm Interested
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No activities found</h3>
                    <p>Try adjusting your search terms</p>
                  </div>
                )}
              </>
            )}
          </main>
          <BottomNavigation activePath="/dashboard/explore" />
        </div>
      </div>
    </div>
  );
}
