"use client";

import { useEffect } from "react";
import { useParams, redirect } from "next/navigation";
import { Suspense } from "react";

// Map of activity IDs to their corresponding paths
const ACTIVITY_PATHS: { [key: string]: string } = {
  "activity-1": "/features/activities/wine-tasting",
  "activity-2": "/features/activities/cooking-class",
  "activity-3": "/features/activities/movie-night",
  "activity-4": "/features/activities/hiking-trip",
};

function ActivityRedirectContent() {
  const params = useParams();
  const activityId = params.id as string;

  useEffect(() => {
    // Check if this activity ID has a corresponding feature page
    if (ACTIVITY_PATHS[activityId]) {
      redirect(ACTIVITY_PATHS[activityId]);
    } else {
      // If not, redirect to the activities page
      redirect("/features/activities");
    }
  }, [activityId]);

  return <div>Redirecting to activity...</div>;
}

// Wrap with Suspense for useParams
export default function ActivityDetail() {
  return (
    <Suspense fallback={<div className="loading">Redirecting...</div>}>
      <ActivityRedirectContent />
    </Suspense>
  );
}
