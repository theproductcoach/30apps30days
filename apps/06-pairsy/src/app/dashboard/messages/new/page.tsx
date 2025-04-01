"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";

// Mock data type
type Couple = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
};

type Activity = {
  id: string;
  title: string;
  icon: string;
  organizer?: string;
};

// Mock data for couples
const MOCK_COUPLES: { [key: string]: Couple } = {
  "couple-1": {
    id: "couple-1",
    couple_name: "City Explorers",
    partner1_name: "Sam",
    partner2_name: "Taylor",
    avatar: "/images/avatars/sam-taylor.png",
  },
  "couple-2": {
    id: "couple-2",
    couple_name: "Game Night",
    partner1_name: "Riley",
    partner2_name: "Casey",
    avatar: "/images/avatars/riley-casey.png",
  },
  "couple-3": {
    id: "couple-3",
    couple_name: "Foodies",
    partner1_name: "Jamie",
    partner2_name: "Morgan",
    avatar: "/images/avatars/jamie-morgan.png",
  },
  "couple-4": {
    id: "couple-4",
    couple_name: "Outdoor Adventurers",
    partner1_name: "Alex",
    partner2_name: "Jordan",
    avatar: "/images/avatars/alex-jordan.png",
  },
};

// Mock data for activities
const MOCK_ACTIVITIES: { [key: string]: Activity } = {
  "activity-1": {
    id: "activity-1",
    title: "Wine Tasting Evening",
    icon: "🍷",
    organizer: "Seattle Social Events",
  },
  "activity-4": {
    id: "activity-4",
    title: "Weekend Hiking Trip",
    icon: "🥾",
    organizer: "Outdoor Adventures Club",
  },
};

function NewMessageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [couple, setCouple] = useState<Couple | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [avatarError, setAvatarError] = useState(false);

  // Get parameters from query params
  const coupleId = searchParams.get("couple");
  const activityId = searchParams.get("activity");

  useEffect(() => {
    if (!coupleId && !activityId) {
      setLoading(false);
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      if (coupleId) {
        const coupleData = MOCK_COUPLES[coupleId];
        if (coupleData) {
          setCouple(coupleData);
        }
      }

      if (activityId) {
        const activityData = MOCK_ACTIVITIES[activityId];
        if (activityData) {
          setActivity(activityData);
          // If it's an activity and no couple specified, set a default message
          if (!coupleId) {
            setMessage(
              `Hi, I have a question about the "${activityData.title}" activity: `
            );
          }
        }
      }

      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [coupleId, activityId]);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would send the message to the API
    if (couple) {
      alert(`Message sent to ${couple.couple_name}!`);
    } else if (activity) {
      alert(`Question about "${activity.title}" sent to organizer!`);
    }

    // Redirect to the message list
    router.push("/dashboard/messages");
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="New Message" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if ((!coupleId || !couple) && (!activityId || !activity)) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="New Message" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Recipient not found</h3>
                <p>The recipient you're trying to message doesn't exist</p>
                <button onClick={handleBack} className="btn btn-connect">
                  Back
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
        <StatusBar title="New Message" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <button onClick={handleBack} className="back-link">
                ← Back
              </button>
              <h1 className="app-title">New Message</h1>
            </div>

            <div className="new-message-recipient">
              {couple && (
                <>
                  <div className="recipient-avatar">
                    {couple.avatar && !avatarError ? (
                      <Image
                        src={couple.avatar}
                        alt={`${couple.partner1_name} & ${couple.partner2_name}`}
                        width={50}
                        height={50}
                        className="avatar-image"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {couple.partner1_name[0]}
                        {couple.partner2_name[0]}
                      </div>
                    )}
                  </div>
                  <div className="recipient-info">
                    <div className="recipient-name">{couple.couple_name}</div>
                    <div className="recipient-partners">
                      {couple.partner1_name} & {couple.partner2_name}
                    </div>
                  </div>
                </>
              )}

              {activity && !couple && (
                <>
                  <div className="recipient-avatar activity">
                    <div className="activity-icon-small">{activity.icon}</div>
                  </div>
                  <div className="recipient-info">
                    <div className="recipient-name">{activity.title}</div>
                    {activity.organizer && (
                      <div className="recipient-organizer">
                        Organized by: {activity.organizer}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="new-message-form">
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  placeholder="Type your message here..."
                  rows={6}
                  required
                />
                <p className="input-help">
                  {couple
                    ? "Introduce yourselves and suggest a way to connect"
                    : "Ask any questions you have about this activity"}
                </p>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-connect"
                  disabled={!message.trim()}
                >
                  Send Message
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function NewMessage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <NewMessageContent />
    </Suspense>
  );
}
