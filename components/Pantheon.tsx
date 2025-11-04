"use client";

export interface Archon {
  id: string;
  realmName: string;
  energyEssence: number;
  ascensionLevel: number;
  rank: number;
  artifacts?: string[];
  rune?: string;
}

interface PantheonProps {
  archons: Archon[];
  currentUserId?: string;
}

export default function Pantheon({ archons, currentUserId }: PantheonProps) {
  const getRankGlow = (rank: number) => {
    if (rank === 1) return { boxShadow: '0 0 25px rgba(255, 215, 0, 0.7)' };
    if (rank === 2) return { boxShadow: '0 0 20px rgba(0, 255, 246, 0.6)' };
    if (rank === 3) return { boxShadow: '0 0 20px rgba(199, 125, 255, 0.6)' };
    return {};
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-mythos-gold border-mythos-gold/50 bg-mythos-gold/15";
    if (rank === 2) return "text-mythos-turquoise border-mythos-turquoise/50 bg-mythos-turquoise/15";
    if (rank === 3) return "text-mythos-purple border-mythos-purple/50 bg-mythos-purple/15";
    return "text-mythos-gold/80 border-mythos-gold/30 bg-mythos-gold/10";
  };

  return (
    <div className="card p-6">
      <div className="section-title mb-4">Pantheon of Creators</div>
      
      <div className="space-y-3">
        {archons.length === 0 ? (
          <div className="text-center py-8 text-mythos-gold/50 text-sm">
            No archons in the pantheon
          </div>
        ) : (
          archons.map((archon) => (
            <div
              key={archon.id}
              className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                archon.id === currentUserId ? "ring-2 ring-mythos-gold/50" : ""
              } ${getRankColor(archon.rank)}`}
              style={getRankGlow(archon.rank)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Rank badge with rune */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-current/20 border-2 border-current/50 flex items-center justify-center font-heading font-bold text-sm relative">
                    {archon.rune || archon.rank}
                    {archon.rank <= 3 && (
                      <div className="absolute inset-0 rounded-full border border-current/30 animate-pulse" style={{ animationDuration: '2s' }}></div>
                    )}
                  </div>
                  
                  {/* Archon info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-sm truncate">
                      {archon.realmName}
                    </div>
                    <div className="text-xs text-current/60">
                      Archon • Level {archon.ascensionLevel}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div className="text-center p-2 rounded bg-current/10 border border-current/20">
                  <div className="text-current/70">Essence</div>
                  <div className="font-heading font-bold text-base">{archon.energyEssence.toFixed(2)}</div>
                </div>
                <div className="text-center p-2 rounded bg-current/10 border border-current/20">
                  <div className="text-current/70">Ascension</div>
                  <div className="font-heading font-bold text-base">{archon.ascensionLevel}</div>
                </div>
              </div>
              
              {/* Artifacts */}
              {archon.artifacts && archon.artifacts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <div className="text-xs text-current/70 mb-1">Artifacts:</div>
                  <div className="flex flex-wrap gap-1">
                    {archon.artifacts.map((artifact, idx) => (
                      <span key={idx} className="chip text-xs px-2 py-0.5">
                        {artifact}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

