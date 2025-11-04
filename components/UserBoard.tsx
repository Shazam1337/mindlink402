"use client";

export interface NeuralUser {
  id: string;
  username: string;
  linkId: string;
  level: number;
  xp: number;
  energy: number;
  signals: number;
  rank: number;
}

interface UserBoardProps {
  users: NeuralUser[];
  currentUserId?: string;
}

export default function UserBoard({ users, currentUserId }: UserBoardProps) {
  const getRankGlow = (rank: number) => {
    if (rank === 1) return { boxShadow: '0 0 20px rgba(255, 179, 0, 0.6)' };
    if (rank === 2) return { boxShadow: '0 0 15px rgba(0, 250, 255, 0.5)' };
    if (rank === 3) return { boxShadow: '0 0 15px rgba(154, 79, 255, 0.5)' };
    return {};
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-neon-amber border-neon-amber/40 bg-neon-amber/10";
    if (rank === 2) return "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10";
    if (rank === 3) return "text-neon-violet border-neon-violet/40 bg-neon-violet/10";
    return "text-neon-cyan/80 border-neon-cyan/20 bg-neon-cyan/5";
  };

  return (
    <div className="card p-6">
      <div className="section-title mb-4">Neural Leaderboard</div>
      
      <div className="space-y-3">
        {users.length === 0 ? (
          <div className="text-center py-8 text-neon-cyan/50 text-sm">
            No active neurons
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                user.id === currentUserId ? "ring-2 ring-neon-cyan/50" : ""
              } ${getRankColor(user.rank)}`}
              style={getRankGlow(user.rank)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Rank badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-current/20 border border-current/40 flex items-center justify-center font-heading font-bold text-sm">
                    {user.rank}
                  </div>
                  
                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-sm truncate">
                      {user.username}
                    </div>
                    <div className="text-xs text-current/60 truncate">
                      {user.linkId}
                    </div>
                  </div>
                </div>
                
                {/* Level indicator with pulsing orbit */}
                <div className="relative flex-shrink-0">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-current/30 animate-pulse" style={{ animationDuration: '2s' }}></div>
                    <div className="absolute inset-0 rounded-full bg-current/10 border border-current/40 flex items-center justify-center">
                      <span className="font-heading font-bold text-sm">{user.level}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                <div className="text-center">
                  <div className="text-current/70">XP</div>
                  <div className="font-heading font-bold">{user.xp}</div>
                </div>
                <div className="text-center">
                  <div className="text-current/70">Energy</div>
                  <div className="font-heading font-bold">{user.energy.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-current/70">Signals</div>
                  <div className="font-heading font-bold">{user.signals}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

