"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

type NavItem = {
  icon: string;
  label: string;
  path: string;
  requiresAuth: boolean;
};

const navItems: NavItem[] = [
  {
    icon: "🏠",
    label: "Home",
    path: "/",
    requiresAuth: false,
  },
  {
    icon: "🔍",
    label: "Explore",
    path: "/dashboard/explore",
    requiresAuth: true,
  },
  {
    icon: "💬",
    label: "Messages",
    path: "/dashboard/messages",
    requiresAuth: true,
  },
  {
    icon: "👤",
    label: "Profile",
    path: "/dashboard/profile",
    requiresAuth: true,
  },
];

interface BottomNavigationProps {
  activePath?: string;
}

export default function BottomNavigation({ activePath = "/" }: BottomNavigationProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleNavClick = (item: NavItem) => {
    // Check if navigation requires authentication
    if (item.requiresAuth && !user) {
      // Show a toast message
      setToastMessage(`Sign up to access ${item.label}`);
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Redirect directly to signup page
      router.push("/signup");
      return;
    }

    // Special handling for home when user is authenticated
    if (item.label === "Home" && user) {
      router.push("/dashboard");
      return;
    }

    // Regular navigation for non-auth items or when user is authenticated
    router.push(item.path);
  };

  return (
    <>
      <div className="dashboard-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${item.path === activePath ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default navigation
              handleNavClick(item);
            }}
            style={{ border: "none", background: "none" }}
            aria-label={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Toast notification */}
      {showToast && <div className="toast-notification">{toastMessage}</div>}
    </>
  );
}
