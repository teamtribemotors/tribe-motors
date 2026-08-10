import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VehicleCard from './components/VehicleCard';
import { dummyInventory } from './lib/dummy-data';
export default function Page() {
    return (
        <div className="text-on-background font-body-md antialiased min-h-screen flex flex-col">


            <Navbar />
            <main className="flex-grow">

                <section className="relative pt-stack-lg pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#6d281a_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                    <div className="relative z-10 max-w-3xl mx-auto text-center mt-12 mb-16">
                        <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-stack-md leading-tight">
                            Verified, Transparent Pre-Owned Cars in Visakhapatnam.
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                            Experience a premium concirege approach to buying your next vehicle. Every car meticulously inspected, fully documented, and community-backed.
                        </p>
                    </div>

                    <div className="relative z-20 max-w-4xl mx-auto bg-surface-container-lowest rounded-xl ambient-shadow-strong p-2 border border-surface-variant">
                        <form className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1 relative group">
                                <label className="absolute top-2 left-4 text-xs font-label-bold text-outline uppercase tracking-wider" htmlFor="make">Make</label>
                                <select className="w-full h-16 pt-6 pb-2 pl-4 pr-10 bg-transparent bg-none border-none rounded-lg text-on-surface focus:ring-2 focus:ring-primary appearance-none outline-none font-body-md cursor-pointer transition-colors group-hover:bg-surface-container-low" id="make">
                                    <option value="">Any Make</option>
                                    <option value="toyota">Toyota</option>
                                    <option value="honda">Honda</option>
                                    <option value="hyundai">Hyundai</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                            </div>
                            <div className="w-px bg-surface-variant hidden md:block my-2"></div>
                            <div className="flex-1 relative group">
                                <label className="absolute top-2 left-4 text-xs font-label-bold text-outline uppercase tracking-wider" htmlFor="model">Model</label>
                                <select className="w-full h-16 pt-6 pb-2 pl-4 pr-10 bg-transparent bg-none border-none rounded-lg text-on-surface focus:ring-2 focus:ring-primary appearance-none outline-none font-body-md cursor-pointer transition-colors group-hover:bg-surface-container-low" id="model">
                                    <option value="">Any Model</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                            </div>
                            <div className="w-px bg-surface-variant hidden md:block my-2"></div>
                            <div className="flex-1 relative group">
                                <label className="absolute top-2 left-4 text-xs font-label-bold text-outline uppercase tracking-wider" htmlFor="price">Max Price</label>
                                <select className="w-full h-16 pt-6 pb-2 pl-4 pr-10 bg-transparent bg-none border-none rounded-lg text-on-surface focus:ring-2 focus:ring-primary appearance-none outline-none font-body-md cursor-pointer transition-colors group-hover:bg-surface-container-low" id="price">
                                    <option value="">No Limit</option>
                                    <option value="500000">₹5,00,000</option>
                                    <option value="1000000">₹10,00,000</option>
                                    <option value="2000000">₹20,00,000</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                            </div>
                            <button className="md:w-auto w-full h-16 px-8 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2" type="submit">
                                <span className="material-symbols-outlined">search</span>
                                Search Inventory
                            </button>
                        </form>
                    </div>
                </section>

                <section className="border-y border-surface-variant bg-surface-container-low py-8">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4 text-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined filled-icon">verified</span>
                            </div>
                            <span className="font-headline-md text-headline-md text-on-surface text-lg">Every car inspected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined filled-icon">history</span>
                            </div>
                            <span className="font-headline-md text-headline-md text-on-surface text-lg">Full service history</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined filled-icon">groups</span>
                            </div>
                            <span className="font-headline-md text-headline-md text-on-surface text-lg">Community-backed</span>
                        </div>
                    </div>
                </section>

                <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                    <div className="flex justify-between items-end mb-stack-md">
                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Featured Vehicles</h2>
                        <Link className="font-label-bold text-label-bold text-primary hover:underline flex items-center gap-1" href="/browse">
                            View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                        {dummyInventory.slice(0, 3).map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />



        </div>
    );
}
