import StaffSidebar from '../components/StaffSidebar';
import { db } from '../../db';
import { vehicles as vehiclesTable } from '../../db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function Page() {
  const allVehicles = await db.select().from(vehiclesTable).orderBy(desc(vehiclesTable.createdAt));

  const totalInventory = allVehicles.length;
  const liveListings = allVehicles.filter((v: any) => v.status === 'Live').length;
  const pendingReview = allVehicles.filter((v: any) => v.status === 'Pending').length;
  const soldListings = allVehicles.filter((v: any) => v.status === 'Sold').length;

  return (
    <div className="h-full flex antialiased text-on-background font-body-md bg-surface-container-low">

      <StaffSidebar />

      <main className="flex-1 ml-64 p-margin-desktop bg-surface-container-low min-h-screen">

        <header className="flex justify-between items-center mb-stack-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Active Listings</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage current vehicle inventory and statuses.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none w-64 transition-all" placeholder="Search Make or Model..." type="text" />
            </div>
            <button className="p-2 bg-surface border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-gutter mb-stack-md">
          <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-bold text-label-bold text-on-surface-variant">Total Inventory</span>
              <span className="material-symbols-outlined text-primary">inventory_2</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-background">{totalInventory}</div>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-bold text-label-bold text-on-surface-variant">Live Listings</span>
              <span className="material-symbols-outlined text-secondary">public</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-background">{liveListings}</div>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-bold text-label-bold text-on-surface-variant">Pending Review</span>
              <span className="material-symbols-outlined text-tertiary">pending_actions</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-background">{pendingReview}</div>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-bold text-label-bold text-on-surface-variant">Sold (Total)</span>
              <span className="material-symbols-outlined text-primary">sell</span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-background">{soldListings}</div>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container border-b border-outline-variant">
                <tr>
                  <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Vehicle</th>
                  <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Price</th>
                  <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Status</th>
                  <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Added</th>
                  <th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-md">

                {allVehicles.map(vehicle => (
                  <tr key={vehicle.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img alt={vehicle.imageAlt} className="w-16 h-12 rounded object-cover border border-outline-variant" src={vehicle.imageUrl} />
                        <div>
                          <div className="font-label-bold text-on-surface">{vehicle.year} {vehicle.make} {vehicle.model}</div>
                          <div className="text-label-sm text-on-surface-variant mt-1 flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full border border-outline-variant" style={{ backgroundColor: vehicle.color }} title={vehicle.color}></div>
                            <span>• {vehicle.mileage.toLocaleString()} km</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-label-bold text-primary">₹{vehicle.price.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-bold ${vehicle.status === 'Live' ? 'bg-secondary-container text-on-secondary-container' :
                        vehicle.status === 'Pending' ? 'bg-tertiary-container text-on-tertiary-container' :
                          'bg-surface-variant text-on-surface-variant'
                        }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant">{vehicle.createdAt.toLocaleDateString()}</td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/staff/inventory`} className="text-primary hover:text-primary-container font-label-bold text-label-bold transition-colors">Edit</Link>
                    </td>
                  </tr>
                ))}

                {allVehicles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-on-surface-variant">No vehicles found.</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-outline-variant bg-surface flex items-center justify-between">
            <span className="text-label-sm font-label-sm text-on-surface-variant">Showing all {allVehicles.length} entries</span>
          </div>
        </div>
      </main>

    </div>
  );
}
