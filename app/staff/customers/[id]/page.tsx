'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StaffSidebar from '../../../components/StaffSidebar';
import { getCustomerById } from '../../../actions/customers';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [customer, setCustomer] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchCustomer = async () => {
            const resolvedParams = await params;
            const data = await getCustomerById(resolvedParams.id);
            if (!data) {
                router.push('/staff/customers');
                return;
            }
            setCustomer(data);
            setIsLoaded(true);
        };
        fetchCustomer();
    }, [params, router]);

    if (!isLoaded || !customer) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading customer details...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />

            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <div className="max-w-4xl mx-auto pb-12">
                    <header className="mb-stack-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.push('/staff/customers')} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-variant transition-colors text-on-surface-variant">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <div>
                                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">{customer.name}</h2>
                                <p className="font-body-md text-body-md text-on-surface-variant">Customer since {customer.createdAt}</p>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
                        
                        {/* Customer Info Card */}
                        <div className="md:col-span-1 bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-ambient-sm h-fit">
                            <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Contact Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Phone</p>
                                    <p className="font-body-md text-body-md text-on-background">{customer.phone}</p>
                                </div>
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Email</p>
                                    <p className="font-body-md text-body-md text-on-background">{customer.email || '—'}</p>
                                </div>
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Address</p>
                                    <p className="font-body-md text-body-md text-on-background">{customer.address || '—'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Purchase History */}
                        <div className="md:col-span-2 bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-ambient-sm">
                            <h3 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">directions_car</span>
                                Purchase History
                            </h3>
                            
                            {customer.sales && customer.sales.length > 0 ? (
                                <div className="space-y-4">
                                    {customer.sales.map((sale: any) => (
                                        <div key={sale.id} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <Link href={`/vehicle/${sale.vehicleId}`} className="font-label-bold text-label-bold text-primary hover:underline text-lg">
                                                    {sale.vehicleTitle || `${sale.vehicleMake} ${sale.vehicleModel}`}
                                                </Link>
                                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Sold on {sale.saleDate}</p>
                                            </div>
                                            <div className="bg-surface-container px-4 py-2 rounded-lg font-mono text-on-surface font-bold">
                                                ₹ {sale.salePrice.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">shopping_bag</span>
                                    <p className="font-body-md text-on-surface-variant">No vehicles purchased yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
