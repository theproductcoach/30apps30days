"use client";

import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import StatusBar from "@/components/StatusBar";

export default function PlanActivitiesPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Plan Activities" />

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
                Discover fun activities to do together
              </p>
            </div>

            <div className="feature-content">
              <div className="feature-section">
                <h2>Discover New Experiences</h2>
                <p>
                  Running out of date ideas? Pairsy offers a curated collection
                  of activities for double dates. From outdoor adventures to
                  culinary experiences, there's something for every couple to
                  enjoy.
                </p>
              </div>

              <div className="feature-section">
                <h2>Popular Activities</h2>
                <div className="activities-grid">
                  <div className="activity-card">
                    <div className="activity-icon">🥾</div>
                    <div className="activity-name">Hiking Adventures</div>
                  </div>
                  <div className="activity-card">
                    <div className="activity-icon">🍳</div>
                    <div className="activity-name">Cooking Classes</div>
                  </div>
                  <div className="activity-card">
                    <div className="activity-icon">🎮</div>
                    <div className="activity-name">Game Nights</div>
                  </div>
                  <div className="activity-card">
                    <div className="activity-icon">🎨</div>
                    <div className="activity-name">Art Workshops</div>
                  </div>
                </div>
              </div>

              <div className="feature-section">
                <h2>Easy Planning</h2>
                <p>
                  Coordinating with another couple has never been easier. Use
                  our integrated calendar to find dates that work for everyone,
                  send invitations, and confirm plans all in one place.
                </p>
              </div>

              <div className="feature-section">
                <h2>Local Recommendations</h2>
                <p>
                  Discover the best spots in your area for double dates. Our app
                  includes recommendations for restaurants, cafes, parks, and
                  entertainment venues that are perfect for group outings.
                </p>
              </div>

              <div className="feature-cta">
                <Link href="/signup" className="btn btn-connect">
                  Get Started
                </Link>
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
