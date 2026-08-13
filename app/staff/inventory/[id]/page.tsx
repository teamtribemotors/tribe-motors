import { notFound } from 'next/navigation';
import { db } from '../../../../db';
import { vehicles } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import StaffSidebar from '../../../components/StaffSidebar';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicleRecord = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  const vehicle = vehicleRecord[0];
  if (!vehicle) return notFound();
  
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const publicUrl = `${protocol}://${host}/vehicle/${id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(publicUrl)}`;

  return (
    <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
      <StaffSidebar />

      <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
        <header className="mb-stack-lg flex justify-between items-end border-b border-outline-variant pb-6">
            <div>
                <Link href="/staff/inventory" className="text-on-surface-variant hover:text-primary flex items-center gap-1 text-sm font-label-bold mb-2">
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Inventory
                </Link>
                <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Vehicle Details</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">View internal information and assets for this vehicle.</p>
            </div>
            <div className="flex gap-4">
                <Link href={`/staff/inventory/edit/${id}`} className="px-6 py-2 rounded border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-primary-fixed hover:border-primary-fixed transition-colors">
                    Edit
                </Link>
                <Link target="_blank" href={`/vehicle/${id}`} className="px-6 py-2 rounded bg-primary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                    <span className="material-symbols-outlined">visibility</span>
                    Preview Public Page
                </Link>
            </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            <div className="lg:col-span-2 flex flex-col gap-stack-md">
                <div className="bg-surface-container-lowest rounded-xl shadow-ambient-sm border border-surface-variant overflow-hidden">
                    <div className="aspect-[3/2] w-full relative bg-surface-variant">
                        <img className="w-full h-full object-cover" src={vehicle.imageUrl} alt={vehicle.imageAlt} />
                        <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-label-bold shadow-sm">
                            {vehicle.status}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="font-display-sm text-display-sm text-on-background mb-2">{vehicle.title}</h3>
                        <div className="flex gap-3 mb-6">
                            <span className="bg-surface-container px-3 py-1 rounded font-label-sm text-on-surface uppercase tracking-wide">{vehicle.transmission}</span>
                            <span className="bg-surface-container px-3 py-1 rounded font-label-sm text-on-surface uppercase tracking-wide">{vehicle.fuelType}</span>
                            <span className="bg-surface-container px-3 py-1 rounded font-label-sm text-on-surface uppercase tracking-wide">{vehicle.mileage.toLocaleString('en-IN')} km</span>
                        </div>
                        <p className="font-headline-md text-primary font-bold">₹ {vehicle.price.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col gap-stack-md">
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient-sm border border-surface-variant flex flex-col items-center text-center">
                    <h3 className="font-headline-sm text-headline-sm text-on-background mb-4">Public Link QR Code</h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-outline-variant inline-block mb-4">
                        <img src={qrCodeUrl} alt="QR Code" width={200} height={200} className="w-[200px] h-[200px]" />
                    </div>
                    <p className="font-body-sm text-on-surface-variant mb-4">Scan to view the public listing, or save as PNG for marketing.</p>
                    <a href={qrCodeUrl} download={`qr-${vehicle.id}.png`} target="_blank" className="text-primary font-label-bold hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">download</span> Download PNG
                    </a>
                </div>
                
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient-sm border border-surface-variant">
                    <h3 className="font-headline-sm text-headline-sm text-on-background mb-4 border-b border-surface-variant pb-2">Internal Specs</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <span className="text-on-surface-variant text-sm">Color</span>
                            <span className="font-label-bold flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full border border-outline-variant" style={{ backgroundColor: vehicle.color }}></span>
                                {vehicle.color}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-on-surface-variant text-sm">Body Type</span>
                            <span className="font-label-bold">{vehicle.bodyType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-on-surface-variant text-sm">Owners</span>
                            <span className="font-label-bold">{vehicle.owners}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-on-surface-variant text-sm">Certified</span>
                            <span className="font-label-bold">{vehicle.isCertified ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
