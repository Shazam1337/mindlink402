export default function Heading() {
  return (
    <div className="container-grid">
      <div className="flex items-center justify-between py-4">
        {/* Left: brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-xs font-bold">X</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Pulse402 COIN</div>
            <div className="text-[11px] text-black/60">COMMUNITY</div>
          </div>
        </div>

        {/* Center: title */}
        <div className="text-center">
          <div className="text-3xl sm:text-4xl font-bold tracking-tight">Pulse402 Dashboard</div>
          <div className="badge-dot justify-center">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Raid, $Pulse402 and get rewarded
          </div>
        </div>

        {/* Right: chips */}
        <div className="flex items-center gap-3">
          <div className="chip">
            <span className="inline-block size-2 rounded-full bg-emerald-500 mr-2 align-middle animate-pulse"></span>
            System Online
          </div>
        </div>
      </div>
    </div>
  );
}

