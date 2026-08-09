"use client";

import Link from 'next/link';
import StaffSidebar from '../../../components/StaffSidebar';
import { useInspections } from '../../../lib/useInspections';
import { use } from 'react';

export default function ViewInspectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { getInspection, isLoaded } = useInspections();
    const { id } = use(params);

    if (!isLoaded) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading inspection data...</p>
                </main>
            </div>
        );
    }

    const inspection = getInspection(id);

    if (!inspection) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Inspection not found.</p>
                    <Link href="/staff/inspections" className="text-primary hover:underline mt-4 inline-block">Return to Inspections</Link>
                </main>
            </div>
        );
    }

    const getStatusBadgeColor = (status: string) => {
        switch(status) {
            case 'Passed': return 'bg-secondary-container text-on-secondary-container';
            case 'Failed': return 'bg-error-container text-error';
            case 'Pending': return 'bg-surface-variant text-on-surface-variant';
            default: return 'bg-surface-variant text-on-surface-variant';
        }
    };

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />
            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <header className="mb-stack-lg flex justify-between items-end max-w-3xl">
                    <div>
                        <Link href="/staff/inspections" className="text-primary hover:underline font-label-bold text-label-bold flex items-center gap-1 mb-4">
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Back to Inspections
                        </Link>
                        <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Inspection Report: {inspection.id}</h2>
                        <div className="flex gap-3 items-center">
                            <span className="font-body-md text-body-md text-on-surface-variant">Generated on {inspection.date}</span>
                            <span className={`px-3 py-1 rounded font-label-bold text-xs shadow-sm ${getStatusBadgeColor(inspection.status)}`}>
                                {inspection.status}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link 
                            href={`/staff/inspections/edit/${inspection.id}`} 
                            className="px-6 py-2 rounded bg-primary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(139,62,47,0.15)] flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                            Edit Details
                        </Link>
                    </div>
                </header>

                <div className="max-w-3xl space-y-stack-md">
                    <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
                        <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">directions_car</span>
                            Vehicle Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Vehicle</p>
                                <p className="font-body-lg text-body-lg text-on-surface font-semibold">{inspection.vehicleTitle}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">VIN</p>
                                <p className="font-body-lg text-body-lg text-on-surface font-mono">{inspection.vin}</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
                        <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">fact_check</span>
                            Inspection Overview
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Assigned Inspector</p>
                                <p className="font-body-lg text-body-lg text-on-surface">{inspection.inspector}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Inspection Date</p>
                                <p className="font-body-lg text-body-lg text-on-surface">{inspection.date}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Score</p>
                                <p className="font-headline-md text-headline-md text-primary font-bold">{inspection.score}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Final Status</p>
                                <p className="font-body-lg text-body-lg text-on-surface">{inspection.status}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
