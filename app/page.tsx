"use client";
import { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import VaultSphere from "@/components/VaultSphere";
import NeuralGrid from "@/components/NeuralGrid";
import SignalStream from "@/components/SignalStream";
import TransmitPanel from "@/components/TransmitPanel";
import UserBoard from "@/components/UserBoard";
import MindStats from "@/components/MindStats";
import { useMindLinkData } from "@/hooks/useMindLinkData";

export default function Page() {
  const { signals, users, totalSol, currentUser, addSignal, setCurrentUser } = useMindLinkData();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();

  useEffect(() => {
    const provider: any = (window as any).solana;
    if (!provider) return;
    
    const handleConnect = (pk: any) => {
      const address = String(pk?.publicKey ?? pk);
      setWalletAddress(address);
      setCurrentUser(address);
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
  }, [setCurrentUser]);

  const handleTransmit = (data: { target: string; amount: number; data?: string }) => {
    addSignal({
      from: walletAddress?.slice(0, 8) || "unknown",
      to: data.target,
      amount: data.amount,
      status: "Processing",
      data: data.data,
    });
  };

  return (
    <main className="pb-8">
      <Heading />

      <div className="container-grid grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column - Transmit & Stats */}
        <div className="lg:col-span-3 space-y-4">
          <TransmitPanel 
            onTransmit={handleTransmit} 
            disabled={!walletAddress}
          />
          <MindStats
            walletAddress={walletAddress}
            linkId={currentUser?.linkId}
            level={currentUser?.level || 1}
            xp={currentUser?.xp || 0}
            xpToNext={currentUser?.xpToNext || 100}
            signalsSent={currentUser?.signalsSent || 0}
            signalsReceived={currentUser?.signalsReceived || 0}
            energyBalance={currentUser?.energyBalance || 0}
          />
        </div>

        {/* Center Column - Neural Grid & Signal Stream */}
        <div className="lg:col-span-6 space-y-4">
          <NeuralGrid 
            users={users}
            onNodeClick={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
          <SignalStream signals={signals} />
        </div>

        {/* Right Column - Vault & Leaderboard */}
        <div className="lg:col-span-3 space-y-4">
          <VaultSphere totalSol={totalSol} />
          <UserBoard users={users.slice(0, 8)} currentUserId={walletAddress || undefined} />
        </div>
      </div>
    </main>
  );
}
