"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function RedirectToWineTasting() {
  useEffect(() => {
    redirect("/features/activities/wine-tasting");
  }, []);

  return <div>Redirecting to Wine Tasting...</div>;
}
