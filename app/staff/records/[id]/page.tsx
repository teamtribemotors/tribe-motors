'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaffSidebar from '../../../components/StaffSidebar';
import { getServiceRecordById } from '../../../actions/records';

export default function ServiceRecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [record, setRecord] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchRecord = async () => {
            const resolvedParams = await params;
            const data = await getServiceRecordById(resolvedParams.id);
            if (!data) {
                router.push('/staff/records');
                return;
            }
            setRecord(data);
            setIsLoaded(true);
        };
        fetchRecord();
    }, [params, router]);

    if (!isLoaded || !record) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading record details...</p>
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
                <div className="max-w-3xl mx-auto pb-12">
                    <header className="mb-stack-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.push('/staff/records')} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-variant transition-colors text-on-surface-variant">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <div>
                                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Service Record Details</h2>
                                <p className="font-body-md text-body-md text-on-surface-variant font-mono">ID: {record.id}</p>
                            </div>
                        </div>
                    </header>

                    <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-ambient-sm">
                        <div className="flex items-center justify-between border-b border-surface-variant pb-4 mb-6">
                            <h3 className="font-headline-md text-headline-md text-on-background flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                                <a href={record.fileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                                    View Document (PDF)
                                </a>
                            </h3>
                            <span className={`px-4 py-1.5 rounded-full font-label-bold text-sm shadow-sm ${getStatusBadgeColor(record.status)}`}>
                                {record.status}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Date</p>
                                <p className="font-body-md text-body-md text-on-background">{record.date}</p>
                            </div>
                            <div>
                                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Cost</p>
                                <div className="flex items-center gap-2">
                                    {record.originalCost ? (
                                        <>
                                            <span className="font-body-md text-sm text-on-surface-variant font-medium line-through opacity-70">
                                                ₹ {record.originalCost.toLocaleString('en-IN')}
                                            </span>
                                            <span className="font-body-md text-lg font-bold text-primary">
                                                ₹ {record.cost.toLocaleString('en-IN')}
                                            </span>
                                            <span className="font-label-sm text-xs bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-bold ml-1">
                                                -{Math.round(((record.originalCost - record.cost) / record.originalCost) * 100)}%
                                            </span>
                                        </>
                                    ) : (
                                        <p className="font-body-md text-body-md text-primary font-bold text-lg">₹ {record.cost.toLocaleString('en-IN')}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-6 border-t border-surface-variant">
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Linked Vehicle</p>
                            <Link href={`/vehicle/${record.vehicleId}`} className="inline-flex items-center gap-2 bg-surface-container-low p-3 rounded-lg border border-outline-variant hover:border-primary transition-colors group">
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">directions_car</span>
                                <span className="font-label-bold text-on-surface group-hover:text-primary transition-colors">View Vehicle {record.vehicleId.slice(0,8)}...</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
