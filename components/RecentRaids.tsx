import { Raid } from "@/lib/mock";

export default function RecentRaids({ items }: { items: Raid[] }) {
  const getStatusText = (status: string) => {
    if (status === "pending") return "In Transfer";
    if (status === "verified") return "Processing";
    return "Signal Delivered";
  };

  const getStatusClass = (status: string) => {
    if (status === "pending") return "bg-neon-purple/20 border-neon-purple/40 text-neon-purple";
    if (status === "verified") return "bg-neon-cyan/20 border-neon-cyan/40 text-neon-cyan";
    return "bg-green-500/20 border-green-500/40 text-green-400";
  };

  return (
    <div className="card p-5 min-h-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title font-heading">Signal Stream</h3>
        <span className="badge-dot">
          <span className="size-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)' }}></span>
          Real-time
        </span>
      </div>
      {items.length === 0 ? (
        <div className="h-[160px] grid place-items-center text-neon-cyan/50">
        <div className="text-center">
          <div className="text-4xl mb-3">⚡</div>
          <div className="font-heading font-medium text-neon-light">No Signals Yet</div>
          <div className="text-xs muted mt-1">Transmit a signal to join the network • Protocol 402</div>
        </div>
        </div>
      ) : (
        <ul className="space-y-3 max-h-[420px] overflow-auto pr-1">
          {items.map(r => (
            <li 
              key={r.id} 
              className="card-holographic border border-neon-cyan/20 rounded-lg px-4 py-3 hover:border-neon-cyan/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1.5 flex-1">
                  <a 
                    href={r.tweetUrl} 
                    target="_blank" 
                    className="font-medium text-neon-light hover:text-neon-cyan transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
                    {r.user}
                  </a>
                  <div className="text-xs text-neon-cyan/60 font-mono">
                    {new Date(r.ts).toLocaleTimeString()} • {r.tweetUrl.slice(8, 32)}…
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm font-mono text-neon-cyan font-semibold neon-glow">
                    {r.sol} SOL
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusClass(r.status)}`}>
                    {getStatusText(r.status)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
