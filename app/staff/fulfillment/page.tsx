"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../components/StaffSidebar';
import { getFulfillmentRequests, deleteFulfillmentRequestAction } from '../../actions/fulfillment';
import { useState, useEffect } from 'react';

export default function FulfillmentPage() {
    const router = useRouter();
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getFulfillmentRequests();
            setRequests(data);
            setIsLoaded(true);
        };
        fetchRequests();
    }, []);

    const deleteRequest = async (id: string) => {
        await deleteFulfillmentRequestAction(id);
        const data = await getFulfillmentRequests();
        setRequests(data);
    };

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
                    <p>Loading fulfillment queue...</p>
                </main>
            </div>
        );
    }

    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              req.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              req.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                <div className="max-w-container-max mx-auto">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-md">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Fulfillment Queue</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Manage buyer requests and deliveries.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                            <div className="relative w-full sm:w-64">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                                <input 
                                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                                    placeholder="Search buyer or vehicle..." 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select 
                                className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 font-label-bold text-label-bold text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">Status: All</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            
                            <Link href="/staff/fulfillment/new" className="hidden md:flex ml-4 bg-primary text-on-primary font-label-bold text-label-bold py-2 px-4 rounded-lg shadow-sm hover:opacity-90 transition-opacity items-center gap-2">
                                <span className="material-symbols-outlined">add</span>
                                New Request
                            </Link>
                        </div>
                    </header>

                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-visible shadow-sm">
                        <div className="overflow-visible min-h-[400px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-container-low border-b border-outline-variant">
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">ID</th>
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Buyer Name</th>
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Requested Vehicle</th>
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Contact</th>
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Time</th>
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Status</th>
                                        <th className="py-3 px-4 font-label-bold text-label-bold text-on-surface-variant text-right whitespace-nowrap w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((req) => (
                                        <tr 
                                            key={req.id} 
                                            onClick={() => router.push(`/staff/fulfillment/${req.id}`)}
                                            className="border-b border-outline-variant hover:bg-surface transition-colors last:border-b-0 cursor-pointer group"
                                        >
                                            <td className="py-3 px-4 font-body-md text-on-surface-variant font-mono text-sm">{req.id}</td>
                                            <td className="py-3 px-4 font-label-bold text-on-surface">
                                                {req.buyerName}
                                                <span className="block font-body-md text-xs text-on-surface-variant mt-0.5">{req.buyerType}</span>
                                            </td>
                                            <td className="py-3 px-4 font-body-md text-on-surface">{req.vehicle}</td>
                                            <td className="py-3 px-4 font-body-md text-on-surface-variant">{req.contact}</td>
                                            <td className="py-3 px-4 font-body-md text-on-surface-variant">{req.requestTime}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-3 py-1 rounded font-label-bold text-xs shadow-sm ${getStatusBadgeColor(req.status)}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right relative">
                                                <button 
                                                    aria-label="Actions" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.nativeEvent.stopImmediatePropagation();
                                                        setActiveDropdown(activeDropdown === req.id ? null : req.id);
                                                    }}
                                                    className="text-on-surface-variant hover:text-primary hover:bg-surface-variant w-8 h-8 inline-flex items-center justify-center rounded-full transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                                
                                                {activeDropdown === req.id && (
                                                    <div className="absolute right-8 top-10 w-40 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
                                                        <Link 
                                                            href={`/staff/fulfillment/${req.id}`}
                                                            className="flex items-center gap-3 px-4 py-2 hover:bg-surface-variant text-on-surface font-body-md transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                            View
                                                        </Link>
                                                        <Link 
                                                            href={`/staff/fulfillment/edit/${req.id}`}
                                                            className="flex items-center gap-3 px-4 py-2 hover:bg-surface-variant text-on-surface font-body-md transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                            Edit
                                                        </Link>
                                                        <div className="h-px bg-outline-variant w-full my-1"></div>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if(confirm('Are you sure you want to delete this request?')) {
                                                                    deleteRequest(req.id);
                                                                    setActiveDropdown(null);
                                                                }
                                                            }}
                                                            className="flex w-full items-center gap-3 px-4 py-2 hover:bg-error-container text-error font-body-md transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredRequests.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-on-surface-variant">
                                                No fulfillment requests found matching your criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}