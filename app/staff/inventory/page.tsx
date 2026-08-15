import Link from 'next/link';
import { formatIndianCurrency } from '../../utils';
import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';
import { db } from '../../../db';
import { vehicles } from '../../../db/schema';
import { desc } from 'drizzle-orm';
import { deleteVehicle } from './actions';

export default async function Page() {
  const data = await db.select().from(vehicles).orderBy(desc(vehicles.createdAt));

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
      <StaffSidebar />

      <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
        <StaffHeader title="Inventory" icon="directions_car" />

        <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-8 custom-scrollbar">
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1 tracking-tight">Inventory</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Manage and view the current vehicle catalogue.</p>
            </div>
            <Link href="/staff/inventory/new" className="bg-[#FE3B01] hover:bg-primary text-on-primary font-label-md text-label-md px-8 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 min-h-[48px]">
              <span className="material-symbols-outlined">add</span>
              Add New Vehicle
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-12 border-b border-outline-variant mb-6 overflow-x-auto hide-scrollbar">
            <button className="pb-3 font-label-md text-label-md text-primary border-b-2 border-primary whitespace-nowrap">All</button>
            <button className="pb-3 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">Draft</button>
            <button className="pb-3 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">Live</button>
            <button className="pb-3 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">Pending</button>
            <button className="pb-3 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap">Sold</button>
          </div>

          {/* Data Table Container */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              {data.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant/50 mb-4">directions_car</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No vehicles in inventory</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">Your inventory is empty. Start adding vehicles to display them here and on the main website.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/50">
                      <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Vehicle</th>
                      <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Price (INR)</th>
                      <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
                      <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Date Added</th>
                      <th className="py-4 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50">
                    {data.map((vehicle) => {
                      let badgeColor = "bg-[#3F5D4E] text-on-primary"; // Live
                      if (vehicle.status === "Draft") badgeColor = "bg-secondary text-on-primary";
                      if (vehicle.status === "Pending") badgeColor = "bg-[#FE3B01] text-on-primary";
                      if (vehicle.status === "Sold") badgeColor = "bg-on-background text-on-primary";

                      const formattedPrice = formatIndianCurrency(vehicle.price);
                      const isSold = vehicle.status === 'Sold';

                      return (
                        <tr key={vehicle.id} className={`hover:bg-surface-container-low transition-colors group ${isSold ? 'opacity-75' : ''}`}>
                          <td className="py-3 px-6 flex items-center gap-4">
                            {vehicle.imageUrl ? (
                              <img className={`w-16 h-12 rounded object-cover border border-outline-variant/30 ${isSold ? 'grayscale' : ''}`} src={vehicle.imageUrl} alt={vehicle.imageAlt || vehicle.title} />
                            ) : (
                              <div className="w-16 h-12 rounded bg-surface-container-high flex items-center justify-center border border-outline-variant/30">
                                <span className="material-symbols-outlined text-on-surface-variant">directions_car</span>
                              </div>
                            )}
                            <div>
                              <p className="font-label-md text-label-md text-on-surface">{vehicle.title}</p>
                              <p className="font-body-md text-sm text-on-surface-variant">{vehicle.make} / {vehicle.fuelType}</p>
                            </div>
                          </td>
                          <td className={`py-3 px-6 font-body-md text-body-md text-on-surface ${isSold ? 'line-through decoration-on-surface-variant decoration-1' : ''}`}>
                            {formattedPrice}
                          </td>
                          <td className="py-3 px-6">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full ${badgeColor} font-label-sm text-[10px]`}>
                              {vehicle.status}
                            </span>
                          </td>
                          <td className="py-3 px-6 font-body-md text-sm text-on-surface-variant">
                            {new Date(vehicle.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-6 text-right">
                            <div className="flex justify-end items-center">
                              {!isSold && (
                                <Link href={`/staff/inventory/edit/${vehicle.id}`} className="text-on-surface-variant hover:text-primary transition-colors p-1" aria-label="Edit">
                                  <span className="material-symbols-outlined">edit</span>
                                </Link>
                              )}
                              <Link href={`/staff/inventory/${vehicle.id}`} className="text-on-surface-variant hover:text-primary transition-colors p-1 ml-2" aria-label="View">
                                <span className="material-symbols-outlined">visibility</span>
                              </Link>
                              <form action={async () => {
                                'use server';
                                await deleteVehicle(vehicle.id);
                              }}>
                                <button type="submit" className="text-on-surface-variant hover:text-error transition-colors p-1 ml-2" aria-label="Delete">
                                  <span className="material-symbols-outlined">delete</span>
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            
            {data.length > 0 && (
              <div className="bg-surface-container-low border-t border-outline-variant/50 py-3 px-6 flex justify-between items-center">
                <p className="font-body-md text-sm text-on-surface-variant">Showing {data.length} entries</p>
                <div className="flex gap-2">
                  <button className="p-1 text-on-surface-variant hover:bg-surface rounded transition-colors disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="p-1 text-on-surface-variant hover:bg-surface rounded transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
