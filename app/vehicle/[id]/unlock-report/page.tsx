import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '../../../../db';
import { vehicles } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import { formatIndianCurrency } from '../../../utils';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PaymentOptions from '../../../components/PaymentOptions';
import RazorpayButton from '../../../components/RazorpayButton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicleRecord = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  const vehicle = vehicleRecord[0];
  if (!vehicle) return notFound();

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-surface">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-stack-lg px-margin-mobile md:px-margin-desktop">
        <div className="glass-card rounded-xl shadow-sm max-w-2xl w-full p-stack-md md:p-stack-lg bg-surface-container-lowest">
          
          <div className="mb-stack-lg">
            <Link href={`/vehicle/${vehicle.id}`} className="flex items-center gap-2 text-surface-variant hover:text-primary transition-colors duration-200 w-fit">
              <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
              <span className="font-label-md text-label-md">Back to listing</span>
            </Link>
          </div>

          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-on-surface mb-2">Unlock Full Report</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Complete your transaction for instant access to premium insights.</p>
          </div>

          {/* Vehicle Summary Context */}
          <div className="flex items-center gap-stack-md p-stack-md bg-surface-container-low rounded-lg mb-stack-lg border border-outline-variant/30">
            <div className="w-24 h-16 rounded-md overflow-hidden bg-secondary-container flex-shrink-0">
              <img className="w-full h-full object-cover" data-alt={vehicle.imageAlt} src={vehicle.imageUrl} alt={vehicle.title} />
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{formatIndianCurrency(vehicle.price)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg mb-stack-lg">
            {/* Benefits List */}
            <div>
              <h4 className="font-label-md text-label-md text-on-surface uppercase mb-stack-md tracking-wider">What&apos;s included</h4>
              <ul className="space-y-stack-sm">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#3F5D4E]" data-icon="check_circle">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Full Service History</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#3F5D4E]" data-icon="check_circle">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">150-Point Inspection Report</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#3F5D4E]" data-icon="check_circle">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Verified Documentation</span>
                </li>
              </ul>
            </div>

            {/* Payment Selection */}
            <div>
              <div className="flex justify-between items-baseline mb-stack-md border-b border-outline-variant/30 pb-stack-sm">
                <span className="font-body-lg text-body-lg text-on-surface-variant">Total Amount</span>
                <span className="font-headline-md text-headline-md text-on-surface">₹2,499</span>
              </div>
              <PaymentOptions />
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-stack-lg border-t border-outline-variant/30 pt-stack-lg text-center">
            <RazorpayButton vehicleId={vehicle.id} amount={2499} />
            <p className="mt-stack-sm font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]" data-icon="verified_user">verified_user</span>
              Secure 256-bit encrypted payment. Instant access after successful transaction.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
