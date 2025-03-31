"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface StatusBarProps {
  title?: string;
}

export default function StatusBar({ title }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Format as 12-hour time (e.g., 9:41)
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes}`);
    };

    // Update immediately and then every minute
    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="status-bar">
      <div className="status-left">
        <span className="status-time">{currentTime}</span>
      </div>
      {title ? (
        <div className="status-center">{title}</div>
      ) : (
        <div className="status-center status-logo">
          <Image
            src="/pairsy-icon.png"
            alt="Pairsy"
            width={24}
            height={24}
            className="pairsy-logo"
          />
        </div>
      )}
      <div className="status-right">
        <div className="status-icon">
          <svg
            width="17"
            height="10"
            viewBox="0 0 17 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 0H14C14.5523 0 15 0.447715 15 1V9C15 9.55229 14.5523 10 14 10H1C0.447715 10 0 9.55229 0 9V1C0 0.447715 0.447715 0 1 0ZM1.5 1.5V8.5H13.5V1.5H1.5Z"
              fill="black"
            />
            <path d="M16 3.5H15V6.5H16V3.5Z" fill="black" />
          </svg>
        </div>
        <div className="status-icon">
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 1.5C4.5 1.5 1.86 3.33 0 6C1.86 8.67 4.5 10.5 7.5 10.5C10.5 10.5 13.14 8.67 15 6C13.14 3.33 10.5 1.5 7.5 1.5ZM7.5 9C6.12 9 5 7.88 5 6.5C5 5.12 6.12 4 7.5 4C8.88 4 10 5.12 10 6.5C10 7.88 8.88 9 7.5 9ZM7.5 5.5C6.95 5.5 6.5 5.95 6.5 6.5C6.5 7.05 6.95 7.5 7.5 7.5C8.05 7.5 8.5 7.05 8.5 6.5C8.5 5.95 8.05 5.5 7.5 5.5Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
