import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import StaffSidebar from '../../../../components/StaffSidebar';
import VehicleForm from '../../../../components/VehicleForm';
import { db } from '../../../../db';
import { vehicles } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const vehicle = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);

    if (!vehicle || vehicle.length === 0) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Vehicle not found.</p>
                    <Link href="/staff/inventory" className="text-primary hover:underline mt-4 inline-block">Return to Inventory</Link>
                </main>
            </div>
        );
    }

    // Server Action embedded or pass initialData directly since it's a Client Component
    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />
            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <header className="mb-stack-lg flex justify-between items-end">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Edit Vehicle</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Update the details for this inventory listing.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/staff/inventory" className="px-6 py-2 rounded border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-primary-fixed hover:border-primary-fixed transition-colors">
                            Cancel
                        </Link>
                        <button
                            className="px-6 py-2 rounded bg-primary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(139,62,47,0.15)]"
                            form="vehicle-form"
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </div>
                </header>

                {/* We just need to handle the success redirect from client side. But actually VehicleForm is client so we can just let it handle. Wait, we can't pass a function to a Client Component from a Server Component. We will redirect via a Server Action or we can use next/navigation in the Client Component. */}
                {/* Wait, VehicleForm takes onSuccess as a prop. Since VehicleForm is "use client", we can't pass a Server function unless it's a Server Action. */}
                <VehicleForm initialData={vehicle[0]} />
            </main>
        </div>
    );
}

{/* Wait, let me just replace this entirely by making a small client wrapper or moving `useRouter` to VehicleForm. */}
