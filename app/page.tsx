import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VehicleCard from './components/VehicleCard';
import { db } from '../db';
import { vehicles } from '../db/schema';
import { desc } from 'drizzle-orm';

export default async function Page() {

    return (
        <>
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[80vh] min-h-[600px] flex items-center w-full">
                    <div className="absolute inset-0 z-0 bg-image-overlay" data-alt="A cinematic, moody shot of a high-end sports car parked in a sleek, minimalist modern garage setting." style={{ backgroundImage: 'linear-gradient(rgb(26, 27, 31) 0%, rgba(26, 27, 31, 0.4) 15%, rgba(26, 27, 31, 0.8) 100%), url("/hero-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
                    <div className="relative z-10 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row gap-stack-lg items-center">
                        <div className="w-full md:w-1/2 text-center md:text-left text-on-primary">
                            <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg mb-6 leading-tight">
                                The Art of the Verified Automobile.
                            </h1>
                            <p className="font-body-lg text-body-lg text-secondary-container mb-8 max-w-lg">
                                Experience a curated concierge service for premium pre-owned cars in Visakhapatnam.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 max-w-md bg-surface p-8 rounded-lg shadow-xl text-on-surface">
                            <h2 className="font-headline-md text-headline-md mb-6">Find Your Next Vehicle</h2>
                            <form action="/browse" method="GET" className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="make" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Make</label>
                                    <select id="make" name="make" className="w-full bg-surface-container-low border border-secondary-container rounded p-3 focus:border-outline focus:ring-0">
                                        <option value="">Select Make</option>
                                        <option value="Porsche">Porsche</option>
                                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                                        <option value="BMW">BMW</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="model" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Model</label>
                                    <select id="model" name="model" className="w-full bg-surface-container-low border border-secondary-container rounded p-3 focus:border-outline focus:ring-0">
                                        <option value="">Select Model</option>
                                        <option value="911">911</option>
                                        <option value="S-Class">S-Class</option>
                                        <option value="7 Series">7 Series</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Max Price (INR)</label>
                                    <select id="price" name="price" className="w-full bg-surface-container-low border border-secondary-container rounded p-3 focus:border-outline focus:ring-0">
                                        <option value="">Any Price</option>
                                        <option value="2500000">₹ 25,00,000</option>
                                        <option value="5000000">₹ 50,00,000</option>
                                        <option value="7500000">₹ 75,00,000</option>
                                        <option value="10000000">₹ 1,00,00,000+</option>
                                    </select>
                                </div>
                                <button className="w-full bg-primary hover:bg-surface-tint text-on-primary font-label-md text-label-md py-4 rounded mt-4 transition-colors" type="submit">
                                    Search Inventory
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Trust Pillars Section */}
                <section className="py-stack-xl bg-surface-container-lowest">
                    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left bg-surface-container-low p-8 rounded-lg border border-secondary-container/50">
                            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md mb-3 text-on-surface">Every Car Inspected</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                150-point technical certification guaranteeing mechanical excellence and safety for absolute peace of mind.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left bg-surface-container-low p-8 rounded-lg border border-secondary-container/50">
                            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md mb-3 text-on-surface">Full Service History</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Transparent documentation for every vehicle, detailing past maintenance, ownership, and accident-free verification.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left bg-surface-container-low p-8 rounded-lg border border-secondary-container/50">
                            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md mb-3 text-on-surface">Community-Backed</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Trusted by Vizag's most discerning automotive enthusiasts and supported by a network of premium local service partners.
                            </p>
                        </div>
                    </div>
                </section>



                {/* Community Section
                <section className="py-stack-xl bg-surface-container-high relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, #446253 0%, transparent 20%), radial-gradient(circle at 90% 80%, #b02600 0%, transparent 20%)' }}></div>
                    <div className="max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
                        <span className="material-symbols-outlined text-tertiary text-[48px] mb-6 opacity-50">format_quote</span>
                        <p className="font-headline-md text-headline-md text-on-surface mb-8 italic">
                            "Finding a pristine luxury vehicle in Visakhapatnam used to mean compromising or travelling out of state. Tribe Motors brought an entirely new level of transparency and concierge-style service right to my doorstep. The documentation was flawless, and the car exceeded my expectations."
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface font-label-md text-label-md">
                                VS
                            </div>
                            <div className="text-left">
                                <p className="font-label-md text-label-md text-on-surface">Vikram S.</p>
                                <p className="font-body-md text-label-sm text-on-surface-variant">Visakhapatnam Local & Enthusiast</p>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>
            <Footer />
        </>
    );
}
