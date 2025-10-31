import { Raid } from "@/lib/mock";

export default function RecentRaids({ items }: { items: Raid[] }) {
  return (
    <div className="card p-4 min-h-[320px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="section-title">Live Pulse Stream</h3>
        <span className="badge-dot"><span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>Real-time</span>
      </div>
      {items.length === 0 ? (
        <div className="h-[160px] grid place-items-center text-black/50">
          <div className="text-center">
            <div className="text-3xl mb-2">💬</div>
            <div className="font-medium">No Raids Yet</div>
            <div className="text-xs muted">Tweet about the token to get paid!</div>
          </div>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[420px] overflow-auto pr-1">
          {items.map(r => (
            <li key={r.id} className="flex items-center justify-between border border-black/5 rounded-lg px-3 py-2">
              <div className="space-y-0.5">
                <a href={r.tweetUrl} target="_blank" className="font-medium hover:underline">
                  {r.user}
                </a>
                <div className="text-xs text-black/60">
                  {new Date(r.ts).toLocaleTimeString()} • {r.tweetUrl.slice(8, 32)}…
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-emerald-600 font-semibold">{r.sol} SOL</span>
                <span className={`text-xs px-2 py-1 rounded-full border
                  ${r.status === "pending" ? "bg-yellow-50 border-yellow-200 text-yellow-700" :
                    r.status === "verified" ? "bg-blue-50 border-blue-200 text-blue-700" :
                      "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                  {r.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
