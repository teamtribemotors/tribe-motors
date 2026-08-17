import StaffHeader from "@/app/components/StaffHeader";
import StaffSidebar from "@/app/components/StaffSidebar";
import { db } from "../../../db";
import { pageVisits } from "../../../db/schema";
import { sql } from "drizzle-orm";

export default async function AnalyticsDashboard() {
  let uniqueVisitors: number | string | null = null;
  let error = null;

  try {
    const result = await db.select({
      count: sql<number>`count(distinct ${pageVisits.visitorId})`
    }).from(pageVisits);
    
    uniqueVisitors = result[0].count;
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />
      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <StaffHeader title="Analytics" icon="analytics" />
        <div className="p-8 flex flex-col gap-8 overflow-y-auto max-w-[1280px] mx-auto w-full custom-scrollbar">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Unique Visitors</p>
              <div className="flex items-baseline justify-between">
                {uniqueVisitors !== null ? (
                  <p className="text-on-surface font-display-lg text-4xl leading-tight">{uniqueVisitors}</p>
                ) : (
                  <p className="text-on-surface font-display-lg text-4xl leading-tight">-</p>
                )}
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container p-6 rounded-xl border border-error/20">
              <h3 className="font-headline-md text-lg mb-2">Error Fetching Analytics</h3>
              <p className="font-body-md">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
