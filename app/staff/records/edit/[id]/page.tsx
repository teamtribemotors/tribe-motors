'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../../components/StaffSidebar';
import { getServiceRecordById, updateServiceRecord } from '../../../../actions/records';
import toast from 'react-hot-toast';

export default function EditServiceRecordPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recordId, setRecordId] = useState('');

    // Form state
    const [type, setType] = useState('Maintenance');
    const [cost, setCost] = useState('');
    const [status, setStatus] = useState('Completed');

    useEffect(() => {
        const fetchRecord = async () => {
            const resolvedParams = await params;
            setRecordId(resolvedParams.id);
            const data = await getServiceRecordById(resolvedParams.id);
            if (!data) {
                router.push('/staff/records');
                return;
            }
            
            setType(data.type);
            setCost(data.cost.toString());
            setStatus(data.status);
            
            setIsLoaded(true);
        };
        fetchRecord();
    }, [params, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await updateServiceRecord(recordId, { 
                type, 
                cost: parseInt(cost, 10), 
                status 
            });
            toast.success('Service record updated successfully!');
            router.push('/staff/records');
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />

            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <div className="max-w-2xl mx-auto pb-12">
                    <header className="mb-stack-md flex items-center justify-between">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Edit Service Record</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant font-mono">ID: {recordId}</p>
                        </div>
                        <button onClick={() => router.back()} className="text-primary font-label-bold hover:underline">Cancel</button>
                    </header>

                    <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-ambient-sm flex flex-col gap-6">
                        
                        <div>
                            <label className="block font-label-bold text-label-bold text-on-surface mb-2">Service Type *</label>
                            <select 
                                required
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                            >
                                <option value="Maintenance">Routine Maintenance (Oil, Filters, etc.)</option>
                                <option value="Repair">Mechanical Repair</option>
                                <option value="Bodywork">Bodywork / Paint</option>
                                <option value="Inspection">140-Point Inspection</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface mb-2">Cost (₹) *</label>
                                <input 
                                    type="number" 
                                    required
                                    min="0"
                                    value={cost}
                                    onChange={e => setCost(e.target.value)}
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface mb-2">Status *</label>
                                <select 
                                    required
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                                >
                                    <option value="Completed">Completed</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 mt-2 border-t border-outline-variant">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-primary text-on-primary font-label-bold text-label-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
