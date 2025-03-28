"use client";

import React from "react";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-red-950 via-black to-black pb-[72px]">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-red-800 to-red-600 px-6 py-5">
        <div className="max-w-[430px] mx-auto flex items-center gap-3">
          <span className="text-white text-3xl">🍽️</span>
          <h1 className="text-white text-2xl font-bold tracking-wide">
            MEALMATE
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 max-w-[430px] mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-3 tracking-tight text-white">
            Welcome to
            <br />
            MealMate
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your personal assistant for meal planning and pantry management.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5">
          <FeatureCard
            icon="📦"
            title="Manage Pantry"
            description="Scan and track your pantry items"
          />
          <FeatureCard
            icon="⚙️"
            title="Set Preferences"
            description="Set your dietary preferences"
          />
          <FeatureCard
            icon="📅"
            title="Weekly Planner"
            description="Plan your meals ahead"
          />
        </div>
      </div>

      <Navbar />
    </div>
  );
}
