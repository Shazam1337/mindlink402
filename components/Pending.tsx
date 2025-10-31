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
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="section-title">Pending</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700">Live</span>
      </div>
      {items.length === 0 ? (
        <div className="h-[140px] grid place-items-center text-black/60">All payments processed!</div>
      ) : (
        <ul className="space-y-2 max-h-[280px] overflow-auto pr-1">
          {items.map(r => {
            const pct = getProgress(r);
            return (
              <li key={r.id} className="border border-black/5 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{r.user}</span>
                  <span className="font-mono text-emerald-600">{r.sol} SOL</span>
                </div>
                <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400/80" style={{ width: pct + "%" }} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


