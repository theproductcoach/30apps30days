"use client";

import Link from "next/link";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

export default function HikingTripPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Weekend Hiking Trip" />

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
              <div className="activity-landing-icon">🥾</div>
              <h1 className="activity-landing-title">Weekend Hiking Trip</h1>
              <div className="activity-landing-category">Outdoors</div>

              <div className="activity-landing-details">
                <div className="activity-landing-time">
                  <span className="detail-icon">📅</span>
                  June 25 at 9:00 AM
                </div>
                <div className="activity-landing-location">
                  <span className="detail-icon">📍</span>
                  Mountain View Trail
                </div>
                <div className="activity-landing-attendance">
                  <span className="detail-icon">👥</span>6 couples interested
                </div>
              </div>
            </div>

            <div className="activity-landing-content">
              <div className="activity-landing-section">
                <h2 className="section-title">About This Activity</h2>
                <p className="activity-landing-description">
                  Escape the city for a day with this beautiful group hike at
                  Mountain View Trail. The hike is approximately 5 miles with
                  moderate difficulty, featuring stunning views of the valley
                  and several photo opportunities.
                </p>
                <p className="activity-landing-description">
                  After reaching the summit, we'll have a communal picnic lunch
                  where you can mingle with other couples while enjoying the
                  scenery. The trail is well-maintained and suitable for hikers
                  with basic experience.
                </p>
              </div>

              <div className="activity-landing-image">
                <div className="image-container">
                  <Image
                    src="/images/activities/hiking-trip.svg"
                    alt="Hiking Trail"
                    width={400}
                    height={250}
                    className="activity-image"
                  />
                </div>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Trail Details</h2>
                <ul className="trail-details">
                  <li>
                    <span className="trail-spec">Distance:</span>
                    <span className="trail-value">5 miles round trip</span>
                  </li>
                  <li>
                    <span className="trail-spec">Elevation Gain:</span>
                    <span className="trail-value">800 feet</span>
                  </li>
                  <li>
                    <span className="trail-spec">Difficulty:</span>
                    <span className="trail-value">Moderate</span>
                  </li>
                  <li>
                    <span className="trail-spec">Estimated Time:</span>
                    <span className="trail-value">
                      3-4 hours (including lunch)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">What to Bring</h2>
                <ul className="activity-landing-list">
                  <li>
                    <span className="list-icon">✓</span>
                    Comfortable hiking shoes or boots
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Water bottle (at least 1 liter per person)
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Sun protection (hat, sunscreen, sunglasses)
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Light lunch or snacks to share
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Small backpack
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Meeting Point</h2>
                <p className="meeting-point">
                  We'll meet at the North Ridge Park entrance parking lot at
                  8:45 AM. Look for the group with the Pairsy flag! Parking is
                  free but limited, so carpooling is encouraged.
                </p>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Organized by</h2>
                <p className="activity-organizer">Outdoor Adventures Club</p>
                <p className="activity-price">
                  <strong>Price:</strong> Free (bring your own lunch)
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
