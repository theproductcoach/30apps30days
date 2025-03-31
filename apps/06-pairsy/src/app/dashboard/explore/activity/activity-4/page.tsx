"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function RedirectToHikingTrip() {
  useEffect(() => {
    redirect("/features/activities/hiking-trip");
  }, []);

  return <div>Redirecting to Hiking Trip...</div>;
}
