"use client";

import Link from 'next/link';
import StaffSidebar from '../../../components/StaffSidebar';
import { useServiceRecords } from '../../../lib/useServiceRecords';
import { use } from 'react';

export default function ViewRecordPage({ params }: { params: Promise<{ id: string }> }) {
    const { getRecord, isLoaded } = useServiceRecords();
    const { id } = use(params);

    if (!isLoaded) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading record data...</p>
                </main>
            </div>
        );
    }

    const record = getRecord(id);

    if (!record) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Service record not found.</p>
                    <Link href="/staff/records" className="text-primary hover:underline mt-4 inline-block">Return to Service Records</Link>
                </main>
            </div>
        );
    }

    const getStatusBadgeColor = (status: string) => {
        switch(status) {
            case 'Completed': return 'bg-secondary-container text-on-secondary-container';
            case 'Pending': return 'bg-surface-variant text-on-surface-variant';
            case 'In Progress': return 'bg-primary-container text-on-primary-container';
            default: return 'bg-surface-variant text-on-surface-variant';
        }
    };

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />
            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <header className="mb-stack-lg flex justify-between items-end max-w-3xl">
                    <div>
                        <Link href="/staff/records" className="text-primary hover:underline font-label-bold text-label-bold flex items-center gap-1 mb-4">
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            Back to Service Records
                        </Link>
                        <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Service Record: {record.id}</h2>
                        <div className="flex gap-3 items-center">
                            <span className="font-body-md text-body-md text-on-surface-variant">Logged on {record.date}</span>
                            <span className={`px-3 py-1 rounded font-label-bold text-xs shadow-sm ${getStatusBadgeColor(record.status)}`}>
                                {record.status}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link 
                            href={`/staff/records/edit/${record.id}`} 
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
                            <span className="material-symbols-outlined text-primary">build</span>
                            Service Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Vehicle</p>
                                <p className="font-body-lg text-body-lg text-on-surface font-semibold">{record.vehicle}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Service Type</p>
                                <p className="font-body-lg text-body-lg text-on-surface">{record.type}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Technician</p>
                                <p className="font-body-lg text-body-lg text-on-surface">{record.technician || 'Not Assigned'}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Cost</p>
                                <p className="font-headline-md text-headline-md text-primary font-bold">{record.cost || 'N/A'}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
