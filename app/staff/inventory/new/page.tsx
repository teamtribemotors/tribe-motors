"use client";

import Link from 'next/link';
import StaffSidebar from '../../../components/StaffSidebar';
import StaffHeader from '../../../components/StaffHeader';
import VehicleForm from '../../../components/VehicleForm';

export default function NewVehiclePage() {
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
                            <span className="text-primary">Add New Vehicle</span>
                        </div>
                        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Add New Vehicle</h2>
                    </div>
                    
                    <VehicleForm />
                </div>
            </main>
        </div>
    );
}
