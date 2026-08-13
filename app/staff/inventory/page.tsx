import Link from 'next/link';
import StaffSidebar from '../../components/StaffSidebar';
import { db } from '../../../db';
import { vehicles } from '../../../db/schema';
import { desc } from 'drizzle-orm';
import { deleteVehicle } from './actions';

export default async function Page() {
  const data = await db.select().from(vehicles).orderBy(desc(vehicles.createdAt));

  return (
    <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
      <StaffSidebar />

      <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64">
        <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto">

          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-md">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Inventory Management</h2>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Search Make or Model..." type="text" />
              </div>
              <select className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-label-bold text-label-bold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none">
                <option value="">Status: All</option>
                <option value="live">Live</option>
                <option value="sold">Sold</option>
                <option value="draft">Draft</option>
              </select>
              <select className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-label-bold text-label-bold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none">
                <option value="newest">Sort: Newest</option>
                <option value="price_desc">Price: High - Low</option>
                <option value="price_asc">Price: Low - High</option>
              </select>

              <Link href="/staff/inventory/new" className="hidden md:flex ml-4 bg-primary text-on-primary font-label-bold text-label-bold py-2 px-4 rounded-lg shadow-sm hover:opacity-90 transition-opacity items-center gap-2">
                <span className="material-symbols-outlined">add</span>
                Add Vehicle
              </Link>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter pb-12">
            {data.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/50 mb-4">directions_car</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No vehicles in inventory</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">Your inventory is empty. Start adding vehicles to display them here and on the main website.</p>
                <Link href="/staff/inventory/new" className="bg-primary text-on-primary font-label-bold text-label-bold py-2 px-6 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span className="material-symbols-outlined">add</span>
                  Add First Vehicle
                </Link>
              </div>
            ) : (
              data.map((vehicle) => {
                let badgeColor = "bg-secondary-container text-on-secondary-container";
                if (vehicle.status === "Draft") badgeColor = "bg-surface-dim text-on-surface";
                if (vehicle.status === "Sold") badgeColor = "bg-surface-tint text-on-primary";

                const formattedPrice = new Intl.NumberFormat('en-IN', {
                  style: 'currency', currency: 'INR',
                  maximumFractionDigits: 0
                }).format(Number(vehicle.price));

                return (
                  <article key={vehicle.id} className={`bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300 relative ${vehicle.status === 'Sold' ? 'opacity-75' : ''}`}>
                    <Link href={`/staff/inventory/${vehicle.id}`} className="absolute inset-0 z-0" aria-label={`View ${vehicle.title}`}></Link>
                    <div className="relative aspect-[3/2] overflow-hidden bg-surface-variant pointer-events-none">
                      <img alt={vehicle.imageAlt} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${vehicle.status === 'Sold' ? 'grayscale' : ''}`} src={vehicle.imageUrl} />
                      {vehicle.status === 'Sold' && (
                        <div className="absolute inset-0 bg-background/20"></div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`${badgeColor} px-3 py-1 rounded font-label-bold text-label-bold shadow-sm`}>{vehicle.status}</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-1 gap-2 pointer-events-none">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2">{vehicle.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface">{vehicle.transmission}</span>
                        <span className="bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface">{vehicle.fuelType}</span>
                        <span className="bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface">{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                    <div className="px-4 md:px-6 pb-4 md:pb-6 mt-auto">
                      <div className="pt-4 border-t border-outline-variant flex justify-between items-center relative z-10">
                        <div className={`font-headline-md text-headline-md font-bold pointer-events-none ${vehicle.status === 'Sold' ? 'text-outline line-through' : 'text-primary'}`}>{formattedPrice}</div>
                        <div className="flex gap-2">
                          <form action={async () => {
                            'use server';
                            await deleteVehicle(vehicle.id);
                          }}>
                            <button
                              aria-label="Delete Vehicle"
                              type="submit"
                              className="text-on-surface-variant hover:text-error hover:bg-error-container w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </form>
                          {vehicle.status !== 'Sold' && (
                            <Link
                              href={`/staff/inventory/edit/${vehicle.id}`}
                              aria-label="Edit Vehicle"
                              className="text-on-surface-variant hover:text-primary hover:bg-surface-variant w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                            >
                              <span className="material-symbols-outlined">edit</span>
                            </Link>
                          )}
                          {vehicle.status === 'Sold' && (
                            <Link href={`/staff/inventory/${vehicle.id}`} aria-label="View Details" className="text-on-surface-variant hover:bg-surface-variant w-10 h-10 flex items-center justify-center rounded-full transition-colors">
                              <span className="material-symbols-outlined">visibility</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

        </div>
      </main>

    </div>
  );
}
