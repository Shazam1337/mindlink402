import { Payment } from "@/lib/mock";

export default function Payments({ items }: { items: Payment[] }) {
  return (
    <div className="card p-4">
      <h3 className="section-title mb-2">Recent Payouts</h3>
      {items.length === 0 ? (
        <div className="h-[160px] grid place-items-center text-black/50">
          <div className="text-center">
            <div className="text-2xl mb-1">📄</div>
            <div className="text-sm">No transactions yet</div>
          </div>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[320px] overflow-auto pr-1">
          {items.map(p => (
            <li key={p.id} className="flex items-center justify-between border border-black/5 rounded-lg px-3 py-2">
              <div className="text-sm">@{p.to}</div>
              <div className="text-xs text-black/60">{new Date(p.ts).toLocaleTimeString()}</div>
              <div className="font-mono text-emerald-600 font-semibold">{p.amount} SOL</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
