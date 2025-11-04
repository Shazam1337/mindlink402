"use client";
import Image from "next/image";

export default function MythosLogo({ size = 48, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))',
        ...style 
      }}
    >
      <Image
        src="/mythos_logo.png"
        alt="MYTHOS402 Logo"
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

