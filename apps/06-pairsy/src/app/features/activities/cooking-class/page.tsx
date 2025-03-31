"use client";

import Link from "next/link";
import Image from "next/image";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

export default function CookingClassPage() {
  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <StatusBar title="Couples Cooking Class" />

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
              <div className="activity-landing-icon">👨‍🍳</div>
              <h1 className="activity-landing-title">Couples Cooking Class</h1>
              <div className="activity-landing-category">Cooking</div>

              <div className="activity-landing-details">
                <div className="activity-landing-time">
                  <span className="detail-icon">📅</span>
                  June 18 at 6:30 PM
                </div>
                <div className="activity-landing-location">
                  <span className="detail-icon">📍</span>
                  Culinary Institute
                </div>
                <div className="activity-landing-attendance">
                  <span className="detail-icon">👥</span>8 couples interested
                </div>
              </div>
            </div>

            <div className="activity-landing-content">
              <div className="activity-landing-section">
                <h2 className="section-title">About This Activity</h2>
                <p className="activity-landing-description">
                  Learn to make gourmet dishes together in this fun, interactive
                  class designed specifically for couples. Our professional chef
                  will guide you through creating a complete three-course meal
                  from scratch.
                </p>
                <p className="activity-landing-description">
                  This hands-on cooking class is perfect for couples of all
                  skill levels. Work as a team to create delicious dishes, then
                  enjoy your creations together at the end of the class with the
                  other participating couples.
                </p>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">On the Menu</h2>
                <ul className="activity-landing-list menu-list">
                  <li>
                    <span className="menu-course">Appetizer:</span>
                    Mushroom Risotto with Truffle Oil
                  </li>
                  <li>
                    <span className="menu-course">Main Course:</span>
                    Pan-Seared Salmon with Herb Butter Sauce
                  </li>
                  <li>
                    <span className="menu-course">Dessert:</span>
                    Chocolate Soufflé with Raspberry Coulis
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">What's Included</h2>
                <ul className="activity-landing-list">
                  <li>
                    <span className="list-icon">✓</span>
                    All ingredients and cooking supplies
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Professional chef instruction
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Wine pairing with your meal
                  </li>
                  <li>
                    <span className="list-icon">✓</span>
                    Recipe cards to take home
                  </li>
                </ul>
              </div>

              <div className="activity-landing-section">
                <h2 className="section-title">Organized by</h2>
                <p className="activity-organizer">
                  Culinary Institute Cooking School
                </p>
                <p className="activity-price">
                  <strong>Price:</strong> $85 per couple
                </p>
              </div>

              <div className="activity-landing-image">
                <div className="image-container">
                  <Image
                    src="/images/activities/cooking-class.svg"
                    alt="Couples Cooking Class"
                    width={400}
                    height={250}
                    className="activity-image"
                  />
                </div>
                <p className="image-caption">
                  Cook, eat, and connect with other couples!
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
