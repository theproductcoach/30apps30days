"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Couple } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [coupleData, setCoupleData] = useState<Couple | null>(null);
  const [matchSuggestions, setMatchSuggestions] = useState<Couple[]>([]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch couple data
    const fetchCoupleData = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("couples")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setCoupleData(data as Couple);

        // Fetch match suggestions based on interests
        if (data && data.interests) {
          const { data: matches, error: matchError } = await supabase
            .from("couples")
            .select("*")
            .neq("id", user.id)
            .limit(5);

          if (matchError) {
            throw matchError;
          }

          setMatchSuggestions(matches as Couple[]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupleData();
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="phone-container">
          <div className="main-content">
            <main className="content-wrapper">
              <div className="loading">Loading...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="phone-container">
        <div className="main-content">
          <header className="status-bar">
            <div className="status-left">Pairsy</div>
            <div className="status-right">
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          </header>

          <main className="content-wrapper">
            <div className="dashboard-header">
              <h1>Welcome, {coupleData?.couple_name || "Couple"}!</h1>
              <p className="dashboard-subtitle">Find your next double date</p>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Your Profile</h2>
              <div className="profile-card">
                <div className="profile-info">
                  <div className="profile-name">{coupleData?.couple_name}</div>
                  <div className="profile-partners">
                    {coupleData?.partner1_name} & {coupleData?.partner2_name}
                  </div>
                  <div className="profile-bio">
                    {coupleData?.bio || "No bio yet"}
                  </div>
                </div>
                <div className="profile-interests">
                  {coupleData?.interests?.map((interest, idx) => (
                    <span key={idx} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
                <Link
                  href="/dashboard/edit-profile"
                  className="edit-profile-link"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Suggested Matches</h2>
              {matchSuggestions.length > 0 ? (
                <div className="matches-grid">
                  {matchSuggestions.map((match) => (
                    <div key={match.id} className="match-card">
                      <div className="match-avatar"></div>
                      <div className="match-info">
                        <div className="match-name">{match.couple_name}</div>
                        <div className="match-partners">
                          {match.partner1_name} & {match.partner2_name}
                        </div>
                        <div className="match-common-interests">
                          {match.interests
                            ?.filter((i) => coupleData?.interests?.includes(i))
                            .map((interest, idx) => (
                              <span key={idx} className="interest-tag">
                                {interest}
                              </span>
                            ))}
                        </div>
                      </div>
                      <button className="btn btn-connect match-connect-btn">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-matches">
                  <p>No matches available right now. Check back later!</p>
                </div>
              )}
            </div>

            <div className="dashboard-nav">
              <Link href="/dashboard" className="nav-item active">
                <span className="nav-icon">🏠</span>
                <span className="nav-label">Home</span>
              </Link>
              <Link href="/dashboard/explore" className="nav-item">
                <span className="nav-icon">🔍</span>
                <span className="nav-label">Explore</span>
              </Link>
              <Link href="/dashboard/messages" className="nav-item">
                <span className="nav-icon">💬</span>
                <span className="nav-label">Messages</span>
              </Link>
              <Link href="/dashboard/profile" className="nav-item">
                <span className="nav-icon">👤</span>
                <span className="nav-label">Profile</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
