"use client";
import { useState } from "react";

interface RealityForgeProps {
  onForge?: (data: { realmName: string; energyAmount: number; manifest?: string }) => void;
  disabled?: boolean;
}

export default function RealityForge({ onForge, disabled = false }: RealityForgeProps) {
  const [realmName, setRealmName] = useState("");
  const [energyAmount, setEnergyAmount] = useState("");
  const [manifest, setManifest] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realmName || !energyAmount || disabled) return;
    
    onForge?.({
      realmName,
      energyAmount: parseFloat(energyAmount),
      manifest: manifest || undefined,
    });
    
    // Reset form
    setRealmName("");
    setEnergyAmount("");
    setManifest("");
  };

  return (
    <div className="card card-holographic p-6">
      <div className="section-title mb-4">Reality Forge</div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-mythos-gold/70 mb-2 uppercase tracking-wider">
            Realm Name
          </label>
          <input
            type="text"
            value={realmName}
            onChange={(e) => setRealmName(e.target.value)}
            placeholder="Name your reality fragment"
            className="input-ritual"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs text-mythos-gold/70 mb-2 uppercase tracking-wider">
            Energy Infusion (Essence)
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={energyAmount}
            onChange={(e) => setEnergyAmount(e.target.value)}
            placeholder="0.000"
            className="input-ritual"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs text-mythos-gold/70 mb-2 uppercase tracking-wider">
            Manifest Your Realm (Optional)
          </label>
          <textarea
            value={manifest}
            onChange={(e) => setManifest(e.target.value)}
            placeholder="Describe your reality fragment, its essence, and purpose..."
            className="input-ritual min-h-[100px] resize-none"
            rows={4}
          />
        </div>
        
        <button
          type="submit"
          disabled={disabled || !realmName || !energyAmount}
          className="btn-ritual w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Forge Reality</span>
          <span className="text-lg">⚡</span>
        </button>
      </form>
      
      {disabled && (
        <div className="mt-4 text-center text-xs text-mythos-gold/60">
          Connect wallet to forge reality
        </div>
      )}
    </div>
  );
}

