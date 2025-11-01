"use client";

export default function SynapseLogo({ size = 48, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))', ...style }}
    >
      {/* Neural network nodes */}
      <circle cx="20" cy="20" r="4" fill="#00E5FF" className="animate-pulse" />
      <circle cx="50" cy="15" r="4" fill="#00E5FF" />
      <circle cx="80" cy="25" r="4" fill="#9C27FF" />
      
      <circle cx="25" cy="50" r="4" fill="#00E5FF" />
      <circle cx="50" cy="50" r="6" fill="#00E5FF" opacity="0.9">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="75" cy="50" r="4" fill="#9C27FF" />
      
      <circle cx="20" cy="80" r="4" fill="#9C27FF" />
      <circle cx="50" cy="85" r="4" fill="#00E5FF" />
      <circle cx="80" cy="75" r="4" fill="#00E5FF" />

      {/* Connecting lines forming S pattern */}
      <line x1="20" y1="20" x2="50" y2="15" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="50" y1="15" x2="80" y2="25" stroke="#9C27FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="80" y1="25" x2="75" y2="50" stroke="#9C27FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="75" y1="50" x2="50" y2="50" stroke="#00E5FF" strokeWidth="2" opacity="0.8" />
      <line x1="50" y1="50" x2="25" y2="50" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="25" y1="50" x2="20" y2="80" stroke="#9C27FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="80" x2="50" y2="85" stroke="#9C27FF" strokeWidth="1.5" opacity="0.6" />
      <line x1="50" y1="85" x2="80" y2="75" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
      
      {/* Additional neural connections */}
      <line x1="50" y1="15" x2="25" y2="50" stroke="#00E5FF" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
      <line x1="75" y1="50" x2="50" y2="85" stroke="#9C27FF" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
    </svg>
  );
}

