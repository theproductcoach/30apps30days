"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

// Mock data type
type ActivityDetail = {
  id: string;
  title: string;
  category: string;
  description: string;
  long_description?: string;
  location?: string;
  date?: string;
  time?: string;
  end_time?: string;
  image?: string;
  icon: string;
  couples_interested: number;
  organizer?: string;
  price?: string;
  requirements?: string[];
  attending_couples?: AttendeesCouple[];
  similar_activities?: SimilarActivity[];
};

type AttendeesCouple = {
  id: string;
  couple_name: string;
  partner1_name: string;
  partner2_name: string;
  avatar?: string;
};

type SimilarActivity = {
  id: string;
  title: string;
  category: string;
  date?: string;
  icon: string;
};

// Mock data
const MOCK_ACTIVITIES: { [key: string]: ActivityDetail } = {
  "activity-1": {
    id: "activity-1",
    title: "Wine Tasting Evening",
    category: "Food & Drink",
    description:
      "Join other couples for a relaxed evening of wine tasting and socializing.",
    long_description:
      "Experience an elegant evening of wine tasting with like-minded couples at the beautiful Vineyard Lounge. This guided tasting will feature six premium wines from local vineyards, paired with gourmet cheese and charcuterie. A sommelier will lead the tasting, offering insights into wine appreciation and the story behind each selection. Perfect for both wine enthusiasts and curious beginners looking to expand their palate in a social setting.",
    location: "Vineyard Lounge, 123 Downtown Ave",
    date: "June 15",
    time: "7:00 PM",
    end_time: "10:00 PM",
    icon: "🍷",
    couples_interested: 12,
    organizer: "Seattle Social Events",
    price: "$45 per person",
    requirements: ["21+ only", "Smart casual attire", "Reservation required"],
    attending_couples: [
      {
        id: "couple-2",
        couple_name: "Game Night",
        partner1_name: "Riley",
        partner2_name: "Casey",
        avatar: "/images/avatars/Riley & Casey.png",
      },
      {
        id: "couple-3",
        couple_name: "Foodies",
        partner1_name: "Jamie",
        partner2_name: "Morgan",
        avatar: "/images/avatars/Jamie & Morgan.png",
      },
    ],
    similar_activities: [
      {
        id: "activity-2",
        title: "Couples Cooking Class",
        category: "Cooking",
        date: "June 18",
        icon: "👨‍🍳",
      },
      {
        id: "activity-5",
        title: "Brewery Tour",
        category: "Food & Drink",
        date: "June 30",
        icon: "🍺",
      },
    ],
  },
  "activity-4": {
    id: "activity-4",
    title: "Weekend Hiking Trip",
    category: "Outdoors",
    description:
      "A group hike through scenic trails followed by a picnic lunch.",
    long_description:
      "Escape the city for a day with this beautiful group hike at Mountain View Trail. The hike is approximately 5 miles with moderate difficulty, featuring stunning views of the valley and several photo opportunities. After reaching the summit, we'll have a communal picnic lunch where you can mingle with other couples while enjoying the scenery. The trail is well-maintained and suitable for hikers with basic experience. Don't forget to bring water, sun protection, and comfortable footwear!",
    location: "Mountain View Trail, North Ridge Park",
    date: "June 25",
    time: "9:00 AM",
    end_time: "3:00 PM",
    icon: "🥾",
    couples_interested: 6,
    organizer: "Outdoor Adventures Club",
    price: "Free (bring your own lunch)",
    requirements: [
      "Basic hiking experience",
      "Appropriate footwear",
      "Water bottle",
    ],
    attending_couples: [
      {
        id: "couple-1",
        couple_name: "City Explorers",
        partner1_name: "Sam",
        partner2_name: "Taylor",
        avatar: "/images/avatars/Sam & Taylor.png",
      },
      {
        id: "couple-4",
        couple_name: "Outdoor Adventurers",
        partner1_name: "Alex",
        partner2_name: "Jordan",
        avatar: "/images/avatars/Alex & Jordan.png",
      },
    ],
    similar_activities: [
      {
        id: "activity-6",
        title: "Kayaking Adventure",
        category: "Outdoors",
        date: "July 2",
        icon: "🚣",
      },
      {
        id: "activity-7",
        title: "Sunset Beach Picnic",
        category: "Outdoors",
        date: "July 8",
        icon: "🏖️",
      },
    ],
  },
};

function ActivityDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInterested, setIsInterested] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Get activity ID from params
  const activityId = params.id as string;

  useEffect(() => {
    // Simulate loading activity data
    const timer = setTimeout(() => {
      const activityData = MOCK_ACTIVITIES[activityId];
      if (activityData) {
        setActivity(activityData);
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activityId]);

  const handleBack = () => {
    router.back();
  };

  const handleToggleInterest = () => {
    setIsInterested(!isInterested);
  };

  const handleAvatarError = (id: string) => {
    setAvatarErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Activity Details" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading activity details...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <StatusBar title="Activity Details" />
          <div className="main-content">
            <main className="content-wrapper">
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Activity not found</h3>
                <p>The activity you're looking for doesn't exist</p>
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
        <StatusBar title="Activity Details" />
        <div className="main-content">
          <main className="content-wrapper">
            <div className="header">
              <button onClick={handleBack} className="back-link">
                ← Back
              </button>
            </div>

            <div className="activity-detail-header">
              <div className="activity-detail-icon">{activity.icon}</div>
              <h1 className="activity-detail-title">{activity.title}</h1>
              <div className="activity-detail-category">
                {activity.category}
              </div>

              {activity.date && activity.time && (
                <div className="activity-detail-time">
                  <span className="detail-icon">📅</span>
                  {activity.date} at {activity.time}
                  {activity.end_time && ` - ${activity.end_time}`}
                </div>
              )}

              {activity.location && (
                <div className="activity-detail-location">
                  <span className="detail-icon">📍</span> {activity.location}
                </div>
              )}

              <div className="activity-detail-attendance">
                <span className="detail-icon">👥</span>
                {activity.couples_interested} couples interested
                {isInterested && " (including you)"}
              </div>
            </div>

            <div className="activity-detail-content">
              <div className="activity-detail-section">
                <h2 className="section-title">About This Activity</h2>
                <p className="activity-detail-description">
                  {activity.long_description || activity.description}
                </p>
              </div>

              {activity.organizer && (
                <div className="activity-detail-section">
                  <h2 className="section-title">Organized by</h2>
                  <p className="activity-detail-organizer">
                    {activity.organizer}
                  </p>
                </div>
              )}

              {activity.price && (
                <div className="activity-detail-section">
                  <h2 className="section-title">Price</h2>
                  <p className="activity-detail-price">{activity.price}</p>
                </div>
              )}

              {activity.requirements && activity.requirements.length > 0 && (
                <div className="activity-detail-section">
                  <h2 className="section-title">What to Know</h2>
                  <ul className="activity-detail-requirements">
                    {activity.requirements.map((req, idx) => (
                      <li key={idx} className="requirement-item">
                        <span className="requirement-icon">✓</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activity.attending_couples &&
                activity.attending_couples.length > 0 && (
                  <div className="activity-detail-section">
                    <h2 className="section-title">Who's Going</h2>
                    <div className="attending-couples">
                      {activity.attending_couples.map((couple) => (
                        <Link
                          href={`/dashboard/explore/profile/${couple.id}`}
                          key={couple.id}
                          className="attending-couple"
                        >
                          <div className="attending-avatar">
                            {couple.avatar && !avatarErrors[couple.id] ? (
                              <Image
                                src={couple.avatar}
                                alt={`${couple.partner1_name} & ${couple.partner2_name}`}
                                width={40}
                                height={40}
                                className="avatar-image"
                                onError={() => handleAvatarError(couple.id)}
                              />
                            ) : (
                              <div className="avatar-placeholder small">
                                {couple.partner1_name[0]}
                                {couple.partner2_name[0]}
                              </div>
                            )}
                          </div>
                          <div className="attending-info">
                            <div className="attending-name">
                              {couple.couple_name}
                            </div>
                            <div className="attending-partners">
                              {couple.partner1_name} & {couple.partner2_name}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {activity.similar_activities &&
                activity.similar_activities.length > 0 && (
                  <div className="activity-detail-section">
                    <h2 className="section-title">Similar Activities</h2>
                    <div className="similar-activities">
                      {activity.similar_activities.map((similar) => (
                        <Link
                          href={`/dashboard/explore/activity/${similar.id}`}
                          key={similar.id}
                          className="similar-activity"
                        >
                          <div className="similar-activity-icon">
                            {similar.icon}
                          </div>
                          <div className="similar-activity-info">
                            <div className="similar-activity-title">
                              {similar.title}
                            </div>
                            <div className="similar-activity-meta">
                              <span className="similar-activity-category">
                                {similar.category}
                              </span>
                              {similar.date && (
                                <span className="similar-activity-date">
                                  • {similar.date}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="activity-detail-footer">
              <button
                onClick={handleToggleInterest}
                className={`btn ${
                  isInterested ? "btn-interested-confirmed" : "btn-interested"
                }`}
              >
                {isInterested ? "I'm Interested ✓" : "I'm Interested"}
              </button>
              <Link
                href={`/dashboard/messages/new?activity=${activity.id}`}
                className="btn btn-message-activity"
              >
                Ask a Question
              </Link>
            </div>
          </main>
          <BottomNavigation activePath="/dashboard/explore" />
        </div>
      </div>
    </div>
  );
}

// Wrap with Suspense for useParams
export default function ActivityDetail() {
  return (
    <Suspense
      fallback={<div className="loading">Loading activity details...</div>}
    >
      <ActivityDetailContent />
    </Suspense>
  );
}
