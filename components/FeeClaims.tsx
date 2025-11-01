export default function FeeClaims({ totalSol }: { totalSol: number }) {
  return (
    <div className="card p-5 relative overflow-hidden">
      <h3 className="section-title font-heading mb-4">Synapse Vault</h3>
      
      {/* Pulsing Energy Core */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-24 h-24">
          {/* Outer pulsing rings */}
          <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/30 animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-2 rounded-full border-2 border-neon-purple/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
          
          {/* Core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neon-cyan/40 to-neon-purple/40 backdrop-blur-sm flex items-center justify-center animate-pulse">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/60 via-neon-purple/40 to-neon-cyan/20"></div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-neon-cyan">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8" />
                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className="text-3xl font-heading font-bold text-neon-cyan neon-glow-strong">
          {totalSol.toFixed(6)} SOL
        </div>
        <div className="text-xs text-neon-cyan/60 uppercase tracking-wider">Energy Core • Vault 402</div>
      </div>

      <div className="mt-5 pt-4 border-t border-neon-cyan/20 text-center">
        <div className="text-xs text-neon-cyan/70 font-mono">
          Signals Delivered: <span className="text-neon-cyan font-semibold">{Math.floor(totalSol * 2000).toLocaleString()}</span>
        </div>
        <div className="text-xs text-neon-cyan/50 mt-2">Protocol 402 Active</div>
      </div>

      {totalSol === 0 && (
        <div className="mt-4 pt-3 text-center text-xs text-neon-cyan/50 border-t border-neon-cyan/10">
          Core initializing...
        </div>
      )}
    </div>
  );
}
