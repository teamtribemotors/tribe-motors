"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../../components/StaffSidebar';
import FulfillmentForm from '../../../../components/FulfillmentForm';
import { useFulfillment } from '../../../../lib/useFulfillment';
import { use } from 'react';

export default function EditRequestPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { getRequest, updateRequest, isLoaded } = useFulfillment();
    const { id } = use(params);

    if (!isLoaded) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading request data...</p>
                </main>
            </div>
        );
    }

    const request = getRequest(id);

    if (!request) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Fulfillment request not found.</p>
                    <Link href="/staff/fulfillment" className="text-primary hover:underline mt-4 inline-block">Return to Fulfillment Queue</Link>
                </main>
            </div>
        );
    }

    const handleSave = (requestData: any) => {
        updateRequest(id, requestData);
        router.push('/staff/fulfillment');
    };

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />
            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <header className="mb-stack-lg flex justify-between items-end max-w-3xl">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Edit Fulfillment Request</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Update the details for this buyer inquiry.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/staff/fulfillment" className="px-6 py-2 rounded border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-primary-fixed hover:border-primary-fixed transition-colors">
                            Cancel
                        </Link>
                        <button 
                            className="px-6 py-2 rounded bg-primary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(139,62,47,0.15)]" 
                            form="fulfillment-form" 
                            type="submit"
                        >
                            Save Changes
                        </button>
                    </div>
                </header>
                
                <FulfillmentForm initialData={request} onSubmit={handleSave} />
            </main>
        </div>
    );
}
