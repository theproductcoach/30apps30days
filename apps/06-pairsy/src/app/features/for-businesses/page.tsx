"use client";

import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import StatusBar from "@/components/StatusBar";

export default function ForBusinessesPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="For Businesses" />

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
              <div className="feature-icon-large">💼</div>
              <h1 className="feature-title">For Businesses</h1>
              <p className="feature-description">
                List your activities on our platform
              </p>
            </div>

            <div className="feature-content">
              <div className="feature-section">
                <h2>Reach Couples Looking for Activities</h2>
                <p>
                  Partner with Pairsy to showcase your business to couples
                  actively seeking new experiences. Whether you run a
                  restaurant, activity venue, or event space, connect with our
                  engaged audience.
                </p>
              </div>

              <div className="feature-section">
                <h2>Benefits for Your Business</h2>
                <ul className="feature-list">
                  <li>Targeted exposure to couples in your area</li>
                  <li>Increased bookings for couple-friendly activities</li>
                  <li>Featured listings in our "Popular Activities" section</li>
                  <li>Analytics on views and engagement</li>
                  <li>Direct integration with your booking system</li>
                </ul>
              </div>

              <div className="feature-section">
                <h2>How It Works</h2>
                <p>
                  Our platform makes it easy to list your business and
                  activities:
                </p>
                <ul className="feature-list">
                  <li>Create a business profile</li>
                  <li>Add your activities with descriptions and images</li>
                  <li>Set availability and pricing</li>
                  <li>Receive bookings and inquiries directly</li>
                </ul>
              </div>

              <div className="feature-section">
                <h2>Contact Us</h2>
                <p>
                  Interested in having your business featured on Pairsy? Get in
                  touch with our partnerships team to discuss how we can work
                  together.
                </p>
              </div>

              <div className="feature-cta">
                <Link
                  href="mailto:partners@pairsy.com"
                  className="btn btn-connect"
                >
                  Contact Our Team
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
