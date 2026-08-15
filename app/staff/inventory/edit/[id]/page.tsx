import Link from 'next/link';
import StaffSidebar from '@/app/components/StaffSidebar';
import StaffHeader from '@/app/components/StaffHeader';
import VehicleForm from '@/app/components/VehicleForm';
import VehicleQR from '@/app/components/VehicleQR';
import { db } from '@/db';
import { vehicles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const vehicle = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);

    if (!vehicle || vehicle.length === 0) {
        return (
            <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
                <StaffSidebar />
                <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
                    <StaffHeader title="Inventory" icon="directions_car" />
                    <div className="flex-1 p-8 text-center">
                        <p className="font-body-md text-on-surface">Vehicle not found.</p>
                        <Link href="/staff/inventory" className="text-primary hover:underline mt-4 inline-block">Return to Inventory</Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
            <StaffSidebar />
            <main className="flex flex-1 flex-col overflow-hidden bg-surface-bright">
                <StaffHeader title="Inventory" icon="directions_car" />
                
                <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop pt-8 pb-32 custom-scrollbar">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-on-surface-variant mb-2 font-label-sm text-label-sm uppercase">
                            <Link href="/staff/inventory" className="hover:text-primary transition-colors">Inventory</Link>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-primary">Edit Vehicle</span>
                        </div>
                        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Edit Vehicle</h2>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1 w-full">
                            <VehicleForm initialData={vehicle[0]} />
                        </div>
                        <div className="w-full lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
                            <VehicleQR vehicleId={id} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
