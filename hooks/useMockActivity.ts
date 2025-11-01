"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { FeeClaim, Payment, Raid, bumpFees, generateRaid, toPayment } from "@/lib/mock";

type State = {
  raids: Raid[];
  top: { user: string; total: number }[];
  payments: Payment[];
  fees: FeeClaim;
  pendingCount: number;
  pending: Raid[];
};

export function useMockActivity() {
  const [state, setState] = useState<State>(() => ({
    raids: [],
    top: [],
    payments: [],
    fees: { ts: Date.now(), totalSol: 0 },
    pendingCount: 0,
    pending: [],
  }));

  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.push(window.setInterval(() => {
      setState(s => {
        const r = generateRaid();
        const raids = [r, ...s.raids].slice(0, 20);
        return { ...s, raids, pendingCount: s.pendingCount + 1 };
      });
    }, 1200));

    timers.current.push(window.setInterval(() => {
      setState(s => {
        const i = s.raids.findIndex(r => r.status === "pending");
        if (i === -1) return s;
        const raids = [...s.raids];
        raids[i] = { ...raids[i], status: "verified" };
        return { ...s, raids, pendingCount: Math.max(0, s.pendingCount - 1) };
      });
    }, 1800));

    timers.current.push(window.setInterval(() => {
      setState(s => {
        const i = s.raids.findIndex(r => r.status === "verified");
        if (i === -1) return s;
        const raids = [...s.raids];
        const paidRaid = { ...raids[i], status: "paid" as const };
        raids[i] = paidRaid;
        const payment = toPayment(paidRaid);
        const payments = [payment, ...s.payments].slice(0, 12);
        return { ...s, raids, payments };
      });
    }, 2400));

    timers.current.push(window.setInterval(() => {
      setState(s => ({ ...s, fees: { ts: Date.now(), totalSol: bumpFees(s.fees.totalSol) } }));
    }, 1500));

    timers.current.push(window.setInterval(() => {
      setState(s => {
        const map = new Map<string, number>();
        s.raids.forEach(r => {
          if (r.status !== "paid") return;
          map.set(r.user, (map.get(r.user) ?? 0) + r.sol);
        });
        const top = [...map.entries()]
          .map(([user, total]) => ({ user, total: parseFloat(total.toFixed(3)) }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);
        return { ...s, top };
      });
    }, 2200));

    return () => { timers.current.forEach(t => clearInterval(t)); };
  }, []);

  return useMemo(() => {
    const pending = state.raids.filter(r => r.status === "pending");
    return { ...state, pending };
  }, [state]);
}
