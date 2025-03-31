"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="app-container">
      {/* Phone Container */}
      <div className="phone-container">
        <div className="main-content">
          <header className="status-bar">
            <div className="status-left">9:41</div>
            <div className="status-right">
              <div className="status-icon">
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 0H14C14.5523 0 15 0.447715 15 1V9C15 9.55229 14.5523 10 14 10H1C0.447715 10 0 9.55229 0 9V1C0 0.447715 0.447715 0 1 0ZM1.5 1.5V8.5H13.5V1.5H1.5Z"
                    fill="black"
                  />
                  <path d="M16 3.5H15V6.5H16V3.5Z" fill="black" />
                </svg>
              </div>
              <div className="status-icon">
                <svg
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5 1.5C4.5 1.5 1.86 3.33 0 6C1.86 8.67 4.5 10.5 7.5 10.5C10.5 10.5 13.14 8.67 15 6C13.14 3.33 10.5 1.5 7.5 1.5ZM7.5 9C6.12 9 5 7.88 5 6.5C5 5.12 6.12 4 7.5 4C8.88 4 10 5.12 10 6.5C10 7.88 8.88 9 7.5 9ZM7.5 5.5C6.95 5.5 6.5 5.95 6.5 6.5C6.5 7.05 6.95 7.5 7.5 7.5C8.05 7.5 8.5 7.05 8.5 6.5C8.5 5.95 8.05 5.5 7.5 5.5Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </header>
          <main className="content-wrapper">
            <div className="intro-section">
              <div className="card-image-container">
                <div className="card-image-wrapper">
                  <Image
                    src="/images/hero-couples.png"
                    alt="Couples enjoying time together"
                    fill
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center 25%" }}
                    sizes="(max-width: 768px) 100vw, 430px"
                  />
                </div>
              </div>
              <h1>Pairsy</h1>
              <p>
                Connect with other couples for double dates and new friendships!
              </p>

              <div className="cta-buttons">
                <Link href="/signup" className="btn btn-connect">
                  Sign Up as a Couple
                </Link>
                <Link href="/login" className="btn btn-skip">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="features-section">
              <div className="feature">
                <div className="feature-icon">👥</div>
                <div className="feature-text">
                  <h3>Meet Couples</h3>
                  <p>Find other couples with similar interests in your area</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">🗓️</div>
                <div className="feature-text">
                  <h3>Plan Activities</h3>
                  <p>Discover fun activities to do together</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">💬</div>
                <div className="feature-text">
                  <h3>Stay Connected</h3>
                  <p>Chat with your matches and make plans</p>
                </div>
              </div>
            </div>
          </main>

          {/* Bottom navigation */}
          <div className="dashboard-nav">
            <div className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Home</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">🔍</span>
              <span className="nav-label">Explore</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-label">Messages</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👤</span>
              <span className="nav-label">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
