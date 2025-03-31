"use client";

import Link from "next/link";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

type ActivityPreview = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  date?: string;
  location?: string;
  icon: string;
};

const FEATURED_ACTIVITIES: ActivityPreview[] = [
  {
    id: "activity-1",
    slug: "wine-tasting",
    title: "Wine Tasting Evening",
    category: "Food & Drink",
    description:
      "Join other couples for a relaxed evening of wine tasting and socializing.",
    date: "June 15",
    location: "Vineyard Lounge, Downtown",
    icon: "🍷",
  },
  {
    id: "activity-2",
    slug: "cooking-class",
    title: "Couples Cooking Class",
    category: "Cooking",
    description:
      "Learn to make gourmet dishes together in this fun, interactive class.",
    date: "June 18",
    location: "Culinary Institute",
    icon: "👨‍🍳",
  },
  {
    id: "activity-3",
    slug: "movie-night",
    title: "Double Date Movie Night",
    category: "Entertainment",
    description: "Watch the latest blockbuster and meet for drinks afterward.",
    date: "June 20",
    location: "Cinema Plaza",
    icon: "🎬",
  },
  {
    id: "activity-4",
    slug: "hiking-trip",
    title: "Weekend Hiking Trip",
    category: "Outdoors",
    description:
      "A group hike through scenic trails followed by a picnic lunch.",
    date: "June 25",
    location: "Mountain View Trail",
    icon: "🥾",
  },
];

const ACTIVITY_CATEGORIES = [
  { name: "Food & Drink", count: 5, icon: "🍽️" },
  { name: "Outdoors", count: 8, icon: "🏞️" },
  { name: "Entertainment", count: 6, icon: "🎭" },
  { name: "Sports", count: 4, icon: "⚽" },
  { name: "Arts & Crafts", count: 3, icon: "🎨" },
  { name: "Cooking", count: 2, icon: "🍳" },
];

export default function ActivitiesPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Activities" />

          <main className="content-wrapper">
            <Link href="/" className="back-to-home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33333 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12L3 8L7 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Home
            </Link>

            <div className="feature-banner">
              <div className="feature-icon-large">🗓️</div>
              <h1 className="feature-title">Plan Activities</h1>
              <p className="feature-description">
                Discover fun activities to do together with other couples
              </p>
            </div>

            <div className="activities-content">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="search-input"
                />
              </div>

              <div className="category-scrollbar">
                <div className="category-scroll-container">
                  {ACTIVITY_CATEGORIES.map((category) => (
                    <div key={category.name} className="category-chip">
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                      <span className="category-count">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="featured-section">
                <h2 className="section-title">Featured Activities</h2>
                <div className="featured-activities">
                  {FEATURED_ACTIVITIES.map((activity) => (
                    <Link
                      key={activity.id}
                      href={`/features/activities/${activity.slug}`}
                      className="activity-card"
                    >
                      <div className="activity-card-header">
                        <div className="activity-card-icon">
                          {activity.icon}
                        </div>
                        <div className="activity-card-info">
                          <h3 className="activity-card-title">
                            {activity.title}
                          </h3>
                          <span className="activity-card-category">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                      <p className="activity-card-description">
                        {activity.description}
                      </p>
                      {activity.date && (
                        <div className="activity-card-date">
                          <span className="detail-icon-mini">📅</span>{" "}
                          {activity.date}
                        </div>
                      )}
                      {activity.location && (
                        <div className="activity-card-location">
                          <span className="detail-icon-mini">📍</span>{" "}
                          {activity.location}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="activities-section">
                <h2 className="section-title">Upcoming Activities</h2>
                <div className="activities-list">
                  <div className="activity-row">
                    <div className="activity-row-icon">🧘</div>
                    <div className="activity-row-info">
                      <div className="activity-row-title">
                        Couples Yoga Retreat
                      </div>
                      <div className="activity-row-details">
                        <span className="activity-row-category">Fitness</span>
                        <span className="activity-row-date">July 2</span>
                      </div>
                    </div>
                    <div className="activity-row-action">
                      <span className="view-action">View</span>
                    </div>
                  </div>

                  <div className="activity-row">
                    <div className="activity-row-icon">🎨</div>
                    <div className="activity-row-info">
                      <div className="activity-row-title">
                        Paint & Sip Social
                      </div>
                      <div className="activity-row-details">
                        <span className="activity-row-category">
                          Arts & Crafts
                        </span>
                        <span className="activity-row-date">July 8</span>
                      </div>
                    </div>
                    <div className="activity-row-action">
                      <span className="view-action">View</span>
                    </div>
                  </div>

                  <div className="activity-row">
                    <div className="activity-row-icon">🎮</div>
                    <div className="activity-row-info">
                      <div className="activity-row-title">
                        Game Night Tournament
                      </div>
                      <div className="activity-row-details">
                        <span className="activity-row-category">
                          Entertainment
                        </span>
                        <span className="activity-row-date">July 15</span>
                      </div>
                    </div>
                    <div className="activity-row-action">
                      <span className="view-action">View</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="suggest-activity">
                <h2 className="section-title">Have an idea?</h2>
                <p className="suggest-description">
                  Want to host or suggest an activity for couples in your area?
                </p>
                <div className="suggest-cta">
                  <Link href="/signup" className="btn btn-connect">
                    Sign Up to Suggest
                  </Link>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom navigation */}
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
}
