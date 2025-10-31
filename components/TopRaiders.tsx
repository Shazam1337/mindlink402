export default function TopRaiders({ top }: { top: { user: string; total: number }[] }) {
  return (
    <div className="card p-4">
      <h3 className="section-title mb-2">Top Earner</h3>
      {top.length === 0 ? (
        <div className="h-[120px] grid place-items-center text-black/50">
          <div className="text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-sm">No raiders yet</div>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {top.map((t, i) => (
            <li key={t.user} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 text-center text-sm opacity-60">{i + 1}.</span>
                <span className="font-medium">{t.user}</span>
              </div>
              <span className="font-mono">{t.total} SOL</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
