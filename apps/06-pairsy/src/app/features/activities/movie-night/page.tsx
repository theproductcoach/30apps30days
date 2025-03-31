"use client";

import Link from "next/link";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

export default function MovieNightPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Double Date Movie Night" />

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
              <div className="activity-landing-icon">🎬</div>
              <h1 className="activity-landing-title">
                Double Date Movie Night
              </h1>
              <div className="activity-landing-category">Entertainment</div>

              <div className="activity-landing-details">
                <div className="activity-landing-time">
                  <span className="detail-icon">📅</span>
                  June 20 at 8:00 PM
                </div>
                <div className="activity-landing-location">
                  <span className="detail-icon">📍</span>
                  Cinema Plaza
                </div>
                <div className="activity-landing-attendance">
                  <span className="detail-icon">👥</span>
                  15 couples interested
                </div>
              </div>
            </div>

            <div className="activity-landing-content">
              <div className="activity-landing-section">
                <h2 className="section-title">About This Activity</h2>
                <p className="activity-landing-description">
                  Watch the latest blockbuster and meet for drinks afterward.
                  This double date movie night is the perfect way to enjoy a new
                  film and make connections with other couples in a relaxed
                  setting.
                </p>
                <p className="activity-landing-description">
                  We've reserved a block of seats at Cinema Plaza for the
                  premiere of "Eternal Horizons" - this summer's most
                  anticipated romantic comedy. After the movie, we'll head to
                  the adjacent lounge for drinks and discussion.
                </p>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Movie Details</h2>
                <div className="movie-details">
                  <div className="movie-poster">
                    <div className="image-container poster-container">
                      <Image
                        src="/images/activities/movie-poster.svg"
                        alt="Eternal Horizons Movie Poster"
                        width={120}
                        height={180}
                        className="poster-image"
                      />
                    </div>
                  </div>
                  <div className="movie-info">
                    <h3 className="movie-title">Eternal Horizons</h3>
                    <p className="movie-meta">
                      Romantic Comedy | PG-13 | 118 min
                    </p>
                    <p className="movie-description">
                      When two strangers keep crossing paths in the most
                      unexpected places, they begin to wonder if the universe is
                      trying to tell them something.
                    </p>
                    <div className="movie-rating">
                      <span className="star-rating">★★★★☆</span>
                      <span className="rating-text">4.2/5 (Critics)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">What's Included</h2>
                <ul className="activity-landing-list">
                  <li>
                    <span className="list-icon">✓</span>
                    Premium reserved seating
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    One complimentary drink at the after-movie mixer
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Small popcorn for each couple
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Schedule</h2>
                <ul className="activity-schedule">
                  <li>
                    <span className="schedule-time">7:30 PM</span>
                    <span className="schedule-event">
                      Meet at Cinema Plaza lobby
                    </span>
                  </li>
                  <li>
                    <span className="schedule-time">8:00 PM</span>
                    <span className="schedule-event">Movie begins</span>
                  </li>
                  <li>
                    <span className="schedule-time">10:00 PM</span>
                    <span className="schedule-event">
                      After-movie social at Skyline Lounge
                    </span>
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Organized by</h2>
                <p className="activity-organizer">
                  Cinema Plaza & Pairsy Events
                </p>
                <p className="activity-price">
                  <strong>Price:</strong> $30 per couple
                </p>
              </div>

              <div className="activity-landing-image">
                <div className="image-container">
                  <Image
                    src="/images/activities/movie-night.svg"
                    alt="Couples at Movie Night"
                    width={400}
                    height={250}
                    className="activity-image"
                  />
                </div>
                <p className="image-caption">
                  Watch, discuss, and connect with other movie-loving couples!
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
