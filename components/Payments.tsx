import { Payment } from "@/lib/mock";

export default function Payments({ items }: { items: Payment[] }) {
  return (
    <div className="card p-5">
      <h3 className="section-title font-heading mb-4">Signal Delivered</h3>
      {items.length === 0 ? (
        <div className="h-[160px] grid place-items-center text-neon-cyan/50">
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-sm font-heading">No signals delivered</div>
          <div className="text-xs muted mt-1">Waiting for transmission... • Synapse402</div>
        </div>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[320px] overflow-auto pr-1">
          {items.map(p => (
            <li 
              key={p.id} 
              className="flex items-center justify-between border border-neon-cyan/20 rounded-lg px-3 py-2.5 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 transition-all group"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                <span className="text-sm text-neon-light group-hover:text-neon-cyan transition-colors truncate">@{p.to}</span>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <div className="text-xs text-neon-cyan/50 font-mono hidden sm:block">
                  {new Date(p.ts).toLocaleTimeString()}
                </div>
                <div className="font-mono text-neon-cyan font-semibold neon-glow">
                  {p.amount} SOL
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
