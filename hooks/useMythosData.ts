"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MythEvent } from "@/components/MythStream";
import type { Archon } from "@/components/Pantheon";

interface MythosState {
  events: MythEvent[];
  archons: Archon[];
  totalEssence: number;
  currentRealm?: {
    address: string;
    realmName: string;
    ascensionLevel: number;
    energyEssence: number;
    artifacts: string[];
  };
}

const generateRealmName = () => {
  const prefixes = ["helios", "void", "aurora", "thoth", "chronos", "atlas", "nyx", "eos", "hyperion", "selene"];
  const suffixes = ["alpha", "beta", "prime", "omega", "core", "nexus", "402", "realm", "fragment"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}_${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

const generateMythEvent = (): MythEvent => {
  const realm1 = generateRealmName();
  const realm2 = generateRealmName();
  const types: MythEvent["type"][] = ["forge", "merge", "ascend", "essence"];
  const type = types[Math.floor(Math.random() * types.length)];
  
  return {
    id: Math.random().toString(36).slice(2),
    type,
    realm1,
    realm2: type === "merge" ? realm2 : undefined,
    energy: parseFloat((Math.random() * 0.1 + 0.001).toFixed(4)),
    timestamp: new Date(),
    message: type === "ascend" ? String(Math.floor(Math.random() * 10) + 1) : undefined,
  };
};

const generateArchon = (rank: number): Archon => {
  const realmName = generateRealmName();
  const artifacts = Math.random() > 0.7 
    ? ["Neural Pioneer", "Energy Master", "Protocol Architect"].slice(0, Math.floor(Math.random() * 3) + 1)
    : [];
  
  return {
    id: Math.random().toString(36).slice(2),
    realmName,
    energyEssence: parseFloat((Math.random() * 5 + 0.1).toFixed(2)),
    ascensionLevel: Math.floor(Math.random() * 20) + 1,
    rank,
    artifacts,
    rune: rank <= 3 ? "402" : undefined,
  };
};

export function useMythosData() {
  const [state, setState] = useState<MythosState>(() => ({
    events: [],
    archons: [],
    totalEssence: 0,
    currentRealm: undefined,
  }));

  const timers = useRef<number[]>([]);

  useEffect(() => {
    // Initialize archons
    const initialArchons: Archon[] = Array.from({ length: 10 }, (_, i) => generateArchon(i + 1));
    setState((s) => ({ ...s, archons: initialArchons }));

    // Generate new myth events periodically
    timers.current.push(
      window.setInterval(() => {
        setState((s) => {
          const newEvent = generateMythEvent();
          const events = [newEvent, ...s.events].slice(0, 20);
          return { ...s, events };
        });
      }, 2500)
    );

    // Update total essence
    timers.current.push(
      window.setInterval(() => {
        setState((s) => ({
          ...s,
          totalEssence: s.totalEssence + Math.random() * 0.01 + 0.001,
        }));
      }, 1500)
    );

    // Update archon stats periodically
    timers.current.push(
      window.setInterval(() => {
        setState((s) => {
          const updatedArchons = s.archons.map((archon) => {
            if (Math.random() > 0.8) {
              return {
                ...archon,
                energyEssence: Math.min(archon.energyEssence + Math.random() * 0.1, 10),
                ascensionLevel: archon.ascensionLevel + Math.floor(Math.random() * 2),
              };
            }
            return archon;
          });
          
          // Re-sort by energy and level
          const sorted = [...updatedArchons].sort((a, b) => {
            const scoreA = a.energyEssence + a.ascensionLevel * 10;
            const scoreB = b.energyEssence + b.ascensionLevel * 10;
            return scoreB - scoreA;
          });
          
          const ranked = sorted.map((archon, i) => ({ ...archon, rank: i + 1 }));
          
          return { ...s, archons: ranked };
        });
      }, 3000)
    );

    return () => {
      timers.current.forEach((t) => clearInterval(t));
    };
  }, []);

  const addEvent = (event: Omit<MythEvent, "id" | "timestamp">) => {
    setState((s) => {
      const newEvent: MythEvent = {
        ...event,
        id: Math.random().toString(36).slice(2),
        timestamp: new Date(),
      };
      return {
        ...s,
        events: [newEvent, ...s.events].slice(0, 20),
        totalEssence: s.totalEssence + event.energy,
      };
    });
  };

  const setCurrentRealm = (address: string, realmName: string) => {
    setState((s) => ({
      ...s,
      currentRealm: {
        address,
        realmName,
        ascensionLevel: 1,
        energyEssence: 0,
        artifacts: [],
      },
    }));
  };

  return useMemo(
    () => ({
      ...state,
      addEvent,
      setCurrentRealm,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
}

