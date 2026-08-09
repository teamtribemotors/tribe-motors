"use client";

import Link from 'next/link';
import StaffSidebar from '../../components/StaffSidebar';
import { useInventory } from '../../lib/useInventory';

export default function Page() {
  const { vehicles, isLoaded, deleteVehicle } = useInventory();

  if (!isLoaded) {
    return (
      <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
        <StaffSidebar />
        <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
          <p>Loading inventory...</p>
        </main>
      </div>
    );
  }

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
                <input className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Search VIN, Make, Model..." type="text" />
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
            {vehicles.map((vehicle) => {
              let badgeColor = "bg-secondary-container text-on-secondary-container";
              if (vehicle.status === "Draft") badgeColor = "bg-surface-dim text-on-surface";
              if (vehicle.status === "Sold") badgeColor = "bg-surface-tint text-on-primary";

              return (
                <article key={vehicle.id} className={`bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden flex flex-col group cursor-pointer hover:shadow-lg transition-shadow duration-300 ${vehicle.status === 'Sold' ? 'opacity-75' : ''}`}>
                  <div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
                    <img alt={vehicle.imageAlt} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${vehicle.status === 'Sold' ? 'grayscale' : ''}`} src={vehicle.imageUrl} />
                    {vehicle.status === 'Sold' && (
                      <div className="absolute inset-0 bg-background/20"></div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`${badgeColor} px-3 py-1 rounded font-label-bold text-label-bold shadow-sm`}>{vehicle.status}</span>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-1 gap-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2">{vehicle.title}</h3>
                    </div>
                    <div className="font-body-md text-body-md text-on-surface-variant mb-2">VIN: {vehicle.vin}</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface">{vehicle.transmission}</span>
                      <span className="bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface">{vehicle.fuelType}</span>
                      <span className="bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface">{vehicle.mileage}</span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                      <div className={`font-headline-md text-headline-md font-bold ${vehicle.status === 'Sold' ? 'text-outline line-through' : 'text-primary'}`}>{vehicle.price}</div>
                      <div className="flex gap-2">
                        <button
                          aria-label="Delete Vehicle"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this vehicle?')) {
                              deleteVehicle(vehicle.id);
                            }
                          }}
                          className="text-on-surface-variant hover:text-error hover:bg-error-container w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
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
                          <button aria-label="View Details" className="text-on-surface-variant hover:bg-surface-variant w-10 h-10 flex items-center justify-center rounded-full transition-colors">
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </main>

    </div>
  );
}
