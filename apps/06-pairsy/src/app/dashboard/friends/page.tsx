"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

// Mock data type
type Friend = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  bio?: string;
  interests: string[];
  avatar?: string;
  status: "connected" | "pending";
  lastActivity?: string;
};

// Mock data for friends
const MOCK_FRIENDS: Friend[] = [
  {
    id: "friend-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    interests: ["travel", "coffee", "movies"],
    avatar: "/images/avatars/sam-taylor.png",
    status: "connected",
    lastActivity: "3 days ago",
  },
  {
    id: "friend-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    interests: ["games", "cooking", "movies"],
    avatar: "/images/avatars/riley-casey.png",
    status: "connected",
    lastActivity: "1 week ago",
  },
  {
    id: "friend-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    interests: ["brunch", "cooking", "travel"],
    avatar: "/images/avatars/jamie-morgan.png",
    status: "pending",
    lastActivity: "Just now",
  },
];

export default function Friends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "connected" | "pending"
  >("all");
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setFriends(MOCK_FRIENDS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleAvatarError = (friendId: string) => {
    setAvatarErrors((prev) => ({ ...prev, [friendId]: true }));
  };

  const filteredFriends = friends.filter((friend) => {
    if (activeFilter === "all") return true;
    return friend.status === activeFilter;
  });

  const handleFilterClick = (filter: "all" | "connected" | "pending") => {
    setActiveFilter(filter);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Friends" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading your friends...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Friends" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <h1 className="app-title">Couple Friends</h1>
              <p className="app-subtitle">Your double date partners</p>
            </div>

            <div className="filters-container">
              <button
                className={`filter-btn ${
                  activeFilter === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterClick("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${
                  activeFilter === "connected" ? "active" : ""
                }`}
                onClick={() => handleFilterClick("connected")}
              >
                Connected
              </button>
              <button
                className={`filter-btn ${
                  activeFilter === "pending" ? "active" : ""
                }`}
                onClick={() => handleFilterClick("pending")}
              >
                Pending
              </button>
            </div>

            {filteredFriends.length > 0 ? (
              <div className="friends-grid">
                {filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className={`friend-card ${
                      friend.status === "pending" ? "pending" : ""
                    }`}
                  >
                    <div className="friend-avatar">
                      {friend.avatar && !avatarErrors[friend.id] ? (
                        <Image
                          src={friend.avatar}
                          alt={`${friend.partner1_name} & ${friend.partner2_name}`}
                          width={60}
                          height={60}
                          className="avatar-image"
                          onError={() => handleAvatarError(friend.id)}
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {friend.partner1_name[0]}
                          {friend.partner2_name[0]}
                        </div>
                      )}
                    </div>
                    <div className="friend-info">
                      <div className="friend-name">{friend.couple_name}</div>
                      <div className="friend-partners">
                        {friend.partner1_name} & {friend.partner2_name}
                      </div>
                      <div className="friend-interests">
                        {friend.interests.slice(0, 3).map((interest, idx) => (
                          <span key={idx} className="interest-tag small">
                            {interest}
                          </span>
                        ))}
                      </div>
                      {friend.lastActivity && (
                        <div className="friend-activity">
                          <span className="activity-indicator"></span>
                          {friend.status === "pending"
                            ? "Request pending"
                            : `Last active: ${friend.lastActivity}`}
                        </div>
                      )}
                    </div>
                    <div className="friend-actions">
                      {friend.status === "connected" ? (
                        <Link
                          href={`/dashboard/messages/${friend.id}`}
                          className="btn-message"
                        >
                          Message
                        </Link>
                      ) : (
                        <div className="pending-actions">
                          <button className="btn-accept">Accept</button>
                          <button className="btn-decline">Decline</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>No friends found</h3>
                <p>Try adjusting your filters or explore to find new couples</p>
                <Link
                  href="/dashboard/explore"
                  className="btn btn-connect empty-action"
                >
                  Find Couples
                </Link>
              </div>
            )}
          </main>
          <BottomNavigation activePath="/dashboard/friends" />
        </div>
      </div>
    </div>
  );
}
