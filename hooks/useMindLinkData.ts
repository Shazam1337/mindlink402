"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Signal } from "@/components/SignalStream";
import type { NeuralUser } from "@/components/UserBoard";

interface MindLinkState {
  signals: Signal[];
  users: NeuralUser[];
  totalSol: number;
  currentUser?: {
    address: string;
    linkId: string;
    level: number;
    xp: number;
    xpToNext: number;
    signalsSent: number;
    signalsReceived: number;
    energyBalance: number;
  };
}

const generateUsername = () => {
  const prefixes = ["neural", "synapse", "cortex", "axon", "dendrite", "pulse", "wave", "signal"];
  const suffixes = ["alpha", "beta", "gamma", "delta", "omega", "prime", "core", "node"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}_${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

const generateLinkId = (username: string) => `${username}.mindlink.sol`;

const generateSignal = (): Signal => {
  const from = generateUsername();
  const to = generateUsername();
  const statuses: Signal["status"][] = ["Processing", "Delivered", "Looping"];
  return {
    id: Math.random().toString(36).slice(2),
    from,
    to,
    amount: parseFloat((Math.random() * 0.1 + 0.001).toFixed(4)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date(),
    data: Math.random() > 0.5 ? `https://example.com/${Math.random().toString(36).slice(2)}` : undefined,
  };
};

const generateUser = (rank: number): NeuralUser => {
  const username = generateUsername();
  return {
    id: Math.random().toString(36).slice(2),
    username,
    linkId: generateLinkId(username),
    level: Math.floor(Math.random() * 20) + 1,
    xp: Math.floor(Math.random() * 1000),
    energy: parseFloat((Math.random() * 5 + 0.1).toFixed(2)),
    signals: Math.floor(Math.random() * 100),
    rank,
  };
};

export function useMindLinkData() {
  const [state, setState] = useState<MindLinkState>(() => ({
    signals: [],
    users: [],
    totalSol: 0,
    currentUser: undefined,
  }));

  const timers = useRef<number[]>([]);

  useEffect(() => {
    // Initialize users
    const initialUsers: NeuralUser[] = Array.from({ length: 10 }, (_, i) => generateUser(i + 1));
    setState((s) => ({ ...s, users: initialUsers }));

    // Generate new signals periodically
    timers.current.push(
      window.setInterval(() => {
        setState((s) => {
          const newSignal = generateSignal();
          const signals = [newSignal, ...s.signals].slice(0, 20);
          
          // Update signal statuses
          const updatedSignals = signals.map((sig) => {
            if (sig.status === "Processing" && Math.random() > 0.7) {
              return { ...sig, status: "Delivered" as const };
            }
            return sig;
          });
          
          return { ...s, signals: updatedSignals };
        });
      }, 2000)
    );

    // Update total SOL
    timers.current.push(
      window.setInterval(() => {
        setState((s) => ({
          ...s,
          totalSol: s.totalSol + Math.random() * 0.01 + 0.001,
        }));
      }, 1500)
    );

    // Update user stats periodically
    timers.current.push(
      window.setInterval(() => {
        setState((s) => {
          const updatedUsers = s.users.map((user) => {
            if (Math.random() > 0.8) {
              return {
                ...user,
                xp: user.xp + Math.floor(Math.random() * 10),
                energy: Math.min(user.energy + Math.random() * 0.1, 10),
                signals: user.signals + Math.floor(Math.random() * 3),
              };
            }
            return user;
          });
          
          // Re-sort by XP
          const sorted = [...updatedUsers].sort((a, b) => {
            const scoreA = a.xp + a.signals * 10 + a.energy * 5;
            const scoreB = b.xp + b.signals * 10 + b.energy * 5;
            return scoreB - scoreA;
          });
          
          const ranked = sorted.map((user, i) => ({ ...user, rank: i + 1 }));
          
          return { ...s, users: ranked };
        });
      }, 3000)
    );

    return () => {
      timers.current.forEach((t) => clearInterval(t));
    };
  }, []);

  const addSignal = (signal: Omit<Signal, "id" | "timestamp">) => {
    setState((s) => {
      const newSignal: Signal = {
        ...signal,
        id: Math.random().toString(36).slice(2),
        timestamp: new Date(),
        status: "Processing",
      };
      return {
        ...s,
        signals: [newSignal, ...s.signals].slice(0, 20),
        totalSol: s.totalSol + signal.amount,
      };
    });
  };

  const setCurrentUser = (address: string) => {
    const username = generateUsername();
    setState((s) => ({
      ...s,
      currentUser: {
        address,
        linkId: generateLinkId(username),
        level: 1,
        xp: 0,
        xpToNext: 100,
        signalsSent: 0,
        signalsReceived: 0,
        energyBalance: 0,
      },
    }));
  };

  return useMemo(
    () => ({
      ...state,
      addSignal,
      setCurrentUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
}

