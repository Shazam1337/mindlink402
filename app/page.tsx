"use client";
import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import VaultOfEnergy from "@/components/VaultOfEnergy";
import FractalMap from "@/components/FractalMap";
import MythStream from "@/components/MythStream";
import RealityForge from "@/components/RealityForge";
import Pantheon from "@/components/Pantheon";
import { useMythosData } from "@/hooks/useMythosData";

export default function Page() {
  const { events, archons, totalEssence, currentRealm, addEvent, setCurrentRealm } = useMythosData();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();

  useEffect(() => {
    const provider: any = (window as any).solana;
    if (!provider) return;
    
    const handleConnect = (pk: any) => {
      const address = String(pk?.publicKey ?? pk);
      setWalletAddress(address);
      // Generate realm name for new user
      const realmName = `realm_${address.slice(0, 8)}`;
      setCurrentRealm(address, realmName);
    };
    const handleDisconnect = () => {
      setWalletAddress(null);
    };
    
    provider?.on?.("connect", handleConnect);
    provider?.on?.("disconnect", handleDisconnect);
    
    // Check if already connected
    if (provider.isConnected && provider.publicKey) {
      handleConnect(provider.publicKey);
    }
    
    return () => {
      provider?.off?.("connect", handleConnect);
      provider?.off?.("disconnect", handleDisconnect);
    };
  }, [setCurrentRealm]);

  const handleForge = (data: { realmName: string; energyAmount: number; manifest?: string }) => {
    addEvent({
      type: "forge",
      realm1: data.realmName,
      energy: data.energyAmount,
      message: data.manifest,
    });
  };

  return (
    <main className="pb-8">
      <Heading />

      <div className="container-grid grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column - Reality Forge */}
        <div className="lg:col-span-3 space-y-4">
          <RealityForge 
            onForge={handleForge} 
            disabled={!walletAddress}
          />
        </div>

        {/* Center Column - Fractal Map & Myth Stream */}
        <div className="lg:col-span-6 space-y-4">
          <FractalMap 
            archons={archons}
            onNodeClick={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
          <MythStream events={events} />
        </div>

        {/* Right Column - Vault & Pantheon */}
        <div className="lg:col-span-3 space-y-4">
          <VaultOfEnergy totalEssence={totalEssence} />
          <Pantheon archons={archons.slice(0, 8)} currentUserId={walletAddress || undefined} />
        </div>
      </div>
    </main>
  );
}
