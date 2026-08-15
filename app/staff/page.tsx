import StaffSidebar from '../components/StaffSidebar';
import StaffHeader from '../components/StaffHeader';
import { db } from '../../db';
import { vehicles as vehiclesTable, enquiries, appointments, reportUnlocks, activityLogs, tasks, staff } from '../../db/schema';
import { desc, eq, not } from 'drizzle-orm';
import Link from 'next/link';
import TasksClient from '../components/TasksClient';
import AutoRefresh from '../components/AutoRefresh';

export default async function StaffDashboard() {
  const allVehicles = await db.select().from(vehiclesTable).orderBy(desc(vehiclesTable.createdAt));
  
  const newEnquiriesCount = await db.select().from(enquiries).where(eq(enquiries.status, 'New')).then(res => res.length);
  const pendingAppointmentsCount = await db.select().from(appointments).where(eq(appointments.status, 'Pending')).then(res => res.length);
  const reportsUnlockedCount = await db.select().from(reportUnlocks).then(res => res.length);

  const activities = await db.select({
      activity: activityLogs,
      staff: staff
  })
  .from(activityLogs)
  .leftJoin(staff, eq(activityLogs.userId, staff.id))
  .orderBy(desc(activityLogs.createdAt))
  .limit(4);

  const pendingTasks = await db.select({
      task: tasks,
      assignee: staff
  })
  .from(tasks)
  .leftJoin(staff, eq(tasks.assignedTo, staff.id))
  .where(not(eq(tasks.status, 'Completed')))
  .orderBy(desc(tasks.priority))
  .limit(3);

  const totalInventory = allVehicles.length;
  // Live listings would ideally be queried with status 'Live', mock for now
  const liveListings = allVehicles.filter((v: any) => v.status === 'Live').length;
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />
      
      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <AutoRefresh intervalMs={15000} />
        <StaffHeader title="Dashboard" icon="dashboard" />
        
        {/* Scrollable Body */}
        <div className="p-8 flex flex-col gap-8 overflow-y-auto max-w-[1280px] mx-auto w-full custom-scrollbar">
          
          {/* Summary Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">New Enquiries</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">{newEnquiriesCount}</p>
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Pending Appointments</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">{pendingAppointmentsCount}</p>
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Vehicles in Draft</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">{totalInventory - liveListings}</p>
                <span className="text-error font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_down</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-on-surface-variant font-label-md text-sm uppercase tracking-wide">Reports Unlocked</p>
              <div className="flex items-baseline justify-between">
                <p className="text-on-surface font-display-lg text-4xl leading-tight">{reportsUnlockedCount}</p>
                <span className="text-tertiary font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
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
                {activities.map(({ activity, staff }) => (
                  <div key={activity.id} className="p-4 hover:bg-surface-bright transition-colors cursor-pointer flex gap-4">
                    <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${activity.type === 'Enquiry' ? 'bg-primary-fixed/50' : activity.type === 'Appointment' ? 'bg-tertiary-fixed/50' : 'bg-surface-container-highest/50'}`}>
                      <span className={`material-symbols-outlined ${activity.type === 'Enquiry' ? 'text-primary' : activity.type === 'Appointment' ? 'text-tertiary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {activity.type === 'Enquiry' ? 'mark_as_unread' : activity.type === 'Appointment' ? 'event_available' : 'edit_note'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-on-surface font-body-md text-sm font-medium leading-snug">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-outline text-xs font-label-sm">{activity.createdAt.toLocaleDateString()}</p>
                        <span className="size-1 bg-outline-variant rounded-full"></span>
                        <p className="text-outline text-xs font-label-sm">{staff?.name || 'System'}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
              <TasksClient initialTasks={pendingTasks} />
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
              <Link href="/staff/inventory/bulk-upload" className="flex flex-col items-center justify-center gap-3 rounded-xl bg-surface-container p-6 border border-outline-variant/30 hover:border-primary transition-all group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">cloud_upload</span>
                <span className="text-on-surface font-label-sm text-sm uppercase tracking-wider">Bulk Upload</span>
              </Link>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
