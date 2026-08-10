import StaffSidebar from '../../components/StaffSidebar';
import { db } from '../../../db';
import { enquiries } from '../../../db/schema';
import { desc } from 'drizzle-orm';

export default async function EnquiriesPage() {
  const data = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));

  return (
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary-fixed selection:text-on-primary-fixed">
      <StaffSidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Enquiries</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage customer enquiries and contacts.</p>
          </div>
        </header>

        <section className="bg-surface-container rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-on-surface-variant">
                <th className="font-label-bold text-label-bold p-4">Name</th>
                <th className="font-label-bold text-label-bold p-4">Phone</th>
                <th className="font-label-bold text-label-bold p-4">Vehicle Model</th>
                <th className="font-label-bold text-label-bold p-4">Date</th>
                <th className="font-label-bold text-label-bold p-4">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              {data.map((enq) => (
                <tr key={enq.id} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                  <td className="p-4">{enq.name}</td>
                  <td className="p-4">{enq.number}</td>
                  <td className="p-4">{enq.vehicleModel}</td>
                  <td className="p-4">{new Date(enq.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${enq.status === 'New' ? 'bg-[#228B22]/10 text-green-800' : 'bg-surface-variant text-on-surface-variant'}`}>
                      {enq.status}
                    </span>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-on-surface-variant">No enquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
