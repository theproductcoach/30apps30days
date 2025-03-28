"use client";

import {
  IconHome,
  IconToolsKitchen2,
  IconCalendar,
  IconBox,
  IconSettings,
} from "@tabler/icons-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <button className="flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-red-950/30 relative group">
      <div
        className={`${
          active ? "text-red-500" : "text-gray-400 group-hover:text-gray-300"
        } transition-colors duration-200`}
      >
        {icon}
      </div>
      <span
        className={`text-xs ${
          active ? "text-red-500" : "text-gray-400 group-hover:text-gray-300"
        } font-medium transition-colors duration-200`}
      >
        {label}
      </span>
      {active && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
      )}
    </button>
  );
}

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-t from-black via-black/95 to-black/90 border-t border-red-900/30 backdrop-blur-sm">
        <nav className="max-w-[430px] mx-auto flex justify-between items-center px-6 py-4">
          <NavItem
            icon={<IconHome size={24} strokeWidth={1.5} />}
            label="Home"
            active
          />
          <NavItem
            icon={<IconToolsKitchen2 size={24} strokeWidth={1.5} />}
            label="Dinner"
          />
          <NavItem
            icon={<IconCalendar size={24} strokeWidth={1.5} />}
            label="Plan"
          />
          <NavItem
            icon={<IconBox size={24} strokeWidth={1.5} />}
            label="Pantry"
          />
          <NavItem
            icon={<IconSettings size={24} strokeWidth={1.5} />}
            label="Settings"
          />
        </nav>
      </div>
    </div>
  );
}
