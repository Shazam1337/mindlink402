export default function InfoStrip() {
  const Item = ({ title, desc }: { title: string; desc: string }) => (
    <div className="card p-4 text-center">
      <div className="section-title mb-1">{title}</div>
      <div className="text-sm text-black/60">{desc}</div>
    </div>
  );
  return (
    <div className="container-grid grid md:grid-cols-3 gap-4 mt-6">
      <Item title="Live Pulse Scan" desc="AI-powered tweet scanning every 5 minute" />
      <Item title="Auto-Streamed Rewards by 402" desc="Rewards flow directly to your Solana wallet — no claims, no waiting" />
      <Item title="On-Chain Transparency" desc="Every action verified, every payout traceable" />
    </div>
  );
}
