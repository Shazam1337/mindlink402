"use client";
import SubmitRaid from "@/components/SubmitRaid";
import RecentRaids from "@/components/RecentRaids";
import TopRaiders from "@/components/TopRaiders";
import FeeClaims from "@/components/FeeClaims";
import Payments from "@/components/Payments";
import InfoStrip from "@/components/InfoStrip";
import { useMockActivity } from "@/hooks/useMockActivity";
import { generateRaid } from "@/lib/mock";
import Pending from "@/components/Pending";

export default function Page() {
  const { raids, top, payments, fees, pendingCount } = useMockActivity();

  return (
    <main className="mt-6 md:mt-10">

      <div className="container-grid grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* left */}
        <div className="lg:col-span-4 space-y-4">
          <SubmitRaid
            onMockSubmit={() => {
              const r = generateRaid();
              window.dispatchEvent(new CustomEvent("raid:add", { detail: r }));
            }}
          />
          <Pending items={raids.filter(r => r.status === "pending")} />
        </div>

        {/* center */}
        <div className="lg:col-span-5">
          <RecentRaids items={raids} />
        </div>

        {/* right */}
        <div className="lg:col-span-3 space-y-4">
          <TopRaiders top={top} />
          <FeeClaims totalSol={fees.totalSol} />
          <Payments items={payments} />
        </div>
      </div>

      <InfoStrip />
    </main>
  );
}
