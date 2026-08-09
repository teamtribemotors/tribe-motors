"use client";

import { useState } from 'react';
import { FulfillmentRequest } from '../lib/dummy-data';

interface FulfillmentFormProps {
    initialData?: FulfillmentRequest;
    onSubmit: (data: Omit<FulfillmentRequest, 'id'>) => void;
}

export default function FulfillmentForm({ initialData, onSubmit }: FulfillmentFormProps) {
    const [buyerName, setBuyerName] = useState(initialData?.buyerName || '');
    const [buyerType, setBuyerType] = useState(initialData?.buyerType || 'Standard');
    const [vehicle, setVehicle] = useState(initialData?.vehicle || '');
    const [contact, setContact] = useState(initialData?.contact || '');
    const [requestTime, setRequestTime] = useState(initialData?.requestTime || 'Just now');
    const [status, setStatus] = useState(initialData?.status || 'Pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        onSubmit({
            buyerName,
            buyerType,
            vehicle,
            contact,
            requestTime,
            status: status as 'Pending' | 'In Progress' | 'Completed'
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-stack-md" id="fulfillment-form">
            <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-container">
                <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                    Fulfillment Request
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="buyerName">Buyer Name</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="buyerName" 
                            placeholder="e.g. Sarah Lin" 
                            type="text"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="buyerType">Buyer Type</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="buyerType" 
                            placeholder="e.g. Premium Member" 
                            type="text"
                            value={buyerType}
                            onChange={(e) => setBuyerType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="vehicle">Requested Vehicle</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="vehicle" 
                            placeholder="e.g. 2021 Porsche 911 Carrera S" 
                            type="text"
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="contact">Contact Details</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="contact" 
                            placeholder="e.g. +1 (555) 019-2834" 
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="status">Status</label>
                        <select 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface appearance-none bg-none" 
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </section>
        </form>
    );
}
