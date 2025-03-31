"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function RedirectToMovieNight() {
  useEffect(() => {
    redirect("/features/activities/movie-night");
  }, []);

  return <div>Redirecting to Movie Night...</div>;
}
