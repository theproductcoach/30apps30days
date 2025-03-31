"use client";

import Image from "next/image";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  return (
    <div className="app-container homepage">
      {/* Phone Container */}
      <div className="phone-container">
        <div className="main-content">
          <StatusBar />
          <main className="content-wrapper">
            <div className="intro-section">
              <div className="logo-container">
                <Image
                  src="/pairsy-icon.png"
                  alt="Pairsy"
                  width={70}
                  height={70}
                  className="homepage-logo"
                />
                <h1>Pairsy</h1>
              </div>
              <p>
                Connect with other couples for double dates and new friendships!
              </p>

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

              <div
                className="cta-buttons"
                style={{ flexDirection: "column", alignItems: "stretch" }}
              >
                <Link href="/signup" className="btn btn-connect">
                  Sign Up as a Couple
                </Link>
                <Link href="/login" className="btn btn-skip">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="features-section">
              <Link href="/features/meet-couples" className="feature">
                <div className="feature-icon">👥</div>
                <div className="feature-text">
                  <h3>Meet Couples</h3>
                  <p>Find other couples with similar interests in your area</p>
                </div>
              </Link>

              <Link href="/features/plan-activities" className="feature">
                <div className="feature-icon">🗓️</div>
                <div className="feature-text">
                  <h3>Plan Activities</h3>
                  <p>Discover fun activities to do together</p>
                </div>
              </Link>

              <Link href="/features/stay-connected" className="feature">
                <div className="feature-icon">💬</div>
                <div className="feature-text">
                  <h3>Stay Connected</h3>
                  <p>Chat with your matches and make plans</p>
                </div>
              </Link>

              <Link
                href="/features/for-businesses"
                className="feature for-business"
              >
                <div className="feature-icon">💼</div>
                <div className="feature-text">
                  <h3>For Businesses</h3>
                  <p>List your activities on our platform</p>
                </div>
              </Link>
            </div>
          </main>

          {/* Bottom navigation */}
          <BottomNavigation activePath="/" />
        </div>
      </div>
    </div>
  );
}
