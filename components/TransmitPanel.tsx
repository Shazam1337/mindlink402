"use client";
import { useState } from "react";

interface TransmitPanelProps {
  onTransmit?: (data: { target: string; amount: number; data?: string }) => void;
  disabled?: boolean;
}

export default function TransmitPanel({ onTransmit, disabled = false }: TransmitPanelProps) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target || !amount || disabled) return;
    
    onTransmit?.({
      target,
      amount: parseFloat(amount),
      data: data || undefined,
    });
    
    // Reset form
    setTarget("");
    setAmount("");
    setData("");
  };

  return (
    <div className="card p-6">
      <div className="section-title mb-4">Transmit Signal</div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-neon-cyan/70 mb-2 uppercase tracking-wider">
            Target Address / Link ID
          </label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="username.mindlink.sol or wallet address"
            className="input-neon"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs text-neon-cyan/70 mb-2 uppercase tracking-wider">
            Energy Amount (SOL)
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.000"
            className="input-neon"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs text-neon-cyan/70 mb-2 uppercase tracking-wider">
            Signal Data (Optional)
          </label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="URL, message, or data payload"
            className="input-neon"
          />
        </div>
        
        <button
          type="submit"
          disabled={disabled || !target || !amount}
          className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Transmit Signal</span>
          <span className="text-lg">→</span>
        </button>
      </form>
      
      {disabled && (
        <div className="mt-4 text-center text-xs text-neon-cyan/60">
          Connect wallet to transmit signal
        </div>
      )}
    </div>
  );
}

