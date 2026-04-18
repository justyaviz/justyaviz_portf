import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`aspect-square flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Modern Geometric Y */}
        <path d="M25 25 L48 62 L38 72 L15 35 Z" />
        <path d="M85 25 L50 85 L38 85 L73 25 Z" />
      </svg>
    </div>
  );
};
