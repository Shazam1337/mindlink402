"use client";
import { useState } from "react";

type Props = { onMockSubmit?: (u: { handle: string; url: string; wallet: string }) => void };

export default function SubmitRaid({ onMockSubmit }: Props) {
  const [handle, setHandle] = useState("");
  const [url, setUrl] = useState("");
  const [wallet, setWallet] = useState("");

  return (
    <div className="card p-5 card-holographic">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title font-heading">Transmit Signal</h3>
        <span className="text-[10px] px-2 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan font-medium">
          Active
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-neon-cyan/70 mb-1 block uppercase tracking-wider">Signal Source</label>
          <input 
            className="input-neon" 
            placeholder="https://x.com/..."
            value={url} 
            onChange={e => setUrl(e.target.value)} 
          />
        </div>
        <div>
          <label className="text-xs text-neon-cyan/70 mb-1 block uppercase tracking-wider">Neural Address</label>
          <input 
            className="input-neon font-mono text-sm" 
            placeholder="Wallet Address..."
            value={wallet} 
            onChange={e => setWallet(e.target.value)} 
          />
        </div>
        <button
          onClick={() => {
            onMockSubmit?.({ handle, url, wallet });
            setHandle(""); setUrl(""); setWallet("");
          }}
          className="w-full btn-neon py-3 font-heading tracking-wider"
        >
          Transmit Signal →
        </button>
      </div>
      <div className="mt-5 pt-4 border-t border-neon-cyan/20 text-xs text-neon-cyan/60 space-y-1.5">
        <p className="flex items-start gap-2">
          <span className="text-neon-cyan">•</span>
          <span>Tag $PULSE402 or CA in your signal</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="text-neon-cyan">•</span>
          <span>Automated verification every 3 seconds via Protocol 402</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="text-neon-cyan">•</span>
          <span>Signals flow straight from the Synapse402 vault</span>
        </p>
      </div>
    </div>
  );
}
