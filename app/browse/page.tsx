import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import SortDropdown from '../components/SortDropdown';
import { db } from '../../db';
import { vehicles } from '../../db/schema';
import { and, gte, lte, eq, count, asc, desc, inArray } from 'drizzle-orm';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const minPrice = resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined;
  const maxPrice = resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined;
  const year = resolvedSearchParams.year ? Number(resolvedSearchParams.year) : undefined;
  const sort = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : undefined;
  const makeParam = resolvedSearchParams.make as string;
  const selectedMakes = makeParam ? makeParam.split(',').filter(Boolean) : [];

  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;
  const pageSize = 6;
  const offset = (page - 1) * pageSize;

  const filters = [];
  if (minPrice) filters.push(gte(vehicles.price, minPrice));
  if (maxPrice) filters.push(lte(vehicles.price, maxPrice));
  if (year) filters.push(eq(vehicles.year, year));
  if (selectedMakes.length > 0) filters.push(inArray(vehicles.make, selectedMakes));

  // Determine Order By
  let orderBy = [desc(vehicles.createdAt)];
  if (sort === 'price_asc') orderBy = [asc(vehicles.price)];
  if (sort === 'price_desc') orderBy = [desc(vehicles.price)];
  if (sort === 'year_desc') orderBy = [desc(vehicles.year)];

  const data = await db.select().from(vehicles).where(and(...filters)).orderBy(...orderBy).limit(pageSize).offset(offset);
  const totalCountResult = await db.select({ count: count() }).from(vehicles).where(and(...filters));
  const totalCount = totalCountResult[0].count;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Fetch available makes
  const makesCountResult = await db.select({ make: vehicles.make, count: count() }).from(vehicles).groupBy(vehicles.make);
  const availableMakes = makesCountResult.map(row => ({ name: row.make, count: row.count }));

  // Helper for active filters
  const currentParams = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([k, v]) => {
    if (v) currentParams.set(k, String(v));
  });

  const getClearUrl = (keyToClear: string, valueToClear?: string) => {
    const params = new URLSearchParams(currentParams.toString());
    if (valueToClear && keyToClear === 'make') {
      const current = params.get('make')?.split(',') || [];
      const updated = current.filter(m => m !== valueToClear);
      if (updated.length > 0) {
        params.set('make', updated.join(','));
      } else {
        params.delete('make');
      }
    } else {
      params.delete(keyToClear);
    }
    params.delete('page');
    return `/browse?${params.toString()}`;
  };

  const hasActiveFilters = minPrice || maxPrice || year || selectedMakes.length > 0;

  return (
    <>
      <Navbar />
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-4">
          <div>
            <h1 className="text-display-lg font-display-lg text-on-background mb-2">Browse Cars</h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant">{totalCount} Verified Vehicles Found</p>
          </div>
          <Suspense fallback={null}>
            <SortDropdown />
          </Suspense>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-stack-md items-center">
            {selectedMakes.map(make => (
              <Link key={`make-${make}`} href={getClearUrl('make', make)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full trust-badge font-label-sm text-label-sm hover:opacity-80 transition-opacity">
                Make: {make}
                <span className="material-symbols-outlined text-[16px]" data-icon="close">close</span>
              </Link>
            ))}
            {minPrice && (
              <Link href={getClearUrl('minPrice')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full trust-badge font-label-sm text-label-sm hover:opacity-80 transition-opacity">
                Min Price: ₹{minPrice.toLocaleString()}
                <span className="material-symbols-outlined text-[16px]" data-icon="close">close</span>
              </Link>
            )}
            {maxPrice && (
              <Link href={getClearUrl('maxPrice')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full trust-badge font-label-sm text-label-sm hover:opacity-80 transition-opacity">
                Max Price: ₹{maxPrice.toLocaleString()}
                <span className="material-symbols-outlined text-[16px]" data-icon="close">close</span>
              </Link>
            )}
            {year && (
              <Link href={getClearUrl('year')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full trust-badge font-label-sm text-label-sm hover:opacity-80 transition-opacity">
                Year: {year}
                <span className="material-symbols-outlined text-[16px]" data-icon="close">close</span>
              </Link>
            )}
            
            <Link href="/browse" className="text-primary font-label-md hover:underline ml-2">Clear All</Link>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar (Filters) */}
          <aside className="w-full md:w-1/4 shrink-0">
            <Suspense fallback={<div className="p-4">Loading filters...</div>}>
              <Filters availableMakes={availableMakes} />
            </Suspense>
          </aside>

          {/* Main Content (Grid) */}
          <div className="w-full md:w-3/4">
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-container-lowest rounded-2xl border border-surface-variant ambient-shadow-sm w-full">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-3xl text-outline">search_off</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">No vehicles found</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-6">
                  We couldn&apos;t find any vehicles matching your current filters. Try adjusting your search criteria to see more results.
                </p>
                <Link href="/browse" className="inline-flex h-10 px-6 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg items-center justify-center hover:opacity-90 transition-opacity">
                  Clear Filters
                </Link>
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-stack-xl">
              <Suspense fallback={null}>
                <Pagination totalPages={totalPages} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
