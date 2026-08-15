import { notFound } from 'next/navigation';
import { db } from '../../../../db';
import { vehicles } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { formatIndianCurrency } from '../../../utils';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ScheduleVisitForm from '../../../components/ScheduleVisitForm';
import VerifiedBadge from '../../../components/VerifiedBadge';

export default async function ScheduleVisitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicleRecord = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  const vehicle = vehicleRecord[0];
  
  if (!vehicle) return notFound();

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      <Navbar />

      {/* Content wrapper */}
      <main className="flex-grow flex flex-col md:flex-row max-w-[1280px] mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg gap-stack-lg">
        
        {/* Left Sidebar: Context & Summary */}
        <aside className="w-full md:w-1/3 flex flex-col space-y-stack-md shrink-0">
          <Link href={`/vehicle/${vehicle.id}`} className="inline-flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors group cursor-pointer w-fit">
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform" data-icon="arrow_back">arrow_back</span>
            <span className="font-label-md text-label-md">Back to listing</span>
          </Link>

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md shadow-sm">
            <div className="h-48 rounded-lg overflow-hidden mb-stack-sm relative">
              <img alt={vehicle.imageAlt || `${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" src={vehicle.imageUrl} />
              {vehicle.isCertified && (
                <VerifiedBadge className="absolute top-stack-sm right-stack-sm z-10" />
              )}
            </div>
            
            <div className="space-y-1">
              <p className="font-label-md text-label-md text-on-surface-variant">{vehicle.year}</p>
              <h2 className="font-headline-md text-headline-md text-on-surface">{vehicle.make} {vehicle.model}</h2>
              <p className="font-body-md text-body-md text-on-surface mt-xs">{formatIndianCurrency(vehicle.price)}</p>
            </div>
            

          </div>
        </aside>

        {/* Right Main Area: Booking Interface */}
        <div className="w-full md:w-2/3 flex flex-col space-y-stack-lg">
          <header>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Schedule Visit</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Select a preferred date and time to view the vehicle in person or arrange a test drive.</p>
          </header>
          <ScheduleVisitForm vehicleId={vehicle.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
