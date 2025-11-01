export default function Heading() {
  return (
    <div className="container-grid py-6">
      <div className="text-center space-y-3">
        <div className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neon-light neon-glow-strong">
          The Neural Network of the Community
        </div>
        <div className="badge-dot justify-center text-base">
          <span className="size-3 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 12px rgba(0, 229, 255, 1)' }}></span>
          Each user is a neuron, transmitting signals across the synapse • Protocol 402
        </div>
      </div>
    </div>
  );
}

