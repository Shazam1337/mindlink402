"use client";

interface VaultSphereProps {
  totalSol: number;
  onEnergyPulse?: () => void;
}

export default function VaultSphere({ totalSol, onEnergyPulse }: VaultSphereProps) {
  return (
    <div className="card card-holographic p-6 relative overflow-hidden">
      <div className="section-title mb-4">Vault Sphere</div>
      
      {/* Central energy core */}
      <div className="relative flex items-center justify-center my-8">
        <div className="relative w-32 h-32">
          {/* Outer pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/30 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 rounded-full border border-neon-violet/30 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          
          {/* Main sphere */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 via-neon-violet/20 to-neon-amber/20 backdrop-blur-sm border-2 border-neon-cyan/40 flex items-center justify-center">
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-neon-cyan neon-glow">
                {totalSol.toFixed(2)}
              </div>
              <div className="text-xs text-neon-cyan/60 uppercase tracking-wider mt-1">SOL</div>
            </div>
          </div>
          
          {/* Energy particles */}
          {[...Array(6)].map((_, i) => {
            const rotation = i * 60;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-neon-cyan"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-70px)`,
                  animation: `energy-orbit-${i} 4s linear infinite`,
                  animationDelay: `${i * 0.3}s`,
                  boxShadow: '0 0 8px rgba(0, 250, 255, 0.8)',
                  '--rotation': `${rotation}deg`,
                } as React.CSSProperties & { '--rotation': string }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Status indicators */}
      <div className="flex items-center justify-between text-sm">
        <div className="badge-dot">
          <span className="size-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 6px rgba(0, 250, 255, 0.8)' }}></span>
          Energy Synced
        </div>
        <div className="text-neon-violet/70 text-xs">Network Active</div>
      </div>
      
      <style jsx>{`
        ${[...Array(6)].map((_, i) => {
          const rotation = i * 60;
          return `
            @keyframes energy-orbit-${i} {
              0% {
                transform: translate(-50%, -50%) rotate(${rotation}deg) translateY(-70px) rotate(0deg);
                opacity: 1;
              }
              50% {
                opacity: 0.6;
              }
              100% {
                transform: translate(-50%, -50%) rotate(${rotation}deg) translateY(-70px) rotate(360deg);
                opacity: 1;
              }
            }
          `;
        }).join('')}
      `}</style>
    </div>
  );
}

