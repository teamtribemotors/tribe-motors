import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';
import { db } from '../../db';
import { vehicles as vehiclesTable } from '../../db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function StaffDashboard() {
  const allVehicles = await db.select().from(vehiclesTable).orderBy(desc(vehiclesTable.createdAt));

  const totalInventory = allVehicles.length;
  // Live listings would ideally be queried with status 'Live', mock for now
  const liveListings = allVehicles.filter((v: any) => v.status === 'Live').length;
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />
      
      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <StaffHeader title="Dashboard" icon="dashboard" />
        
        {/* Scrollable Body */}
        <div className="p-8 flex flex-col gap-8 overflow-y-auto max-w-[1280px] mx-auto w-full custom-scrollbar">
          
          {/* Summary Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">New Enquiries</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">24</p>
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +12%
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Pending Appointments</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">8</p>
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +5%
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Vehicles in Draft</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">{totalInventory - liveListings}</p>
                <span className="text-error font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_down</span> -2%
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Reports Unlocked</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">156</p>
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +18%
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Feed */}
            <div className="lg:col-span-1 flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
                <h3 className="text-on-surface font-headline-md text-lg">Recent Activity</h3>
                <button className="text-primary font-label-sm uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="flex flex-col divide-y divide-outline-variant/20">
                <div className="p-4 hover:bg-surface-bright transition-colors cursor-pointer flex gap-4">
                  <div className="size-10 bg-primary-fixed/50 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mark_as_unread</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-on-surface font-body-md text-sm font-medium leading-snug">New enquiry for 2021 Porsche 911</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-outline text-xs font-label-sm">2m ago</p>
                      <span className="size-1 bg-outline-variant rounded-full"></span>
                      <p className="text-outline text-xs font-label-sm">Alex Rivera</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-surface-bright transition-colors cursor-pointer flex gap-4">
                  <div className="size-10 bg-tertiary-fixed/50 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-on-surface font-body-md text-sm font-medium leading-snug">Booking confirmed for tomorrow at 11:00 AM</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-outline text-xs font-label-sm">15m ago</p>
                      <span className="size-1 bg-outline-variant rounded-full"></span>
                      <p className="text-outline text-xs font-label-sm">Sarah Chen</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-surface-bright transition-colors cursor-pointer flex gap-4">
                  <div className="size-10 bg-secondary-container/50 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-on-surface font-body-md text-sm font-medium leading-snug">Report unlocked by Rahul S.</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-outline text-xs font-label-sm">45m ago</p>
                      <span className="size-1 bg-outline-variant rounded-full"></span>
                      <p className="text-outline text-xs font-label-sm">BMW M3 Comp</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 hover:bg-surface-bright transition-colors cursor-pointer flex gap-4">
                  <div className="size-10 bg-surface-container-highest/50 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant">edit_note</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-on-surface font-body-md text-sm font-medium leading-snug">Inventory price update: Audi RS6</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-outline text-xs font-label-sm">2h ago</p>
                      <span className="size-1 bg-outline-variant rounded-full"></span>
                      <p className="text-outline text-xs font-label-sm">System</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pending Tasks Section */}
            <div className="lg:col-span-2 flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
                <h3 className="text-on-surface font-headline-md text-lg">Pending Tasks</h3>
                <div className="flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-label-sm uppercase tracking-wider">3 Urgent</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-lowest">
                    <tr>
                      <th className="px-6 py-3 font-label-sm text-xs uppercase tracking-wider text-outline">Task Details</th>
                      <th className="px-6 py-3 font-label-sm text-xs uppercase tracking-wider text-outline">Status</th>
                      <th className="px-6 py-3 font-label-sm text-xs uppercase tracking-wider text-outline">Assigned To</th>
                      <th className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-on-surface font-label-md text-sm">Confirm booking: Vikram J.</p>
                          <p className="text-outline font-body-md text-xs">Test Drive - Mercedes AMG GT</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-surface-container-high px-2 py-1 text-[10px] font-label-sm text-on-surface-variant uppercase tracking-tight">Awaiting Confirmation</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-outline-variant bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUGxCF3duQRwq13qWV907Q3HI1sblvbtaWJ3ErKRX0Eb5xThXu2MFMyYdJLRhO18P6mbOIS2ScQPiYwUnTe5yG-f09HUZI5TXNs9NJI5pvCD1wq-NC3LfH_HMzMiWNE43RM027BXWJgKcigRSvhzfwWEnX7XxGR7lbEz4K-riVNgtC9EIjtITP_sMYycX_9_Ljrn78r-MFF6kat8mdrdsRbbSEHfiBGnT_gJ7NnjiRZ7JYoiaoD1lQ-A')" }}></div>
                          <p className="text-on-surface font-label-md text-xs">Marc L.</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:bg-primary-fixed/30 p-1.5 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-on-surface font-label-md text-sm">Review draft: 2022 BMW M4</p>
                          <p className="text-outline font-body-md text-xs">Missing high-res interior photos</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-secondary-container/50 px-2 py-1 text-[10px] font-label-sm text-on-secondary-container uppercase tracking-tight">Draft Review</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-outline-variant bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWsomHAVkK9p1sJTl9y5Fev_UmV6FIDNJnwMhPt16B7uHcU0HdkIEASbQNUivEu0MqeSLYQv68pyCcKd5pT5KJjSJ0xgKgaffZXXy-gCfg_ZULLGTtANBfGqPN4RxZCuBxdxLYT2m-X8ArUIy85R2OYzHnOKt-2XCPWaX8ougzqLJKtfvW2kXIsha1EeDWaXjn0ix4JOgcj8RAcq0ibeE1vazw6FxehJWzzIsvW0A3PepQpj1JMAwimg')" }}></div>
                          <p className="text-on-surface font-label-md text-xs">Elena S.</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:bg-primary-fixed/30 p-1.5 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-on-surface font-label-md text-sm">Upload inspection: Audi R8</p>
                          <p className="text-outline font-body-md text-xs">Service bay 4 - Mechanical check</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-error-container/50 px-2 py-1 text-[10px] font-label-sm text-on-error-container uppercase tracking-tight">Overdue</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-outline-variant bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAi0iwGMiq4YPikjv_pAsLV-WtEwZHRman-5ua6UP9yzqg-9Jsz6ypaUgwdRdZgt-eHOMzmYxbP0yTf32mtReh8fM_aJNsj92tQ4_vEYmcS41WVzj6a0bJz0W9mKPeSIYkCwRKof_G6PKHCtG1U_AnJ-rGVYfAR1ggs3JbcoluMFJkBvzG2nPdAM9x0nGKgDdPZ6A9uvX_oN0O_Gqa3bpRc35Z4Jh9qCojMrc44JRumdR_yXmrCe_L3rA')" }}></div>
                          <p className="text-on-surface font-label-md text-xs">David K.</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary hover:bg-primary-fixed/30 p-1.5 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Footer Section / Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
            <div className="relative overflow-hidden rounded-xl bg-inverse-surface text-inverse-on-surface p-8 shadow-lg">
              <div className="relative z-10">
                <h4 className="text-2xl font-headline-md mb-2 text-primary">Performance Goals</h4>
                <p className="text-outline-variant font-body-md text-sm mb-6 max-w-md">Your branch is currently at 82% of its monthly target for report unlocks. Push for 10 more to hit the Gold tier.</p>
                <div className="w-full bg-outline-variant/20 h-2 rounded-full mb-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
                </div>
                <p className="text-xs font-label-sm text-primary tracking-widest uppercase">Target: 200 Units</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20">
                <span className="material-symbols-outlined text-[120px]">analytics</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/staff/inventory/new" className="flex flex-col items-center justify-center gap-3 rounded-xl bg-surface-container p-6 border border-outline-variant/30 hover:border-primary transition-all group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_circle</span>
                <span className="text-on-surface font-label-sm text-sm uppercase tracking-wider">New Listing</span>
              </Link>
              <button className="flex flex-col items-center justify-center gap-3 rounded-xl bg-surface-container p-6 border border-outline-variant/30 hover:border-primary transition-all group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">cloud_upload</span>
                <span className="text-on-surface font-label-sm text-sm uppercase tracking-wider">Bulk Upload</span>
              </button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
