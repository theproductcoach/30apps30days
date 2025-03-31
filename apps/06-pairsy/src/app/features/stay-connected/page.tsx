"use client";

import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import StatusBar from "@/components/StatusBar";

export default function StayConnectedPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Stay Connected" />

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
              <div className="feature-icon-large">💬</div>
              <h1 className="feature-title">Stay Connected</h1>
              <p className="feature-description">
                Chat with your matches and make plans
              </p>
            </div>

            <div className="feature-content">
              <div className="feature-section">
                <h2>Real-Time Messaging</h2>
                <p>
                  Our built-in messaging system makes it easy to chat with other
                  couples you've connected with. Share photos, locations, and
                  plan your next meetup all within the app.
                </p>
              </div>

              <div className="feature-section">
                <h2>Group Chats</h2>
                <p>
                  Create group chats with multiple couples to plan larger
                  gatherings or events. Perfect for organizing game nights,
                  dinner parties, or weekend getaways with your new friends.
                </p>
              </div>

              <div className="feature-section">
                <h2>Event Reminders</h2>
                <p>
                  Never miss a planned activity with our built-in reminder
                  system. Get notifications before your scheduled meetups and
                  share updates with your friends.
                </p>
              </div>

              <div className="feature-section">
                <h2>Share Memories</h2>
                <p>
                  After your meetup, share photos and memories in your chat.
                  Build a timeline of your friendship and look back on all the
                  fun activities you've done together.
                </p>
              </div>

              <div className="feature-cta">
                <Link href="/signup" className="btn btn-connect">
                  Join Now
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
