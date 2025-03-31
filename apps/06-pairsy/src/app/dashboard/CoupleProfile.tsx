"use client";

import { useEffect, useState } from "react";
import { Couple } from "@/types/supabase";

// Mock data to replace the authentication-dependent data
const MOCK_PROFILE: Couple = {
  id: "mock-id",
  created_at: new Date().toISOString(),
  email: "couple@example.com",
  couple_name: "The Adventurers",
  partner1_name: "Will",
  partner2_name: "Bri",
  bio: "We love hiking and exploring new places together!",
  interests: ["hikes", "travel", "cooking", "movies"],
};

export default function CoupleProfileDisplay() {
  const [profile, setProfile] = useState<Couple | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading the profile data
    const timer = setTimeout(() => {
      setProfile(MOCK_PROFILE);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p>No profile found. Please create a profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{profile.couple_name}</h2>

      <div className="mb-4">
        <div className="text-sm text-gray-500">Partners</div>
        <div className="text-lg">
          {profile.partner1_name} & {profile.partner2_name}
        </div>
      </div>

      {profile.bio && (
        <div className="mb-4">
          <div className="text-sm text-gray-500">About Us</div>
          <div className="text-md">{profile.bio}</div>
        </div>
      )}

      {profile.interests && profile.interests.length > 0 && (
        <div className="mb-4">
          <div className="text-sm text-gray-500">Interests</div>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.interests.map((interest: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-6">Contact: {profile.email}</div>
    </div>
  );
}
