'use client';

import { useState, useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../../components/StaffSidebar';
import { createCustomer, createSale } from '../../../actions/customers';
import { getVehicles } from '../../../actions/inventory';
import toast from 'react-hot-toast';

export default function NewCustomerPage() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    
    // Tag sale state
    const [isTaggingSale, setIsTaggingSale] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [notes, setNotes] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchInventory = async () => {
            const data = await getVehicles();
            setVehicles(data.filter((v: any) => v.status !== 'Sold'));
            setIsLoaded(true);
        };
        fetchInventory();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Create customer
            const newCustomer = await createCustomer({ name, email, phone, address });
            
            // Optional: Tag sale
            if (isTaggingSale && selectedVehicle && salePrice) {
                await createSale({
                    vehicleId: selectedVehicle,
                    customerId: newCustomer.id,
                    salePrice: parseInt(salePrice, 10),
                    notes
                });
                toast.success('Customer added and sale recorded successfully!');
            } else {
                toast.success('Customer added successfully!');
            }
            
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
                            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">New Customer</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Add a customer profile and optionally tag a vehicle sale.</p>
                        </div>
                        <button onClick={() => router.back()} className="text-primary font-label-bold hover:underline">Cancel</button>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-stack-lg">
                        
                        {/* Customer Details */}
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
                                        placeholder="E.g., John Doe"
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
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block font-label-bold text-label-bold text-on-surface mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block font-label-bold text-label-bold text-on-surface mb-2">Address</label>
                                    <textarea 
                                        rows={3}
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                        placeholder="Customer's full address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tag Sale Option */}
                        <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-ambient-sm">
                            <div className="flex items-center justify-between border-b border-surface-variant pb-4 mb-6">
                                <h3 className="font-headline-md text-headline-md text-on-background">Tag a Sale</h3>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isTaggingSale}
                                        onChange={e => setIsTaggingSale(e.target.checked)}
                                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                                    />
                                    <span className="font-label-bold text-on-surface">Record a sale now</span>
                                </label>
                            </div>
                            
                            {isTaggingSale ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="md:col-span-2">
                                        <label className="block font-label-bold text-label-bold text-on-surface mb-2">Select Vehicle *</label>
                                        <select 
                                            required={isTaggingSale}
                                            value={selectedVehicle}
                                            onChange={e => setSelectedVehicle(e.target.value)}
                                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                                        >
                                            <option value="">-- Choose a Vehicle in Inventory --</option>
                                            {vehicles.map(v => (
                                                <option key={v.id} value={v.id}>{v.year} {v.make} {v.model} - ₹{v.price.toLocaleString('en-IN')}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-label-bold text-label-bold text-on-surface mb-2">Final Sale Price (₹) *</label>
                                        <input 
                                            type="number" 
                                            required={isTaggingSale}
                                            value={salePrice}
                                            onChange={e => setSalePrice(e.target.value)}
                                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                            placeholder="E.g., 500000"
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block font-label-bold text-label-bold text-on-surface mb-2">Sale Notes</label>
                                        <textarea 
                                            rows={2}
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                            placeholder="Any specific agreements or notes..."
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className="text-on-surface-variant text-sm">Check the box above to link a vehicle purchase to this customer.</p>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-primary text-on-primary font-label-bold text-label-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSubmitting ? 'Saving...' : (isTaggingSale ? 'Save & Record Sale' : 'Save Customer')}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
