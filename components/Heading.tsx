export default function Heading() {
  return (
    <div className="container-grid py-6">
      <div className="text-center space-y-3">
        <div className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-mythos-light myth-glow-strong">
          Construct. Merge. Transcend.
        </div>
        <div className="badge-dot justify-center text-base">
          <span className="size-3 rounded-full bg-mythos-gold animate-pulse" style={{ boxShadow: '0 0 12px rgba(255, 215, 0, 1)' }}></span>
          Each user forges a reality fragment. Together, they form the Mythos.
        </div>
      </div>
    </div>
  );
}

