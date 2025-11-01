export default function TopRaiders({ top }: { top: { user: string; total: number }[] }) {
  return (
    <div className="card p-5">
      <h3 className="section-title font-heading mb-4">Neural Board</h3>
      {top.length === 0 ? (
        <div className="h-[120px] grid place-items-center text-neon-cyan/50">
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-sm font-heading">No neurons yet</div>
          <div className="text-xs muted mt-1">Join the network • Layer 402</div>
        </div>
        </div>
      ) : (
        <div className="relative">
          {/* Neural network visualization background */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ height: `${top.length * 60}px` }}>
            {top.map((_, i) => {
              if (i === top.length - 1) return null;
              const y1 = i * 60 + 30;
              const y2 = (i + 1) * 60 + 30;
              return (
                <line
                  key={`line-${i}`}
                  x1="20"
                  y1={y1}
                  x2="20"
                  y2={y2}
                  stroke="#00E5FF"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.4"
                />
              );
            })}
          </svg>
          
          <ul className="space-y-3 relative">
            {top.map((t, i) => (
              <li 
                key={t.user} 
                className="flex items-center gap-3 group relative"
              >
                {/* Neural node */}
                <div className="relative neural-node flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30 border-2 border-neon-cyan/50 flex items-center justify-center font-heading font-bold text-neon-cyan text-xs">
                    {i + 1}
                  </div>
                </div>
                
                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-neon-light group-hover:text-neon-cyan transition-colors truncate">
                    {t.user}
                  </div>
                  <div className="text-xs text-neon-cyan/50 font-mono">
                    Node #{String(i + 1).padStart(3, '0')} • Protocol 402
                  </div>
                </div>
                
                {/* Energy value */}
                <div className="text-right">
                  <span className="font-mono font-semibold text-neon-cyan neon-glow">
                    {t.total.toFixed(3)}
                  </span>
                  <div className="text-xs text-neon-cyan/50">SOL</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
