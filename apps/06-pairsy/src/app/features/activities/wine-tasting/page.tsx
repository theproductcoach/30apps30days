"use client";

import Link from "next/link";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

export default function WineTastingPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Wine Tasting Evening" />

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

            <div className="activity-landing-header">
              <div className="activity-landing-icon">🍷</div>
              <h1 className="activity-landing-title">Wine Tasting Evening</h1>
              <div className="activity-landing-category">Food & Drink</div>

              <div className="activity-landing-details">
                <div className="activity-landing-time">
                  <span className="detail-icon">📅</span>
                  June 15 at 7:00 PM
                </div>
                <div className="activity-landing-location">
                  <span className="detail-icon">📍</span>
                  Vineyard Lounge, Downtown
                </div>
                <div className="activity-landing-attendance">
                  <span className="detail-icon">👥</span>
                  12 couples interested
                </div>
              </div>
            </div>

            <div className="activity-landing-content">
              <div className="activity-landing-section">
                <h2 className="section-title">About This Activity</h2>
                <p className="activity-landing-description">
                  Join other couples for a relaxed evening of wine tasting and
                  socializing. Our sommelier will guide you through a selection
                  of premium wines from around the world, explaining the unique
                  characteristics of each variety.
                </p>
                <p className="activity-landing-description">
                  This is a perfect opportunity to meet other couples in a
                  sophisticated yet casual setting. No prior wine knowledge is
                  required—just bring your curiosity and enthusiasm! Light
                  appetizers will be served to complement the wines.
                </p>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">What to Expect</h2>
                <ul className="activity-landing-list">
                  <li>
                    <span className="list-icon">✓</span>
                    Guided tasting of 6 premium wines
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Complementary appetizer pairings
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Casual networking with other couples
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Take-home tasting notes
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Organized by</h2>
                <p className="activity-organizer">
                  Vineyard Lounge Events Team
                </p>
                <p className="activity-price">
                  <strong>Price:</strong> $45 per couple
                </p>
              </div>

              <div className="activity-landing-image">
                <div className="image-container">
                  <Image
                    src="/images/activities/wine-tasting.svg"
                    alt="Wine Tasting Event"
                    width={400}
                    height={250}
                    className="activity-image"
                  />
                </div>
                <p className="image-caption">
                  Join us for an evening of fine wines and great company!
                </p>
              </div>

              <div className="activity-cta">
                <Link href="/signup" className="btn btn-connect">
                  Sign Up to Join
                </Link>
                <Link href="/features/activities" className="btn btn-view-more">
                  View More Activities
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
