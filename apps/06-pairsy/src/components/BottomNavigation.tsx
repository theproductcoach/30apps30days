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
    if (item.requiresAuth && !user) {
      // Show a toast message
      setToastMessage(`Sign in to access ${item.label}`);
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Redirect to login with return URL
      router.push(`/login?returnUrl=${encodeURIComponent(item.path)}`);
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
            onClick={() => handleNavClick(item)}
            style={{ border: 'none', background: 'none' }}
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
