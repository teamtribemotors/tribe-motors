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
    const [fileUrl, setFileUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [cost, setCost] = useState('');
    const [originalCost, setOriginalCost] = useState('');
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
            
            if (data.fileUrl) setFileUrl(data.fileUrl);
            setCost(data.cost.toString());
            if (data.originalCost) setOriginalCost(data.originalCost.toString());
            setStatus(data.status);
            
            setIsLoaded(true);
        };
        fetchRecord();
    }, [params, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            let updatedFileUrl = fileUrl;
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const uploadData = await uploadRes.json();
                if (!uploadData.error) {
                    updatedFileUrl = uploadData.url;
                }
            }

            await updateServiceRecord(recordId, { 
                fileUrl: updatedFileUrl,
                cost: parseInt(cost, 10), 
                originalCost: originalCost ? parseInt(originalCost, 10) : undefined,
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
                            <label className="block font-label-bold text-label-bold text-on-surface mb-2">Service Record (PDF)</label>
                            {fileUrl && !file && (
                                <div className="mb-4">
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-label-md">
                                        View Current Document
                                    </a>
                                </div>
                            )}
                            <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-outline-variant border-dashed rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
                                <div className="space-y-2 text-center">
                                    <svg className="mx-auto h-8 w-8 text-on-surface-variant group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="flex text-body-md text-on-surface justify-center gap-1">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-label-bold text-primary hover:underline focus-within:outline-none">
                                            <span>Upload new PDF file to replace</span>
                                            <input 
                                                id="file-upload" 
                                                name="file-upload" 
                                                type="file" 
                                                className="sr-only" 
                                                accept=".pdf" 
                                                onChange={e => e.target.files && setFile(e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    {file && <p className="text-body-sm text-primary font-bold">{file.name}</p>}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface mb-2">Final Cost (₹) *</label>
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
                                <label className="block font-label-bold text-label-bold text-on-surface mb-2">Original Cost (₹) (Optional)</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    value={originalCost}
                                    onChange={e => setOriginalCost(e.target.value)}
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
