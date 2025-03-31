"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="app-container">
      {/* Phone Container */}
      <div className="phone-container">
        {/* Main Content Scrollable Area */}
        <div className="main-content-no-status">
          <main className="content-wrapper">
            {/* App Logo & Title */}
            <div className="header">
              <h1 className="app-title">Pairsy</h1>
              <p className="app-subtitle">
                Adventures are
                <br />
                better shared.
              </p>
            </div>

            {/* Main Card - Hinge-like Profile Card */}
            <div className="card">
              {/* Image container with fixed aspect ratio */}
              <div className="card-image-container">
                <div className="card-image-wrapper">
                  <Image
                    src="/images/hero-couples.png"
                    alt="Happy couples enjoying outdoor activities"
                    fill
                    sizes="(max-width: 768px) 100vw, 430px"
                    className="object-cover"
                    priority
                  />
                  <div className="image-overlay"></div>
                  <div className="image-text">
                    <h2 className="image-title">Outdoor Adventures</h2>
                    <p className="image-subtitle">
                      Find couples who love hiking and outdoor fun
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <p className="card-text">
                  Pair up with other couples to meet new people and enjoy
                  activities together.
                </p>
                <div className="card-actions">
                  <button className="btn btn-skip">Skip</button>
                  <button className="btn btn-connect">Connect</button>
                </div>
              </div>
            </div>

            {/* Activities Section Heading */}
            <h3 className="section-heading">Popular Activities</h3>

            {/* Activities Cards Grid */}
            <div className="activity-grid">
              <div className="activity-card">
                <div className="activity-icon hikes-bg">
                  <span role="img" aria-label="Hiking">
                    👟
                  </span>
                </div>
                <div className="activity-name">Hikes</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon coffee-bg">
                  <span role="img" aria-label="Coffee">
                    ☕
                  </span>
                </div>
                <div className="activity-name">Coffee</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon brunch-bg">
                  <span role="img" aria-label="Brunch">
                    🍳
                  </span>
                </div>
                <div className="activity-name">Brunch</div>
              </div>

              <div className="activity-card">
                <div className="activity-icon games-bg">
                  <span role="img" aria-label="Games">
                    🎲
                  </span>
                </div>
                <div className="activity-name">Games</div>
              </div>
            </div>
          </main>
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar">
          <div className="nav-item">
            <div className="nav-icon-container">
              <svg
                className="nav-icon nav-active"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </div>
            <span className="nav-text nav-active">Home</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon-container">
              <svg
                className="nav-icon nav-inactive"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="nav-text nav-inactive">Explore</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon-container">
              <svg
                className="nav-icon nav-inactive"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
              </svg>
            </div>
            <span className="nav-text nav-inactive">Messages</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon-container">
              <svg
                className="nav-icon nav-inactive"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="nav-text nav-inactive">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
