export default function InfoStrip() {
  const Item = ({ title, desc }: { title: string; desc: string }) => (
    <div className="card p-5 text-center card-holographic">
      <div className="section-title font-heading mb-2">{title}</div>
      <div className="text-sm text-neon-cyan/70 leading-relaxed">{desc}</div>
    </div>
  );
  return (
    <div className="container-grid grid md:grid-cols-3 gap-4 mt-8 mb-8">
      <Item 
        title="Neural Signal Scan" 
        desc="AI-powered signal detection every 3 seconds. Real-time network monitoring via Protocol 402." 
      />
      <Item 
        title="Auto-Streamed Energy" 
        desc="Signals flow directly to your neural address through Synapse402 — no claims, no waiting. Instant transmission." 
      />
      <Item 
        title="On-Chain Transparency" 
        desc="Every signal verified, every transmission traceable. Complete network visibility on Layer 402." 
      />
    </div>
  );
}
