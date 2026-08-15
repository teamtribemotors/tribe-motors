import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';
import { db } from '../../../db';
import { enquiries, staff } from '../../../db/schema';
import { desc, eq } from 'drizzle-orm';
import EnquiriesKanban from './EnquiriesKanban';
import AutoRefresh from '../../components/AutoRefresh';

export default async function EnquiriesPage() {
  const data = await db.select({
      enquiry: enquiries,
      assignee: staff
  })
  .from(enquiries)
  .leftJoin(staff, eq(enquiries.assignedTo, staff.id))
  .orderBy(desc(enquiries.createdAt));

  const allStaff = await db.select().from(staff);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />
      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <AutoRefresh intervalMs={15000} />
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

          <EnquiriesKanban initialData={data} staffMembers={allStaff} />
        </div>
      </main>
    </div>
  );
}
