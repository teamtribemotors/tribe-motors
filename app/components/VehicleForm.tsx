"use client";

import { useState } from 'react';
import { Vehicle } from '../lib/dummy-data';

interface VehicleFormProps {
    initialData?: Vehicle;
    onSubmit: (data: Omit<Vehicle, 'id'>) => void;
}

export default function VehicleForm({ initialData, onSubmit }: VehicleFormProps) {


    // Attempt to parse title into year, make, model (very basic)
    let initialYear = "2024";
    let initialMake = "porsche";
    let initialModel = "";
    if (initialData) {
        const parts = initialData.title.split(' ');
        initialYear = parts[0] || "";
        initialMake = (parts[1] || "porsche").toLowerCase();
        initialModel = parts.slice(2).join(' ') || "";
    }

    const [make, setMake] = useState(initialMake);
    const [model, setModel] = useState(initialModel);
    const [year, setYear] = useState(initialYear);
    const [vin, setVin] = useState(initialData?.vin || '');
    const [mileage, setMileage] = useState(initialData?.mileage || '');
    const [transmission, setTransmission] = useState(initialData?.transmission || 'Auto');
    const [fuelType, setFuelType] = useState(initialData?.fuelType || 'Petrol');
    const [price, setPrice] = useState(initialData?.price.replace(/[^0-9]/g, '') || '');
    const [status, setStatus] = useState(initialData?.status || 'Draft');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const title = `${year} ${make.charAt(0).toUpperCase() + make.slice(1)} ${model}`;
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR',
            maximumFractionDigits: 0
        }).format(Number(price));

        const vehicleData: Omit<Vehicle, 'id'> = {
            title,
            vin,
            status: status as 'Live' | 'Draft' | 'Sold',
            dateAdded: initialData?.dateAdded || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            price: formattedPrice,
            imageUrl: initialData?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCin5fM3hME3Gke4YZYLcuVFT_G8lzTJmdUc683UYse4u13kiUqPe4UVlWx_0m1ewukmu5oFo2YCXMKNc6W8dsizEAagMWIRzNYB9u_jTxmK9Jh9UndGuZUVm9vs5AVxsIISX-pYIFsgvDaGf-AHkfwYkLiPN-4WgPJxeIPhWAAlIQkSTZEFnFU5vOevq8gv9qgPxJBDPI9kBxOJlnHjC_HyLGM6zye7XsjRB71Xf8gHrjYac_U5Qg",
            imageAlt: initialData?.imageAlt || "New Vehicle",
            mileage: typeof mileage === 'number' ? `${mileage.toLocaleString()} mi` : mileage,
            transmission,
            fuelType
        };

        onSubmit(vehicleData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl space-y-stack-md" id="vehicle-form">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
                <div className="xl:col-span-2 space-y-stack-md">

                    <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
                        <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">directions_car</span>
                            Basic Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="make">Make</label>
                                <select
                                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                                    id="make"
                                    value={make}
                                    onChange={(e) => setMake(e.target.value)}
                                    required
                                >
                                    <option disabled value="">Select Make</option>
                                    <option value="audi">Audi</option>
                                    <option value="bmw">BMW</option>
                                    <option value="mercedes">Mercedes-Benz</option>
                                    <option value="porsche">Porsche</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="model">Model</label>
                                <input
                                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                                    id="model"
                                    placeholder="e.g. 911 Carrera S"
                                    type="text"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="year">Year</label>
                                <input
                                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                                    id="year"
                                    max="2025"
                                    min="1990"
                                    placeholder="YYYY"
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
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
                        </div>
                    </section>

                    <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
                        <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">settings_suggest</span>
                            Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-6">
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="mileage">Mileage (mi)</label>
                                <input
                                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                                    id="mileage"
                                    placeholder="e.g. 12,450 mi"
                                    type="text"
                                    value={mileage}
                                    onChange={(e) => setMileage(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="transmission">Transmission</label>
                                <select
                                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                                    id="transmission"
                                    value={transmission}
                                    onChange={(e) => setTransmission(e.target.value)}
                                >
                                    <option value="Auto">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="fuel">Fuel Type</label>
                                <select
                                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                                    id="fuel"
                                    value={fuelType}
                                    onChange={(e) => setFuelType(e.target.value)}
                                >
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-stack-md">
                    <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
                        <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">payments</span>
                            Pricing & Status
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2" htmlFor="price">Listing Price (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-on-surface-variant font-body-md">₹</span>
                                    <input
                                        className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface pl-8 text-lg font-bold text-primary"
                                        id="price"
                                        placeholder="0.00"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <hr className="border-outline-variant" />
                            <div>
                                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-3">Inventory Status</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant bg-surface-container-low hover:border-primary transition-colors">
                                        <input
                                            className="text-primary focus:ring-primary border-outline"
                                            name="status"
                                            type="radio"
                                            value="Live"
                                            checked={status === 'Live'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <span className="font-label-bold text-label-bold text-on-surface">Live (Available)</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant hover:border-primary transition-colors">
                                        <input
                                            className="text-primary focus:ring-primary border-outline"
                                            name="status"
                                            type="radio"
                                            value="Draft"
                                            checked={status === 'Draft'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <span className="font-label-bold text-label-bold text-on-surface">Draft (Not Listed)</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant hover:border-primary transition-colors">
                                        <input
                                            className="text-primary focus:ring-primary border-outline"
                                            name="status"
                                            type="radio"
                                            value="Sold"
                                            checked={status === 'Sold'}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <span className="font-label-bold text-label-bold text-on-surface">Sold</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
