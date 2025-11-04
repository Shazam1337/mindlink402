"use client";

interface VaultOfEnergyProps {
  totalEssence: number;
  onExtract?: () => void;
}

export default function VaultOfEnergy({ totalEssence, onExtract }: VaultOfEnergyProps) {
  return (
    <div className="card card-holographic p-6 relative overflow-hidden">
      <div className="section-title mb-4">Vault of Energy</div>
      
      {/* Crystalline energy core */}
      <div className="relative flex items-center justify-center my-8">
        <div className="relative w-32 h-32">
          {/* Outer pulsing rings - golden */}
          <div className="absolute inset-0 rounded-full border-2 border-mythos-gold/40 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 rounded-full border border-mythos-purple/40 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          
          {/* Crystalline structure - hexagonal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 relative"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(199, 125, 255, 0.3))',
                border: '2px solid rgba(255, 215, 0, 0.5)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading text-2xl font-bold text-mythos-gold myth-glow">
                    {totalEssence.toFixed(2)}
                  </div>
                  <div className="text-xs text-mythos-gold/60 uppercase tracking-wider mt-1">ESSENCE</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Energy particles - golden */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 60;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-mythos-gold"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
                  animation: `essence-orbit-${i} 5s linear infinite`,
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)'
                }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Status indicators */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="badge-dot">
          <span className="size-2 rounded-full bg-mythos-gold animate-pulse" style={{ boxShadow: '0 0 6px rgba(255, 215, 0, 0.9)' }}></span>
          Essence Synced
        </div>
        <div className="text-mythos-purple/70 text-xs">Reality Active</div>
      </div>
      
      {/* Extract button */}
      <button
        onClick={onExtract}
        className="btn-ritual w-full text-sm"
      >
        Extract Essence
      </button>
      
      <style jsx>{`
        ${[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 60;
          return `
            @keyframes essence-orbit-${i} {
              0% {
                transform: translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px) rotate(0deg);
                opacity: 1;
              }
              50% {
                opacity: 0.6;
              }
              100% {
                transform: translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px) rotate(360deg);
                opacity: 1;
              }
            }
          `;
        }).join('')}
      `}</style>
    </div>
  );
}

