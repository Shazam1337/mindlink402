"use client";
import { useEffect, useState } from "react";

export interface Signal {
  id: string;
  from: string;
  to: string;
  amount: number;
  status: "Processing" | "Delivered" | "Looping";
  timestamp: Date;
  data?: string;
}

interface SignalStreamProps {
  signals: Signal[];
  maxItems?: number;
}

export default function SignalStream({ signals, maxItems = 10 }: SignalStreamProps) {
  const [displayedSignals, setDisplayedSignals] = useState<Signal[]>([]);

  useEffect(() => {
    setDisplayedSignals(signals.slice(0, maxItems));
  }, [signals, maxItems]);

  const getStatusColor = (status: Signal["status"]) => {
    switch (status) {
      case "Processing":
        return "text-neon-amber border-neon-amber/30 bg-neon-amber/10";
      case "Delivered":
        return "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10";
      case "Looping":
        return "text-neon-violet border-neon-violet/30 bg-neon-violet/10";
      default:
        return "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10";
    }
  };

  const getStatusGlow = (status: Signal["status"]) => {
    switch (status) {
      case "Processing":
        return { boxShadow: '0 0 8px rgba(255, 179, 0, 0.4)' };
      case "Delivered":
        return { boxShadow: '0 0 8px rgba(0, 250, 255, 0.4)' };
      case "Looping":
        return { boxShadow: '0 0 8px rgba(154, 79, 255, 0.4)' };
      default:
        return {};
    }
  };

  return (
    <div className="card p-6">
      <div className="section-title mb-4">Signal Stream</div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {displayedSignals.length === 0 ? (
          <div className="text-center py-8 text-neon-cyan/50 text-sm">
            No signals in stream
          </div>
        ) : (
          displayedSignals.map((signal) => (
            <div
              key={signal.id}
              className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getStatusColor(signal.status)}`}
              style={getStatusGlow(signal.status)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {signal.status}
                    </span>
                    <span className="text-xs text-current/60">
                      {signal.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{signal.from.slice(0, 6)}...</span>
                    <span className="mx-2 text-current/60">→</span>
                    <span className="font-medium">{signal.to.slice(0, 6)}...</span>
                  </div>
                  {signal.data && (
                    <div className="text-xs text-current/70 mt-1 truncate">
                      {signal.data}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-heading font-bold text-lg">
                    {signal.amount.toFixed(3)}
                  </div>
                  <div className="text-xs text-current/60">SOL</div>
                </div>
              </div>
              
              {/* Animated progress bar for Processing status */}
              {signal.status === "Processing" && (
                <div className="mt-2 h-1 bg-current/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-current animate-pulse"
                    style={{ 
                      width: '60%',
                      animation: 'processing-pulse 2s ease-in-out infinite'
                    }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <style jsx>{`
        @keyframes processing-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

