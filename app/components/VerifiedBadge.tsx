import React from 'react';

interface VerifiedBadgeProps {
  className?: string;
}

export default function VerifiedBadge({ className = '' }: VerifiedBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 bg-[#3C5A51] text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm tracking-wide ${className}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* White starburst seal */}
        <path d="M12 1L15.1 4.1L19.5 4.3L20.2 8.7L23.3 12L20.2 15.3L19.5 19.7L15.1 19.9L12 23L8.9 19.9L4.5 19.7L3.8 15.3L0.7 12L3.8 8.7L4.5 4.3L8.9 4.1L12 1Z" fill="white"/>
        {/* Green checkmark matching background */}
        <path d="M8 12.5L11 15.5L16 9" stroke="#3C5A51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Verified</span>
    </div>
  );
}
