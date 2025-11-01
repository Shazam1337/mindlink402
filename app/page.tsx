"use client";
import Heading from "@/components/Heading";
import SubmitRaid from "@/components/SubmitRaid";
import RecentRaids from "@/components/RecentRaids";
import TopRaiders from "@/components/TopRaiders";
import FeeClaims from "@/components/FeeClaims";
import Payments from "@/components/Payments";
import InfoStrip from "@/components/InfoStrip";
import Pending from "@/components/Pending";
import { useMockActivity } from "@/hooks/useMockActivity";
import { generateRaid } from "@/lib/mock";

export default function Page() {
  const { raids, top, payments, fees, pending } = useMockActivity();

  return (
    <main className="pb-8">
      <Heading />

      <div className="container-grid grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* left */}
        <div className="lg:col-span-4 space-y-4">
          <SubmitRaid
            onMockSubmit={() => {
              const r = generateRaid();
              window.dispatchEvent(new CustomEvent("raid:add", { detail: r }));
            }}
          />
          <Pending items={pending} />
        </div>

        {/* center */}
        <div className="lg:col-span-5 space-y-4">
          <RecentRaids items={raids} />
          <FeeClaims totalSol={fees.totalSol} />
        </div>

        {/* right */}
        <div className="lg:col-span-3 space-y-4">
          <TopRaiders top={top} />
          <Payments items={payments} />
        </div>
      </div>

      <InfoStrip />
    </main>
  );
}
