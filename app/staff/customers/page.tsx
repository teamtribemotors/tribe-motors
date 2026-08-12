'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../components/StaffSidebar';
import { getCustomers } from '../../actions/customers';
import { useState, useEffect } from 'react';

export default function CustomersPage() {
    const router = useRouter();
    const [customers, setCustomers] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers();
            setCustomers(data);
            setIsLoaded(true);
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const handleClick = () => setActiveDropdown(null);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    if (!isLoaded) {
        return (
            <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
                <StaffSidebar />
                <main className="flex-1 bg-background relative z-0 ml-64 p-margin-desktop">
                    <p>Loading customers...</p>
                </main>
            </div>
        );
    }

    const filteredCustomers = customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               customer.phone.includes(searchQuery) ||
               (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    return (
        <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md">
            <StaffSidebar />

            <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
                <div className="max-w-container-max mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-md">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Customers</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Manage customer records and sales.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                            <div className="relative w-full sm:w-64">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                                <input 
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                                    placeholder="Search by name, email..." 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            <Link href="/staff/customers/new" className="hidden md:flex ml-4 bg-primary text-on-primary font-label-bold text-label-bold py-2 px-4 rounded-lg shadow-sm hover:opacity-90 transition-opacity items-center gap-2">
                                <span className="material-symbols-outlined">add</span>
                                Add Customer / Sale
                            </Link>
                        </div>
                    </header>

                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-visible shadow-sm">
                        {customers.length === 0 ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-6xl text-on-surface-variant/50 mb-4">group</span>
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No customers yet</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">You haven't added any customers. Add a customer to track their details and vehicle purchases.</p>
                                <Link href="/staff/customers/new" className="bg-primary text-on-primary font-label-bold text-label-bold py-2 px-6 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                                    <span className="material-symbols-outlined">add</span>
                                    Add First Customer
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-visible min-h-[400px]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-surface-container-low border-b border-outline-variant">
                                            <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Name</th>
                                            <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Email</th>
                                            <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Phone</th>
                                            <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Joined Date</th>
                                            <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant text-right whitespace-nowrap w-24">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCustomers.map((customer) => (
                                            <tr 
                                                key={customer.id} 
                                                onClick={() => router.push(`/staff/customers/${customer.id}`)}
                                                className="border-b border-outline-variant hover:bg-surface transition-colors last:border-b-0 cursor-pointer group"
                                            >
                                                <td className="py-3 px-4 font-label-bold text-on-surface">{customer.name}</td>
                                                <td className="py-3 px-4 font-body-md text-on-surface">{customer.email || '—'}</td>
                                                <td className="py-3 px-4 font-body-md text-on-surface-variant">{customer.phone}</td>
                                                <td className="py-3 px-4 font-body-md text-on-surface-variant">{customer.createdAt}</td>
                                                <td className="py-3 px-4 text-right relative">
                                                    <button 
                                                        aria-label="Actions" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.nativeEvent.stopImmediatePropagation();
                                                            setActiveDropdown(activeDropdown === customer.id ? null : customer.id);
                                                        }}
                                                        className="text-on-surface-variant hover:text-primary hover:bg-surface-variant w-8 h-8 inline-flex items-center justify-center rounded-full transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                    </button>
                                                    
                                                    {activeDropdown === customer.id && (
                                                        <div className="absolute right-8 top-10 w-40 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
                                                            <Link 
                                                                href={`/staff/customers/${customer.id}`}
                                                                className="flex items-center gap-3 px-4 py-2 hover:bg-surface-variant text-on-surface font-body-md transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                                View
                                                            </Link>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredCustomers.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                                                    No customers found matching your criteria.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}