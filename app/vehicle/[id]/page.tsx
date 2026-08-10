import { notFound } from 'next/navigation';
import { db } from '../../../db';
import { vehicles } from '../../../db/schema';
import { eq } from 'drizzle-orm';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactDealerModal from '../../components/ContactDealerModal';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicleRecord = await db.select().from(vehicles).where(eq(vehicles.id, id)).limit(1);
  const vehicle = vehicleRecord[0];
  if (!vehicle) return notFound();

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col font-body-md text-body-md">


      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">

        <section className="flex flex-col gap-stack-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-sm">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wide border border-surface-dim">Automatic</span>
                <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wide border border-surface-dim">Petrol</span>
                <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase tracking-wide border border-surface-dim">1st Owner</span>
              </div>
              <h1 className="font-display-lg text-display-lg md:text-[48px] text-on-background">2021 Mercedes-Benz E-Class E 350</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">14,500 km • Mumbai</p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-display-lg text-[32px] md:text-[40px] text-primary font-bold">₹ 58,50,000</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-base h-[50vh] md:h-[60vh] rounded-xl overflow-hidden shadow-ambient-sm">
            <div className="md:col-span-3 md:row-span-2 relative group cursor-pointer overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A high-end professional automotive photograph of a sleek silver 2021 Mercedes-Benz E-Class parked in a dimly lit, luxurious showroom. The lighting is dramatic, highlighting the elegant curves of the car's body. The background features subtle warm tones, brushed metal accents, and deep shadows, reflecting a premium, tactile modernist aesthetic. The mood is sophisticated and exclusive." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZekoP-wWJS_zqcJV65nWsWMEY69nx554f3CcZnVqCHiKaeEQLiLwwyZB7eNWFLhVMqUd6csB5tmmFpM8XaC5Ko2MeL35fyjqEw1BYmw2ZN_HzNJCrCS8qqGiWoI48_phbTs3QMYKv6g9o7URR-WC2-VQ4PogRq93hv9ELhiclMmNlilZdLqit8RHSo7r8nKgpIGN9YOey4F7wXJgUHplK9ItvSxYMLPuA38wp2RzKo-SZSbIcKGs" />
            </div>
            <div className="hidden md:block relative group cursor-pointer overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A detailed close-up shot of the luxurious interior of a Mercedes-Benz E-Class. The focus is on the premium leather seats, polished wood trim, and modern digital dashboard. Warm ambient lighting glows softly inside the cabin, creating a welcoming, high-end clubhouse atmosphere. The tactile textures of the materials are emphasized, conveying comfort and superior craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuApu7b5rfoY1RIJkERek0H7JhLhDNLT42GaijbkUYnFSjvzyaWuRjQp1nvNuy-L02CCsHTgO5yklDlHTyDSdBYbWoeU26iQ62mNb0lvRkHk7XacttxH6ZCN-IAF-CO1ijz6YzqXI5uZrGSkA4Vc3KJ6jG3VivWD-0ohJpbzuB69AlvzLUrNBT8GgIqgsH2pIJlVOT8hvhx7IWxgHnm1y9Wo1G10zlbeUkKHs5g0m0Rz1Y_KYIdwUDY" />
            </div>
            <div className="hidden md:block relative group cursor-pointer overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A focused shot of the distinctive alloy wheel of a Mercedes-Benz E-Class, showcasing its intricate design and pristine condition. The tire rests on a polished showroom floor that subtly reflects the ambient warm lighting. The surrounding environment implies a high-end garage or luxury presentation space, consistent with a premium automotive brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS89V0en6h0eLmd-W8x_rzAXqJLp-vdqcd9odaF8u20xeu3TA781bMC2koEiydZeiNBJ2L-oUDrfFSIAFvDM-MS31Einf_rG4rpigGaReZqbDAhHR2VcW-uA7Zcf9I_3emAz8lYNODafHo08x1qj8yJNz36NA3zdkYgDUAJCe79Zy6FvFHhA5WRRDNWDgd70_zVLlfkXeJoKx7TE3HgXR6FEVfdwz79x42kB6I-kMUUTTAutbDHRU" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          <div className="lg:col-span-8 flex flex-col gap-stack-lg">
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-ambient-sm border border-surface-variant">
              <h2 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-4 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="tune">tune</span>
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Engine</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">1991 cc, 4 Cylinders</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Power</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">194 bhp @ 5800 rpm</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Torque</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">320 Nm @ 1650 rpm</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Transmission</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">9-Speed Automatic</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Drivetrain</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">RWD</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Color</p>
                  <p className="font-body-md text-body-md text-on-background font-medium">Obsidian Black</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-ambient-sm border border-surface-variant">
              <h2 className="font-headline-md text-headline-md text-on-background border-b border-surface-variant pb-4 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" data-icon="description">description</span>
                Description
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Meticulously maintained and exceptionally clean, this E-Class represents the pinnacle of executive luxury. Single owner, fully serviced at authorized centers with complete records. The interior features premium leather upholstery with open-pore wood trim, presenting a tactile and inviting environment. Equipped with the latest MBUX infotainment and advanced driver assistance systems.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-stack-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden border border-outline-variant relative">

              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#8b3e2f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              <div className="p-stack-md relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 shadow-sm border border-surface-variant">
                  <span className="material-symbols-outlined text-[#D4AF37] text-3xl filled-icon" data-icon="lock">lock</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-background mb-2">Inspection Report &amp; Service History</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 px-4">
                  Access a comprehensive 140-point inspection, complete service timeline, and structural integrity verification.
                </p>
                <div className="bg-inverse-surface text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-full flex items-center gap-2 mb-8 shadow-sm">
                  <span className="material-symbols-outlined text-secondary-fixed text-sm" data-icon="visibility">visibility</span>
                  7 buyers have already unlocked this report
                </div>
                <Link href={`/vehicle/${id}/unlock-report`} className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-primary-container transition-colors shadow-md relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
                  <span className="material-symbols-outlined text-[#D4AF37]" data-icon="key">key</span>
                  Unlock Report — ₹199
                </Link>
                <ContactDealerModal vehicleId={vehicle.id} vehicleModel={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
              </div>
            </div>

            <div className="bg-[#0A3622] rounded-xl p-6 border border-[#145C3A] flex items-start gap-4 shadow-ambient-sm">
              <span className="material-symbols-outlined text-[#D4AF37] text-3xl filled-icon" data-icon="verified">verified</span>
              <div>
                <h4 className="font-label-bold text-label-bold text-white mb-1">Tribe Certified Excellence</h4>
                <p className="font-body-md text-body-md text-green-100 text-sm">This vehicle has passed our rigorous physical and mechanical vetting process.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />



    </div>
  );
}
