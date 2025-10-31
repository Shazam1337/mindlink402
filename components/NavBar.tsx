"use client";
import { useEffect, useState } from "react";

function shorten(pubkey: string) {
  return pubkey.slice(0, 4) + "…" + pubkey.slice(-4);
}

export default function NavBar() {
  const [address, setAddress] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const provider: any = (window as any).solana;
    if (!provider) return;
    const handleConnect = (pk: any) => setAddress(String(pk?.publicKey ?? pk));
    const handleDisconnect = () => setAddress(null);
    provider?.on?.("connect", handleConnect);
    provider?.on?.("disconnect", handleDisconnect);
    return () => {
      provider?.off?.("connect", handleConnect);
      provider?.off?.("disconnect", handleDisconnect);
    };
  }, []);

  async function onConnectClick() {
    const provider: any = (window as any).solana;
    if (!provider || !provider.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      const res = await provider.connect();
      const pk = String(res?.publicKey ?? provider.publicKey ?? "");
      if (pk) setAddress(pk);
    } catch (e) {
      // silently ignore user rejection
    }
  }

  async function onDisconnectClick() {
    const provider: any = (window as any).solana;
    try { await provider?.disconnect?.(); } catch {}
    setAddress(null);
  }
  return (
    <header className="bg-white border-b border-black/10 shadow-sm">
      <div className="container-grid flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <a
            href={process.env.NEXT_PUBLIC_TWITTER_URL ?? "https://x.com/Pulse402_xyz"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-black text-white grid place-items-center"
            aria-label="Open Twitter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M18.244 2H21.5l-7.5 8.57L23 22h-6.23l-4.87-6.35L6.33 22H3.07l8.03-9.17L1 2h6.36l4.4 5.8L18.24 2Zm-1.09 18h1.69L7.93 4h-1.7l10.93 16Z"/>
            </svg>
          </a>
          <div className="leading-tight">
            <div className="font-semibold text-[21px]">Pulse402</div>
            <div className="text-[16px] text-black/60">COMMUNITY</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight">Pulse402 Dashboard</div>
          <div className="badge-dot justify-center">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Raid $Pulse402 and get rewarded
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="chip">
            <span className="inline-block size-2 rounded-full bg-emerald-500 mr-2 align-middle animate-pulse"></span>
            System Online
          </div>
          {address ? (
            <button onClick={onDisconnectClick} className="px-3 py-1 rounded-full bg-ink text-white text-sm hover:opacity-90">
              {shorten(address)} · Disconnect
            </button>
          ) : (
            <button onClick={onConnectClick} className="px-3 py-1 rounded-full bg-ink text-white text-sm hover:opacity-90">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}


