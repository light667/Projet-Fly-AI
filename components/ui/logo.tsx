import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse"
      >
        {/* Main Golden Circle / Sun of Future */}
        <circle cx="50" cy="50" r="42" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="6 3" />
        
        {/* Academic cap top chevron */}
        <path
          d="M50 22 L82 35 L50 48 L18 35 Z"
          fill="url(#goldGradient)"
          opacity="0.9"
        />
        
        {/* Academic cap body and tassel */}
        <path
          d="M32 41 V56 C32 64, 68 64, 68 56 V41"
          stroke="url(#blueGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M82 35 V52 L84 55"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Soaring Wings of Scholar Flight */}
        <path
          d="M15 48 C 28 42, 45 45, 50 64 C 55 45, 72 42, 85 48 C 70 65, 55 60, 50 78 C 45 60, 30 65, 15 48 Z"
          fill="url(#blueGradient)"
          fillOpacity="0.8"
        />

        {/* Core Jewel of Intelligence */}
        <polygon
          points="50,42 54,48 50,54 46,48"
          fill="#ffffff"
          className="animate-pulse"
        />

        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0" y1="100" x2="100" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
