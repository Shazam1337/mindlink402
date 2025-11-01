import { Raid } from "@/lib/mock";

type Props = { items: Raid[] };

function getProgress(r: Raid): number {
  const duPulse402nMs = 9000; // 3x slower visual progress
  const elapsed = Date.now() - r.ts;
  const pct = Math.max(0, Math.min(100, Math.round((elapsed / duPulse402nMs) * 100)));
  return pct;
}

export default function Pending({ items }: Props) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title font-heading">In Transfer</h3>
        <span className="text-[10px] px-2 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-neon-purple font-medium">Live</span>
      </div>
      {items.length === 0 ? (
        <div className="h-[140px] grid place-items-center text-neon-cyan/60">
          <div className="text-center">
            <div className="text-2xl mb-2">✓</div>
            <div className="font-heading text-neon-light">All signals processed!</div>
          </div>
        </div>
      ) : (
        <ul className="space-y-3 max-h-[280px] overflow-auto pr-1">
          {items.map(r => {
            const pct = getProgress(r);
            return (
              <li key={r.id} className="border border-neon-purple/20 rounded-lg px-4 py-3 hover:border-neon-purple/40 transition-all">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-neon-light flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"></span>
                    {r.user}
                  </span>
                  <span className="font-mono text-neon-purple font-semibold">{r.sol} SOL</span>
                </div>
                <div className="relative h-2 w-full bg-dark-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-purple/60 to-neon-cyan/60 transition-all duration-300 rounded-full"
                    style={{ width: pct + "%" }}
                  />
                </div>
                <div className="mt-1 text-xs text-neon-cyan/50 font-mono">{pct}% transmitted</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


