"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

// Mock data types
type Conversation = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
  last_message: string;
  last_message_time: string;
  unread: boolean;
};

// Mock data for conversations
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    avatar: "/images/avatars/Sam & Taylor.png",
    last_message: "That sounds great! We're free this Saturday.",
    last_message_time: "10 min ago",
    unread: true,
  },
  {
    id: "conv-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    avatar: "/images/avatars/Riley & Casey.png",
    last_message: "We'll bring Settlers of Catan and some snacks!",
    last_message_time: "2 hours ago",
    unread: true,
  },
  {
    id: "conv-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    avatar: "/images/avatars/Jamie & Morgan.png",
    last_message: "Have you tried the new Italian place on 5th?",
    last_message_time: "Yesterday",
    unread: false,
  },
  {
    id: "conv-4",
    couple_name: "Outdoor Adventurers",
    partner1_name: "Alex",
    partner2_name: "Jordan",
    avatar: "/images/avatars/Alex & Jordan.png",
    last_message: "The weather should be perfect for hiking this weekend!",
    last_message_time: "2 days ago",
    unread: false,
  },
];

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setConversations(MOCK_CONVERSATIONS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleAvatarError = (id: string) => {
    setAvatarErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredConversations = conversations.filter((conversation) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      conversation.couple_name.toLowerCase().includes(searchLower) ||
      conversation.partner1_name.toLowerCase().includes(searchLower) ||
      conversation.partner2_name.toLowerCase().includes(searchLower) ||
      conversation.last_message.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Messages" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading conversations...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <StatusBar title="Messages" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <h1 className="app-title">Messages</h1>
              <p className="app-subtitle">Your conversations</p>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search conversations..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredConversations.length > 0 ? (
              <div className="conversations-list">
                {filteredConversations.map((conversation) => (
                  <Link
                    href={`/dashboard/messages/${conversation.id}`}
                    key={conversation.id}
                    className={`conversation-item ${
                      conversation.unread ? "unread" : ""
                    }`}
                  >
                    <div className="conversation-avatar">
                      {conversation.avatar && !avatarErrors[conversation.id] ? (
                        <Image
                          src={conversation.avatar}
                          alt={`${conversation.partner1_name} & ${conversation.partner2_name}`}
                          width={50}
                          height={50}
                          className="avatar-image"
                          onError={() => handleAvatarError(conversation.id)}
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {conversation.partner1_name[0]}
                          {conversation.partner2_name[0]}
                        </div>
                      )}
                      {conversation.unread && (
                        <div className="unread-indicator"></div>
                      )}
                    </div>
                    <div className="conversation-content">
                      <div className="conversation-header">
                        <div className="conversation-name">
                          {conversation.couple_name}
                        </div>
                        <div className="conversation-time">
                          {conversation.last_message_time}
                        </div>
                      </div>
                      <div className="conversation-message">
                        {conversation.last_message}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>No conversations found</h3>
                <p>Connect with couples to start chatting</p>
                <Link
                  href="/dashboard/explore"
                  className="btn btn-connect empty-action"
                >
                  Find Couples
                </Link>
              </div>
            )}
          </main>
          <BottomNavigation activePath="/dashboard/messages" />
        </div>
      </div>
    </div>
  );
}
