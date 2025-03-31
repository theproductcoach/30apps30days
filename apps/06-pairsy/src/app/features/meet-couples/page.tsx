"use client";

import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import StatusBar from "@/components/StatusBar";

export default function MeetCouplesPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Meet Couples" />

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
              <div className="feature-icon-large">👥</div>
              <h1 className="feature-title">Meet Couples</h1>
              <p className="feature-description">
                Find other couples with similar interests in your area
              </p>
            </div>

            <div className="feature-content">
              <div className="feature-section">
                <h2>How It Works</h2>
                <ul className="feature-list">
                  <li>Create a profile for you and your partner</li>
                  <li>
                    Select your interests and activities you enjoy together
                  </li>
                  <li>Browse through couples in your area</li>
                  <li>Connect with those who share your interests</li>
                  <li>Chat and plan your first double date</li>
                </ul>
              </div>

              <div className="feature-section">
                <h2>Find Your Perfect Match</h2>
                <p>
                  Our matching algorithm helps you discover couples that share
                  your interests and lifestyle. Whether you're looking for
                  hiking buddies, board game enthusiasts, or fellow foodies,
                  Pairsy helps you find your perfect match for double dates and
                  lasting friendships.
                </p>
              </div>

              <div className="feature-section">
                <h2>Safe & Private</h2>
                <p>
                  Your privacy is important to us. You control what information
                  is shared with other couples, and all connections require
                  mutual interest before communication begins.
                </p>
              </div>

              <div className="feature-cta">
                <Link href="/signup" className="btn btn-connect">
                  Sign Up Now
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
