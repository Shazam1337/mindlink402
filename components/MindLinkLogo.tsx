"use client";
import Image from "next/image";

export default function MindLinkLogo({ size = 48, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        filter: 'drop-shadow(0 0 10px rgba(0, 250, 255, 0.7))',
        ...style 
      }}
    >
      <Image
        src="/mindlink-logo.png.png"
        alt="MINDLINK402 Logo"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        priority
      />
    </div>
  );
}

