"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../components/StaffSidebar';
import VehicleForm from '../../../components/VehicleForm';
import { useInventory } from '../../../lib/useInventory';

export default function NewVehiclePage() {
    const router = useRouter();
    const { addVehicle } = useInventory();

    const handleSave = (vehicleData: any) => {
        const id = Math.random().toString(36).substr(2, 9);
        addVehicle({ id, ...vehicleData });
        router.push('/staff/inventory');
    };

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />
            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <header className="mb-stack-lg flex justify-between items-end">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Add New Vehicle</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Enter the details for the new inventory listing.</p>
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
                            Save Vehicle
                        </button>
                    </div>
                </header>
                
                <VehicleForm onSubmit={handleSave} />
            </main>
        </div>
    );
}
