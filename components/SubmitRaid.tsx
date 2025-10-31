"use client";
import { useState } from "react";

type Props = { onMockSubmit?: (u: { handle: string; url: string; wallet: string }) => void };

export default function SubmitRaid({ onMockSubmit }: Props) {
  const [handle, setHandle] = useState("");
  const [url, setUrl] = useState("");
  const [wallet, setWallet] = useState("");

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="section-title">Submit Pulse402</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Active</span>
      </div>
      <div className="space-y-3">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Tweet URL"
          value={url} onChange={e => setUrl(e.target.value)} />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Solana Wallet Address"
          value={wallet} onChange={e => setWallet(e.target.value)} />
        <button
          onClick={() => {
            onMockSubmit?.({ handle, url, wallet });
            setHandle(""); setUrl(""); setWallet("");
          }}
          className="w-full bg-ink text-white rounded-lg py-2 font-medium hover:opacity-90 transition">
          Submit Pulse →
        </button>
      </div>
      <div className="mt-4 text-xs text-black/60">
        <p>• Tag $PULSE402 or CA in your tweet  </p>
        <p>• Automated verification every few minutes  </p>
        <p>• Rewards flow straight from creator vaults </p>
      </div>
    </div>
  );
}
