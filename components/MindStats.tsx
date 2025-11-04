"use client";

interface MindStatsProps {
  walletAddress?: string | null;
  linkId?: string;
  level: number;
  xp: number;
  xpToNext: number;
  signalsSent: number;
  signalsReceived: number;
  energyBalance: number;
}

export default function MindStats({
  walletAddress,
  linkId,
  level,
  xp,
  xpToNext,
  signalsSent,
  signalsReceived,
  energyBalance,
}: MindStatsProps) {
  const xpProgress = (xp / xpToNext) * 100;

  return (
    <div className="card p-6">
      <div className="section-title mb-4">Mind Stats</div>
      
      {!walletAddress ? (
        <div className="text-center py-8">
          <div className="text-neon-cyan/60 text-sm mb-4">
            Connect wallet to view stats
          </div>
          <div className="chip">Link Wallet Required</div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Link ID */}
          <div>
            <div className="text-xs text-neon-cyan/70 mb-2 uppercase tracking-wider">
              Neural Link ID
            </div>
            <div className="font-heading text-lg font-bold text-neon-cyan neon-glow">
              {linkId || `${walletAddress.slice(0, 8)}.mindlink.sol`}
            </div>
          </div>
          
          {/* Level and XP */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-neon-cyan/70 uppercase tracking-wider">
                Cognitive Rank
              </div>
              <div className="font-heading text-xl font-bold text-neon-violet">
                Level {level}
              </div>
            </div>
            
            {/* XP Progress Bar */}
            <div className="relative h-3 bg-neon-cyan/10 rounded-full overflow-hidden border border-neon-cyan/20">
              <div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-violet transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-neon-cyan/80 to-neon-violet/80 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-xs text-neon-cyan font-semibold">
                {xp} / {xpToNext} XP
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20">
              <div className="text-xs text-neon-cyan/70 mb-1">Signals Sent</div>
              <div className="font-heading text-xl font-bold text-neon-cyan">
                {signalsSent}
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-neon-violet/5 border border-neon-violet/20">
              <div className="text-xs text-neon-violet/70 mb-1">Signals Received</div>
              <div className="font-heading text-xl font-bold text-neon-violet">
                {signalsReceived}
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-neon-amber/5 border border-neon-amber/20 col-span-2">
              <div className="text-xs text-neon-amber/70 mb-1">Energy Balance</div>
              <div className="font-heading text-2xl font-bold text-neon-amber">
                {energyBalance.toFixed(4)} SOL
              </div>
            </div>
          </div>
          
          {/* Link Strength Indicator */}
          <div>
            <div className="text-xs text-neon-cyan/70 mb-2 uppercase tracking-wider">
              Link Strength
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    i < Math.floor((level / 10) * 5)
                      ? "bg-neon-cyan"
                      : "bg-neon-cyan/20"
                  }`}
                  style={
                    i < Math.floor((level / 10) * 5)
                      ? { boxShadow: "0 0 8px rgba(0, 250, 255, 0.6)" }
                      : {}
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

