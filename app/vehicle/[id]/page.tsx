import { notFound } from 'next/navigation';
import { formatIndianCurrency } from '../../utils';
import { db } from '../../../db';
import { vehicles } from '../../../db/schema';
import { eq } from 'drizzle-orm';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactDealerModal from '../../components/ContactDealerModal';
import Link from 'next/link';
import VehicleGallery from '../../components/VehicleGallery';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicleRecord = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  const vehicle = vehicleRecord[0];
  if (!vehicle) return notFound();

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col font-body-md text-body-md">


      <Navbar />

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pt-stack-lg pb-28 md:pb-stack-lg flex flex-col md:grid md:grid-cols-12 gap-y-stack-lg md:gap-gutter">
        {/* Breadcrumbs (Spans full width) */}
        <div className="order-1 md:col-span-12 mb-stack-sm pt-2">
          <nav aria-label="Breadcrumb" className="flex text-on-surface-variant font-body-md text-sm">
            <ol className="inline-flex flex-wrap items-center gap-2">
              <li className="inline-flex items-center">
                <Link className="hover:text-primary transition-colors" href="/browse">Inventory</Link>
              </li>
              <li>
                <span className="text-on-surface-variant/40">/</span>
              </li>
              <li className="inline-flex items-center">
                <Link className="hover:text-primary transition-colors" href={`/browse?make=${vehicle.make}`}>{vehicle.make}</Link>
              </li>
              <li>
                <span className="text-on-surface-variant/40">/</span>
              </li>
              <li aria-current="page" className="inline-flex items-center">
                <span className="text-on-surface font-medium">{vehicle.model}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Gallery */}
        <div className="order-2 md:col-span-8">
          <VehicleGallery
            images={vehicle.images as { url: string; section?: string; isMain?: boolean }[]}
            fallbackImageUrl={vehicle.imageUrl}
            imageAlt={vehicle.imageAlt}
          />
        </div>

        {/* Right Column: Sticky Info Panel (Title, Price, Actions, Trust CTA) */}
        <div className="order-3 md:col-span-4 md:row-span-2 relative">
          <div className="sticky top-[104px] flex flex-col gap-stack-md">
            {/* Core Info Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-stack-md rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-stack-sm">
                <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
                {vehicle.isCertified && (
                  <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-3 py-1 rounded-full whitespace-nowrap ml-2">Verified</span>
                )}
              </div>
              <div className="font-display-lg text-display-lg text-primary mb-stack-md">{formatIndianCurrency(vehicle.price)}</div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-stack-sm mb-stack-lg">
                <div className="flex flex-col bg-surface p-stack-sm rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">speed</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Distance</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{vehicle.distanceDriven.toLocaleString('en-IN')} km</span>
                </div>
                <div className="flex flex-col bg-surface p-stack-sm rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">settings</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Transmission</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{vehicle.transmission}</span>
                </div>
                <div className="flex flex-col bg-surface p-stack-sm rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">local_gas_station</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Fuel</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{vehicle.fuelType}</span>
                </div>
                <div className="flex flex-col bg-surface p-stack-sm rounded border border-outline-variant/20">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">person</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Owners</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{vehicle.owners}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest p-4 border-t border-outline-variant/30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex gap-3 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto md:bg-transparent md:p-0 md:border-none md:shadow-none md:flex-col md:gap-stack-sm">
                <Link href={`/vehicle/${vehicle.id}/schedule-visit`} className="flex-1 flex justify-center items-center bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-label-md h-[48px] rounded transition-colors duration-200 shadow-sm whitespace-nowrap">
                  Schedule
                </Link>
                <div className="flex-1">
                  <ContactDealerModal vehicleId={vehicle.id} vehicleModel={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
                </div>
              </div>
            </div>

            {/* Trust CTA */}
            <div className="bg-surface-container-lowest border-2 border-tertiary p-stack-md rounded-lg hidden md:block">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary">lock</span>
                <h4 className="font-label-md text-label-md text-on-surface font-bold">Unlock Full History Report</h4>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-sm">
                Get 150-point inspection results, accident history, and service records. <br /><span className="italic text-xs mt-1 block">14 people viewed this report today.</span>
              </p>
              <Link href={`/vehicle/${vehicle.id}/unlock-report`} className="flex items-center justify-center w-full bg-tertiary hover:bg-on-tertiary-fixed-variant text-on-tertiary font-label-md text-label-md h-[40px] rounded transition-colors duration-200">
                View Report
              </Link>
            </div>
          </div>
        </div>

        {/* Description & Detailed Specs */}
        <div className="order-4 md:col-span-8 flex flex-col gap-stack-lg">
          {/* Description */}
          {vehicle.description && vehicle.description.replace(/(<([^>]+)>)/gi, "").trim().length > 0 && (
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-stack-md rounded-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Description</h3>
              <div
                className="font-body-md text-body-md text-on-surface-variant mb-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: vehicle.description }}
              />
            </div>
          )}

          {/* Detailed Specs */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-stack-md rounded-lg">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-sm">
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Make</span>
                <span className="font-body-md text-body-md text-on-surface">{vehicle.make}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Model</span>
                <span className="font-body-md text-body-md text-on-surface">{vehicle.model}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Year</span>
                <span className="font-body-md text-body-md text-on-surface">{vehicle.year}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Transmission</span>
                <span className="font-body-md text-body-md text-on-surface">{vehicle.transmission}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Distance Driven</span>
                <span className="font-body-md text-body-md text-on-surface">{vehicle.distanceDriven.toLocaleString('en-IN')} km</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Body Type</span>
                <span className="font-body-md text-body-md text-on-surface">{vehicle.bodyType}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Exterior Color</span>
                <span className="font-body-md text-body-md text-on-surface uppercase">{vehicle.color}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />



    </div>
  );
}
