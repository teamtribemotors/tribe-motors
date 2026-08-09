"use client";

import { useState } from 'react';
import { ServiceRecord } from '../lib/dummy-data';

interface RecordFormProps {
    initialData?: ServiceRecord;
    onSubmit: (data: Omit<ServiceRecord, 'id'>) => void;
}

export default function RecordForm({ initialData, onSubmit }: RecordFormProps) {
    const [vehicle, setVehicle] = useState(initialData?.vehicle || '');
    const [date, setDate] = useState(initialData?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [status, setStatus] = useState(initialData?.status || 'Pending');
    const [type, setType] = useState(initialData?.type || '');
    const [cost, setCost] = useState(initialData?.cost || '');
    const [technician, setTechnician] = useState(initialData?.technician || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic cost formatting if they type a number
        let formattedCost = cost;
        if (cost && !cost.startsWith('₹') && !isNaN(Number(cost.replace(/,/g, '')))) {
            formattedCost = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(Number(cost.replace(/,/g, '')));
        }

        onSubmit({
            vehicle,
            date,
            status: status as 'Completed' | 'Pending' | 'In Progress',
            type,
            cost: formattedCost,
            technician
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-stack-md" id="record-form">
            <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-container">
                <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">build</span>
                    Service Record Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="vehicle">Vehicle</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="vehicle" 
                            placeholder="e.g. 2022 Volvo XC90" 
                            type="text"
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="type">Service Type</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="type" 
                            placeholder="e.g. Full Service, Inspection" 
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="technician">Technician</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="technician" 
                            placeholder="e.g. Mike R." 
                            type="text"
                            value={technician}
                            onChange={(e) => setTechnician(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="date">Date</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="date" 
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="cost">Cost</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="cost" 
                            placeholder="e.g. 1250" 
                            type="text"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
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
