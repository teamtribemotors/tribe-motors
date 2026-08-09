"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../components/StaffSidebar';
import RecordForm from '../../../components/RecordForm';
import { useServiceRecords } from '../../../lib/useServiceRecords';

export default function NewRecordPage() {
    const router = useRouter();
    const { addRecord } = useServiceRecords();

    const handleSave = (recordData: any) => {
        const id = "SR-" + Math.floor(100 + Math.random() * 900);
        addRecord({ id, ...recordData });
        router.push('/staff/records');
    };

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />
            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <header className="mb-stack-lg flex justify-between items-end max-w-3xl">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">New Service Record</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Log a new vehicle maintenance or service event.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/staff/records" className="px-6 py-2 rounded border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-primary-fixed hover:border-primary-fixed transition-colors">
                            Cancel
                        </Link>
                        <button 
                            className="px-6 py-2 rounded bg-primary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(139,62,47,0.15)]" 
                            form="record-form" 
                            type="submit"
                        >
                            Save Record
                        </button>
                    </div>
                </header>
                
                <RecordForm onSubmit={handleSave} />
            </main>
        </div>
    );
}
