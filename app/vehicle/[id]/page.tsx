import { notFound } from 'next/navigation';
import { formatIndianCurrency } from '../../utils';
import { db } from '../../../db';
import { vehicles } from '../../../db/schema';
import { eq } from 'drizzle-orm';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactDealerModal from '../../components/ContactDealerModal';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicleRecord = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  const vehicle = vehicleRecord[0];
  if (!vehicle) return notFound();

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col font-body-md text-body-md">


      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">

        <section className="flex flex-col gap-stack-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-sm">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wide border border-surface-dim">{vehicle.transmission}</span>
                <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wide border border-surface-dim">{vehicle.fuelType}</span>
                <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wide border border-surface-dim">{vehicle.owners}</span>
              </div>
              <h1 className="font-display-lg text-display-lg md:text-[48px] text-on-background">{vehicle.title}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">{vehicle.mileage.toLocaleString('en-IN')} km • {vehicle.status}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-display-lg text-[32px] md:text-[40px] text-primary font-bold">{formatIndianCurrency(vehicle.price)}</p>
            </div>
          </div>

          <div className="h-[50vh] md:h-[60vh] rounded-xl overflow-hidden shadow-ambient-sm relative group cursor-pointer">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt={vehicle.imageAlt} src={vehicle.imageUrl} />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          <div className="lg:col-span-8 flex flex-col gap-stack-lg">
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-ambient-sm border border-surface-variant">
              <h2 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-4 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="tune">tune</span>
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Make</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">{vehicle.make}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Model</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">{vehicle.model}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Year</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Transmission</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Body Type</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">{vehicle.bodyType}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Color</p>
                  <p className="font-body-md text-body-md text-on-background font-medium flex items-center gap-2">
                    <span className="w-4 h-4 inline-block rounded-full border border-outline-variant" style={{ backgroundColor: vehicle.color }}></span>
                    <span className="uppercase">{vehicle.color}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-ambient-sm border border-surface-variant">
              <h2 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-4 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="description">description</span>
                Description
              </h2>
              {vehicle.description ? (
                <div
                  className="font-body-md text-body-md text-on-surface-variant leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0"
                  dangerouslySetInnerHTML={{ __html: vehicle.description }}
                />
              ) : (
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed italic">
                  No description provided.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-stack-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden border border-outline-variant relative">

              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#8b3e2f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              <div className="p-stack-md relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 shadow-sm border border-surface-variant">
                  <span className="material-symbols-outlined text-[#D4AF37] text-3xl filled-icon" data-icon="lock">lock</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-2">Inspection Report &amp; Service History</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 px-4">
                  Access a comprehensive 140-point inspection, complete service timeline, and structural integrity verification.
                </p>

                <Link href={`/vehicle/${id}/unlock-report`} className="w-full bg-accent-orange text-on-primary font-label-bold text-label-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity shadow-md relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
                  <span className="material-symbols-outlined text-[#D4AF37]" data-icon="key">key</span>
                  Unlock Report — ₹199
                </Link>
                <ContactDealerModal vehicleId={vehicle.id} vehicleModel={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
              </div>
            </div>

            {vehicle.isCertified && (
              <div className="bg-verified-green rounded-xl p-6 flex items-start gap-4 shadow-ambient-sm">
                <span className="material-symbols-outlined text-[#D4AF37] text-3xl filled-icon" data-icon="verified">verified</span>
                <div>
                  <h4 className="font-label-bold text-label-bold text-surface-bright mb-1">Verified Excellence</h4>
                  <p className="font-body-md text-body-md text-green-100 text-sm">This vehicle has passed our rigorous physical and mechanical vetting process.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />



    </div>
  );
}
