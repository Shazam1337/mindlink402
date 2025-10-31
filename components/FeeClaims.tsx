export default function FeeClaims({ totalSol }: { totalSol: number }) {
  return (
    <div className="card p-4">
      <h3 className="section-title">Creator Vault Balance</h3>
      <div className="mt-3 text-3xl font-semibold text-emerald-600">{totalSol.toFixed(6)} SOL</div>
      <div className="mt-2 text-xs text-black/60">Total claimed from creator vault</div>
      {totalSol === 0 && (
        <div className="mt-4 border-t border-black/10 pt-3 text-center text-sm text-black/60">No fee claims yet</div>
      )}
    </div>
  );
}
