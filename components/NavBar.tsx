"use client";
import { useEffect, useState } from "react";
import MythosLogo from "./MythosLogo";

function shorten(pubkey: string) {
  return pubkey.slice(0, 4) + "…" + pubkey.slice(-4);
}

export default function NavBar() {
  const [address, setAddress] = useState<string | null>(null);

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
    <header className="bg-gradient-to-r from-dark-secondary/90 to-dark-primary/90 backdrop-blur-md border-b border-mythos-gold/40 shadow-lg">
      <div className="container-grid flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <MythosLogo size={40} className="animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="leading-tight">
              <div className="font-heading font-bold text-[21px] text-mythos-gold myth-glow">MYTHOS402</div>
              <div className="text-[12px] text-mythos-gold/60 uppercase tracking-wider">The Reality Protocol • Construct. Merge. Transcend</div>
            </div>
        </div>
        <div className="text-center hidden md:block">
          <div className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-mythos-light myth-glow">
            The Realm
          </div>
          <div className="badge-dot justify-center mt-1">
            <span className="size-2 rounded-full bg-mythos-gold animate-pulse" style={{ boxShadow: '0 0 8px rgba(255, 215, 0, 1)' }}></span>
            Reality Active
          </div>
        </div>
        <div className="flex items-center gap-3">
          {address ? (
            <button 
              onClick={onDisconnectClick} 
              className="px-4 py-2 rounded-lg bg-mythos-gold/20 border border-mythos-gold/40 text-mythos-gold text-sm font-medium hover:bg-mythos-gold/30 hover:border-mythos-gold/60 transition-all"
            >
              {shorten(address)} · Disconnect
            </button>
          ) : (
            <button 
              onClick={onConnectClick} 
              className="btn-ritual text-sm"
            >
              Enter the Realm
            </button>
          )}
          <a
            href="https://x.com/mythos402"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-mythos-gold/10 border border-mythos-gold/30 grid place-items-center hover:bg-mythos-gold/20 transition-colors"
            aria-label="Open X (Twitter)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-mythos-gold">
              <path fill="currentColor" d="M18.244 2H21.5l-7.5 8.57L23 22h-6.23l-4.87-6.35L6.33 22H3.07l8.03-9.17L1 2h6.36l4.4 5.8L18.24 2Zm-1.09 18h1.69L7.93 4h-1.7l10.93 16Z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}


