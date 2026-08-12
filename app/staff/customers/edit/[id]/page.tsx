'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../../components/StaffSidebar';
import { getCustomerById, updateCustomer } from '../../../../actions/customers';
import toast from 'react-hot-toast';

export default function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customerId, setCustomerId] = useState('');

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchCustomer = async () => {
            const resolvedParams = await params;
            setCustomerId(resolvedParams.id);
            const data = await getCustomerById(resolvedParams.id);
            if (!data) {
                router.push('/staff/customers');
                return;
            }
            
            setName(data.name || '');
            setEmail(data.email || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
            
            setIsLoaded(true);
        };
        fetchCustomer();
    }, [params, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await updateCustomer(customerId, { name, email, phone, address });
            toast.success('Customer updated successfully!');
            router.push('/staff/customers');
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
                <div className="max-w-3xl mx-auto pb-12">
                    <header className="mb-stack-md flex items-center justify-between">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Edit Customer</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Update the customer's contact information.</p>
                        </div>
                        <button onClick={() => router.back()} className="text-primary font-label-bold hover:underline">Cancel</button>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-stack-lg">
                        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-ambient-sm">
                            <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-4 mb-6">Customer Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block font-label-bold text-label-bold text-on-surface mb-2">Full Name *</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block font-label-bold text-label-bold text-on-surface mb-2">Phone Number *</label>
                                    <input 
                                        type="tel" 
                                        required
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block font-label-bold text-label-bold text-on-surface mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block font-label-bold text-label-bold text-on-surface mb-2">Address</label>
                                    <textarea 
                                        rows={3}
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
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
