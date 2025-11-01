"use client";
import { useEffect, useState } from "react";
import SynapseLogo from "./SynapseLogo";

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
    <header className="bg-gradient-to-r from-dark-secondary/90 to-dark-primary/90 backdrop-blur-md border-b border-neon-cyan/20 shadow-lg">
      <div className="container-grid flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <SynapseLogo size={40} className="animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="leading-tight">
              <div className="font-heading font-bold text-[21px] text-neon-cyan neon-glow">SYNAPSE402</div>
              <div className="text-[12px] text-neon-cyan/60 uppercase tracking-wider">Neural Network • Layer 402</div>
            </div>
        </div>
        <div className="text-center hidden md:block">
          <div className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-neon-light neon-glow">
            Neural Hub
          </div>
          <div className="badge-dot justify-center mt-1">
            <span className="size-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)' }}></span>
            Network Active
          </div>
        </div>
        <div className="flex items-center gap-3">
          {address ? (
            <button 
              onClick={onDisconnectClick} 
              className="px-4 py-2 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/30 hover:border-neon-cyan/60 transition-all"
            >
              {shorten(address)} · Disconnect
            </button>
          ) : (
            <button 
              onClick={onConnectClick} 
              className="btn-neon text-sm"
            >
              Link to the Synapse
            </button>
          )}
          <a
            href={process.env.NEXT_PUBLIC_TWITTER_URL ?? "https://x.com/Synapse402_xyz"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 grid place-items-center hover:bg-neon-cyan/20 transition-colors"
            aria-label="Open Twitter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neon-cyan">
              <path fill="currentColor" d="M18.244 2H21.5l-7.5 8.57L23 22h-6.23l-4.87-6.35L6.33 22H3.07l8.03-9.17L1 2h6.36l4.4 5.8L18.24 2Zm-1.09 18h1.69L7.93 4h-1.7l10.93 16Z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}


