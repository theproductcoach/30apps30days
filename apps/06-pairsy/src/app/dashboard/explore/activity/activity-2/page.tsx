"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function RedirectToCookingClass() {
  useEffect(() => {
    redirect("/features/activities/cooking-class");
  }, []);

  return <div>Redirecting to Cooking Class...</div>;
}
