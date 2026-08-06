import Link from 'next/link';
import { dummyInventory } from '../lib/dummy-data';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Page() {
  return (
    <div className="text-on-background antialiased min-h-screen flex flex-col font-body-md">


      <Navbar />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">

        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface p-stack-md rounded-xl ambient-shadow sticky top-28">
            <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-stack-sm">
              <h2 className="font-headline-md text-headline-md text-on-background">Filters</h2>
              <button className="font-label-sm text-label-sm text-primary hover:underline">Reset</button>
            </div>

            <div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Price Range</h3>
              <div className="flex items-center gap-2">
                <input className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2" placeholder="Min" type="text" />
                <span className="text-on-surface-variant">-</span>
                <input className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2" placeholder="Max" type="text" />
              </div>
            </div>

            <div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Year</h3>
              <select className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2">
                <option>Any Year</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
            </div>

            <div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Fuel Type</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md">Petrol</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md">Diesel</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md">EV</span>
                </label>
              </div>
            </div>

            <div className="mb-stack-md">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Body Type</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md">SUV</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md">Sedan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                  <span className="font-body-md text-body-md">Hatchback</span>
                </label>
              </div>
            </div>
            <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:opacity-90 transition-opacity">Apply Filters</button>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="flex justify-between items-end mb-stack-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Available Vehicles</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Showing 124 premium pre-owned cars</p>
            </div>
            <div className="flex items-center gap-stack-sm">
              <select className="bg-surface border border-outline-variant rounded-md py-1.5 px-3 font-label-sm text-label-sm text-on-background focus:outline-none focus:border-primary">
                <option>Sort: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Year: Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {dummyInventory.map((vehicle) => (
              <Link href={`/vehicle/${vehicle.id}`} key={vehicle.id} className="block">
                <article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300 h-full">
                  <div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
                    <img className="w-full h-full object-cover" data-alt={vehicle.imageAlt} src={vehicle.imageUrl} alt={vehicle.title} />
                    {vehicle.isCertified && (
                      <div className="absolute top-3 left-3 bg-[#228B22] text-on-primary font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1 shadow-md">
                        <span className="material-symbols-outlined text-[14px]" style={{ color: '#D4AF37' }}>workspace_premium</span>
                        Tribe Certified
                      </div>
                    )}
                  </div>
                  <div className="p-stack-md flex flex-col gap-stack-sm">
                    <div className="flex justify-between items-start">
                      <h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">{vehicle.title}</h2>
                    </div>
                    <p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">{vehicle.price}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">{vehicle.mileage}</span>
                      <span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">{vehicle.fuelType}</span>
                      <span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">{vehicle.transmission}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-stack-lg flex justify-center gap-2">
            <button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">Prev</button>
            <button className="px-4 py-2 bg-primary text-on-primary rounded font-label-bold text-label-bold">1</button>
            <button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">2</button>
            <button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">3</button>
            <button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">Next</button>
          </div>
        </section>
      </main>

      <Footer />



    </div>
  );
}
