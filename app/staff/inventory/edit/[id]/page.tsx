"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../../components/StaffSidebar';
import VehicleForm from '../../../../components/VehicleForm';
import { useInventory } from '../../../../lib/useInventory';
import { use } from 'react';

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { getVehicle, updateVehicle, isLoaded } = useInventory();

    // In Next.js 15, params is a Promise that needs to be unwrapped with React.use()
    const { id } = use(params);

    if (!isLoaded) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading vehicle data...</p>
                </main>
            </div>
        );
    }

    const vehicle = getVehicle(id);

    if (!vehicle) {
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

    const handleSave = (vehicleData: any) => {
        updateVehicle(id, vehicleData);
        router.push('/staff/inventory');
    };

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

                <VehicleForm initialData={vehicle} onSubmit={handleSave} />
            </main>
        </div>
    );
}
