"use client";

import { useState } from 'react';
import { Inspection } from '../lib/dummy-data';

interface InspectionFormProps {
    initialData?: Inspection;
    onSubmit: (data: Omit<Inspection, 'id'>) => void;
}

export default function InspectionForm({ initialData, onSubmit }: InspectionFormProps) {
    const [vehicleTitle, setVehicleTitle] = useState(initialData?.vehicleTitle || '');
    const [vin, setVin] = useState(initialData?.vin || '');
    const [inspector, setInspector] = useState(initialData?.inspector || '');
    const [date, setDate] = useState(initialData?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    const [score, setScore] = useState(initialData?.score || 'N/A');
    const [status, setStatus] = useState(initialData?.status || 'Pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        onSubmit({
            vehicleTitle,
            vin,
            inspector,
            date,
            score,
            status: status as 'Passed' | 'Failed' | 'Pending'
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-stack-md" id="inspection-form">
            <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-container">
                <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">fact_check</span>
                    Inspection Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="vehicleTitle">Vehicle Title</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="vehicleTitle" 
                            placeholder="e.g. 2022 Volvo XC90" 
                            type="text"
                            value={vehicleTitle}
                            onChange={(e) => setVehicleTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="vin">VIN</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface uppercase font-mono" 
                            id="vin" 
                            placeholder="17-character VIN" 
                            type="text"
                            value={vin}
                            onChange={(e) => setVin(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="inspector">Inspector Name</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="inspector" 
                            placeholder="e.g. John Smith" 
                            type="text"
                            value={inspector}
                            onChange={(e) => setInspector(e.target.value)}
                            required
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
                        <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="score">Score</label>
                        <input 
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface" 
                            id="score" 
                            placeholder="e.g. 98/100" 
                            type="text"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
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
                            <option value="Passed">Passed</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                </div>
            </section>
        </form>
    );
}
