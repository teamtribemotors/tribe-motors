import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';
import { db } from '../../../db';
import { enquiries, staff } from '../../../db/schema';
import { desc, eq } from 'drizzle-orm';

export default async function EnquiriesPage() {
  const data = await db.select({
      enquiry: enquiries,
      assignee: staff
  })
  .from(enquiries)
  .leftJoin(staff, eq(enquiries.assignedTo, staff.id))
  .orderBy(desc(enquiries.createdAt));

  // Map enquiries to Kanban columns based on their status
  const pending = data.filter(e => e.enquiry.status === 'New' || e.enquiry.status === 'Pending' || !e.enquiry.status);
  const processing = data.filter(e => e.enquiry.status === 'In Progress' || e.enquiry.status === 'Contacted' || e.enquiry.status === 'Test Drive');
  const qcCheck = data.filter(e => e.enquiry.status === 'QC' || e.enquiry.status === 'Review' || e.enquiry.status === 'Negotiation');
  const ready = data.filter(e => e.enquiry.status === 'Resolved' || e.enquiry.status === 'Closed' || e.enquiry.status === 'Ready');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />
      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <StaffHeader title="Enquiries" icon="shuffle" />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Secondary Nav / Tabs */}
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface px-8 py-4">
            <div className="flex items-baseline gap-6">
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface">Fulfillment Queue</h2>
              <div className="flex gap-6">
                <a className="border-b-2 border-primary pb-1 text-sm font-bold text-on-surface" href="#">All Queues</a>
                <a className="pb-1 text-sm font-medium text-outline hover:text-on-surface transition-colors" href="#">Priority</a>
                <a className="pb-1 text-sm font-medium text-outline hover:text-on-surface transition-colors" href="#">Completed</a>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-surface-container-low p-1">
              <button className="flex items-center justify-center rounded-md bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                Kanban
              </button>
              <button className="flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-outline hover:bg-surface-container-high">
                List
              </button>
              <button className="flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-outline hover:bg-surface-container-high">
                Timeline
              </button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex flex-1 overflow-x-auto p-6 custom-scrollbar bg-surface-bright">
            <div className="flex gap-6">
              
              {/* Column 1: Pending */}
              <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-outline"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Pending</h3>
                    <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-bold text-outline">{pending.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {pending.map(({ enquiry: enq, assignee }) => (
                  <div key={enq.id} className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <span className="rounded-md bg-primary-fixed px-2 py-1 text-[10px] font-bold text-on-primary-fixed-variant">ENQ #{enq.id.slice(0, 8)}</span>
                      <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-outline">{enq.name} • {enq.number}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant pt-3 mt-1">
                      <div className="flex -space-x-2">
                         <div className="h-6 w-6 rounded-full border-2 border-white bg-surface-dim flex items-center justify-center text-[10px] font-bold text-on-surface">
                           {assignee ? assignee.name.charAt(0) : '?'}
                         </div>
                      </div>
                      <span className="material-symbols-outlined text-outline text-lg">forum</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2: Processing */}
              <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Processing</h3>
                    <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-bold text-on-primary-fixed-variant">{processing.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {processing.map(({ enquiry: enq, assignee }) => (
                  <div key={enq.id} className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white p-4 shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <span className="rounded-md bg-primary-fixed px-2 py-1 text-[10px] font-bold text-on-primary-fixed-variant">ENQ #{enq.id.slice(0, 8)}</span>
                      <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        {enq.status.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                    <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-1">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant pt-3 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-on-surface">{enq.notes || 'No notes'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3: QC Check */}
              <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-tertiary"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Negotiation</h3>
                    <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">{qcCheck.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {qcCheck.map(({ enquiry: enq, assignee }) => (
                  <div key={enq.id} className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[10px] font-bold text-on-surface">ENQ #{enq.id.slice(0, 8)}</span>
                      <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-tertiary-fixed px-2 py-0.5 text-[9px] font-black text-on-tertiary-fixed">{enq.status.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant pt-3 mt-1">
                      <span className="text-[10px] font-bold text-tertiary">{enq.notes || 'Awaiting update'}</span>
                      <span className="material-symbols-outlined text-outline text-lg">switch_account</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 4: Ready / Closed */}
              <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Ready / Closed</h3>
                    <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-[10px] font-bold text-on-secondary-fixed">{ready.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {ready.map(({ enquiry: enq, assignee }) => (
                  <div key={enq.id} className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex justify-between items-start">
                      <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[10px] font-bold text-on-surface">ENQ #{enq.id.slice(0, 8)}</span>
                      <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
