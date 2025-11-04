"use client";
import { useEffect, useState } from "react";

export interface MythEvent {
  id: string;
  type: "forge" | "merge" | "ascend" | "essence";
  realm1: string;
  realm2?: string;
  energy: number;
  timestamp: Date;
  message?: string;
}

interface MythStreamProps {
  events: MythEvent[];
  maxItems?: number;
}

const eventIcons = {
  forge: "⚡",
  merge: "✴️",
  ascend: "🔮",
  essence: "💎",
};

const eventColors = {
  forge: "text-mythos-gold border-mythos-gold/30 bg-mythos-gold/10",
  merge: "text-mythos-turquoise border-mythos-turquoise/30 bg-mythos-turquoise/10",
  ascend: "text-mythos-purple border-mythos-purple/30 bg-mythos-purple/10",
  essence: "text-mythos-gold border-mythos-gold/30 bg-mythos-gold/10",
};

export default function MythStream({ events, maxItems = 10 }: MythStreamProps) {
  const [displayedEvents, setDisplayedEvents] = useState<MythEvent[]>([]);

  useEffect(() => {
    setDisplayedEvents(events.slice(0, maxItems));
  }, [events, maxItems]);

  const formatEvent = (event: MythEvent) => {
    switch (event.type) {
      case "forge":
        return `${event.realm1} forged new essence`;
      case "merge":
        return `${event.realm1} merged with ${event.realm2}`;
      case "ascend":
        return `${event.realm1} ascended to Rank ${event.message}`;
      case "essence":
        return `new essence forged by ${event.realm1}`;
      default:
        return event.message || "Unknown event";
    }
  };

  return (
    <div className="card p-6">
      <div className="section-title mb-4">Myth Stream</div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {displayedEvents.length === 0 ? (
          <div className="text-center py-8 text-mythos-gold/50 text-sm">
            No events in the stream
          </div>
        ) : (
          displayedEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${eventColors[event.type]}`}
              style={{
                boxShadow: event.type === "ascend" 
                  ? '0 0 12px rgba(199, 125, 255, 0.4)' 
                  : event.type === "merge"
                  ? '0 0 12px rgba(0, 255, 246, 0.4)'
                  : '0 0 12px rgba(255, 215, 0, 0.4)'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{eventIcons[event.type]}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {event.type}
                    </span>
                    <span className="text-xs text-current/60">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    {formatEvent(event)}
                  </div>
                  {event.message && event.type !== "ascend" && (
                    <div className="text-xs text-current/70 mt-1">
                      {event.message}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-heading font-bold text-lg">
                    {event.energy.toFixed(3)}
                  </div>
                  <div className="text-xs text-current/60">E</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

