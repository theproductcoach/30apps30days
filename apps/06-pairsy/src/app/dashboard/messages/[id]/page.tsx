"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";
import Link from "next/link";

// Types
interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface Conversation {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
  messages: Message[];
  online?: boolean;
}

// Mock conversation data
const MOCK_CONVERSATIONS: { [key: string]: Conversation } = {
  "conv-1": {
    id: "conv-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    avatar: "/images/avatars/Sam & Taylor.png",
    online: true,
    messages: [
      {
        id: "msg-1",
        text: "Hey there! We saw you're into hiking too. Any favorite trails in the area?",
        sender: "other",
        timestamp: "Yesterday, 2:30 PM",
      },
      {
        id: "msg-2",
        text: "Hi Sam & Taylor! We love the Mountain Ridge trail, it has amazing views!",
        sender: "user",
        timestamp: "Yesterday, 3:15 PM",
      },
      {
        id: "msg-3",
        text: "That's one of our favorites too! Would you be interested in doing a double date hike sometime?",
        sender: "other",
        timestamp: "Yesterday, 3:20 PM",
      },
      {
        id: "msg-4",
        text: "That sounds amazing! When were you thinking?",
        sender: "user",
        timestamp: "Yesterday, 3:45 PM",
      },
      {
        id: "msg-5",
        text: "How about this Saturday morning? The weather is supposed to be perfect.",
        sender: "other",
        timestamp: "Yesterday, 4:00 PM",
      },
      {
        id: "msg-6",
        text: "That sounds great! We're free this Saturday.",
        sender: "user",
        timestamp: "10 min ago",
      },
    ],
  },
  "conv-2": {
    id: "conv-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    avatar: "/images/avatars/Riley & Casey.png",
    online: false,
    messages: [
      {
        id: "msg-1",
        text: "Hey! We'd love to host a game night this weekend. Would you and your partner be interested?",
        sender: "other",
        timestamp: "3 days ago, 7:15 PM",
      },
      {
        id: "msg-2",
        text: "That sounds like so much fun! What time were you thinking?",
        sender: "user",
        timestamp: "3 days ago, 8:30 PM",
      },
      {
        id: "msg-3",
        text: "How about Saturday at 7? We can order pizza and have some drinks.",
        sender: "other",
        timestamp: "2 days ago, 10:15 AM",
      },
      {
        id: "msg-4",
        text: "Perfect! Do you need us to bring anything?",
        sender: "user",
        timestamp: "2 days ago, 1:45 PM",
      },
      {
        id: "msg-5",
        text: "Just yourselves! But if you have a favorite game, feel free to bring it along.",
        sender: "other",
        timestamp: "1 day ago, 9:20 AM",
      },
      {
        id: "msg-6",
        text: "We'll bring Settlers of Catan and some snacks!",
        sender: "user",
        timestamp: "2 hours ago",
      },
    ],
  },
  "conv-3": {
    id: "conv-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    avatar: "/images/avatars/Jamie & Morgan.png",
    messages: [
      {
        id: "msg-1",
        text: "Hi! We noticed you're foodies like us. Have any restaurant recommendations?",
        sender: "other",
        timestamp: "1 week ago, 6:30 PM",
      },
      {
        id: "msg-2",
        text: "Hey there! We just tried 'The Rustic Table' downtown and it was amazing!",
        sender: "user",
        timestamp: "1 week ago, 7:45 PM",
      },
      {
        id: "msg-3",
        text: "We've been wanting to try that place! What did you order?",
        sender: "other",
        timestamp: "1 week ago, 8:20 PM",
      },
      {
        id: "msg-4",
        text: "The truffle pasta and the rosemary chicken were incredible. And make sure to save room for the chocolate lava cake!",
        sender: "user",
        timestamp: "6 days ago, 12:10 PM",
      },
      {
        id: "msg-5",
        text: "That sounds delicious! Maybe we could all go there together sometime?",
        sender: "other",
        timestamp: "5 days ago, 5:15 PM",
      },
      {
        id: "msg-6",
        text: "Have you tried the new Italian place on 5th?",
        sender: "other",
        timestamp: "Yesterday, 1:30 PM",
      },
    ],
  },
  "conv-4": {
    id: "conv-4",
    couple_name: "Outdoor Adventurers",
    partner1_name: "Alex",
    partner2_name: "Jordan",
    avatar: "/images/avatars/Alex & Jordan.png",
    messages: [
      {
        id: "msg-1",
        text: "Hi! We're planning a hiking trip next weekend. Would you like to join?",
        sender: "other",
        timestamp: "1 week ago, 3:15 PM",
      },
      {
        id: "msg-2",
        text: "That sounds fun! Which trail are you planning to hike?",
        sender: "user",
        timestamp: "1 week ago, 5:30 PM",
      },
      {
        id: "msg-3",
        text: "We're thinking of the Eagle's Peak trail. It's about 5 miles round trip with some gorgeous views.",
        sender: "other",
        timestamp: "6 days ago, 10:45 AM",
      },
      {
        id: "msg-4",
        text: "We've never been there! What time would you start?",
        sender: "user",
        timestamp: "5 days ago, 8:20 PM",
      },
      {
        id: "msg-5",
        text: "We usually like to start early, around 8am to avoid the crowds and midday heat. Does that work for you?",
        sender: "other",
        timestamp: "4 days ago, 9:10 AM",
      },
      {
        id: "msg-6",
        text: "The weather should be perfect for hiking this weekend!",
        sender: "other",
        timestamp: "2 days ago, 11:30 AM",
      },
    ],
  },
};

function ConversationDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get conversation ID from params
  const conversationId = params.id as string;

  useEffect(() => {
    // Simulate loading conversation data
    const timer = setTimeout(() => {
      const conversationData = MOCK_CONVERSATIONS[conversationId];
      if (conversationData) {
        setConversation(conversationData);
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom of messages when they load or update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversation) return;

    // Create new message
    const newMessageObj: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      sender: "user",
      timestamp: "Just now",
    };

    // Update conversation with new message
    setConversation({
      ...conversation,
      messages: [...conversation.messages, newMessageObj],
    });

    // Clear input
    setNewMessage("");
  };

  const handleBack = () => {
    router.push("/dashboard/messages");
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Conversation" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading conversation...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Conversation" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Conversation not found</h3>
                <p>The conversation you're looking for doesn't exist</p>
                <button onClick={handleBack} className="btn btn-connect">
                  Back to Messages
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
        <StatusBar title={conversation.couple_name} />
        <div className="main-content">
          <div className="conversation-header">
            <button onClick={handleBack} className="back-button">
              ← Back
            </button>
            <div className="conversation-header-info">
              <div className="conversation-avatar-header">
                {conversation.avatar && !avatarError ? (
                  <Image
                    src={conversation.avatar}
                    alt={`${conversation.partner1_name} & ${conversation.partner2_name}`}
                    width={40}
                    height={40}
                    className="avatar-image"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="avatar-placeholder small">
                    {conversation.partner1_name[0]}
                    {conversation.partner2_name[0]}
                  </div>
                )}
              </div>
              <div className="conversation-title">
                <div className="conversation-name">
                  {conversation.couple_name}
                </div>
                <div className="conversation-subtitle">
                  {conversation.partner1_name} & {conversation.partner2_name}
                  {conversation.online !== undefined && (
                    <span
                      className={`online-indicator ${
                        conversation.online ? "online" : "offline"
                      }`}
                    >
                      {conversation.online ? " ● Online" : " ○ Offline"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="messages-container">
            {conversation.messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "sent" : "received"
                }`}
              >
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="message-input-container"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="message-input"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ConversationDetail() {
  return (
    <Suspense fallback={<div className="loading">Loading conversation...</div>}>
      <ConversationDetailContent />
    </Suspense>
  );
}
