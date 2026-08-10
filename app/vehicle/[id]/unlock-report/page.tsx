import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dummyInventory } from '../../../lib/dummy-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = dummyInventory.find(v => v.id === id);
  if (!vehicle) return notFound();

  return (
    <div className="text-on-background">

      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#fbf9f9] group/design-root overflow-x-hidden font-['Be_Vietnam_Pro','Noto_Sans',sans-serif]">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[480px] flex-1 bg-white rounded-xl checkout-card border border-surface-container overflow-hidden">

              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1ebea] px-6 py-4">
                <div className="flex items-center gap-4 text-[#181210]">
                  <div className="size-6 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-[#181210] text-lg font-bold leading-tight tracking-[-0.015em]">Checkout</h2>
                </div>
                <Link href={`/vehicle/${vehicle.id}`} className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-[#f1ebea] text-[#181210] transition-colors hover:bg-surface-dim">
                  <div className="text-[#181210]" data-icon="X" data-size="20px" data-weight="regular">
                    <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                    </svg>
                  </div>
                </Link>
              </header>
              <main className="flex flex-col">

                <div className="p-6 bg-surface-container-low/50">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-primary text-[10px] font-bold uppercase tracking-wider">Booking Selection</span>
                      <h3 className="text-on-surface text-xl font-bold leading-tight">{vehicle.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-sm text-outline">verified</span>
                        <p className="text-outline text-xs font-medium">Standard Maintenance Package</p>
                      </div>
                    </div>
                    <div className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shadow-sm border border-white" data-alt={vehicle.imageAlt} style={{ backgroundImage: `url(${vehicle.imageUrl})` }}>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-on-surface text-base font-bold leading-tight mb-4">Payment Summary</h4>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-outline-variant">
                      <span className="text-on-surface/70 text-sm">Booking Fee</span>
                      <span className="text-on-surface font-semibold">₹199.00</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-on-surface font-bold">Total Amount</span>
                      <span className="text-primary-container text-2xl font-bold">₹199</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <p className="text-on-surface text-sm font-bold leading-normal">WhatsApp Number</p>
                        <span className="text-primary text-[10px] font-bold">REQUIRED</span>
                      </div>
                      <div className="flex w-full items-stretch rounded-lg group">
                        <div className="flex items-center justify-center px-4 bg-surface-container border border-[#e2d7d4] border-r-0 rounded-l-lg text-on-surface/60 font-medium text-sm">
                          +91
                        </div>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#181210] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e2d7d4] bg-[#fbf9f9] focus:border-primary h-14 placeholder:text-outline/50 px-4 text-base font-medium leading-normal transition-all" placeholder="Enter 10-digit number" type="tel" />
                        <div className="text-secondary flex border border-[#e2d7d4] bg-[#fbf9f9] items-center justify-center px-4 rounded-r-lg border-l-0" data-icon="WhatsappLogo" data-size="24px" data-weight="regular">
                          <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[10px] text-outline italic">We&apos;ll send your booking confirmation and receipt via WhatsApp.</p>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary-container text-[#fbf9f9] text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary hover:shadow-lg active:scale-[0.98]">
                      <span className="relative z-10 flex items-center gap-2">
                        Confirm &amp; Pay ₹199
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </span>
                    </button>
                    <p className="text-center text-[11px] text-outline mt-3">By continuing, you agree to our Terms of Service.</p>
                  </div>
                </div>

                <div className="p-6 bg-surface-container-highest/20 mt-auto">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 text-outline/60">
                      <span className="material-symbols-outlined text-lg">format_image_left</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">100% Secure Payments</span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                      <div className="h-6 w-20 flex items-center justify-center">
                        <img className="h-full object-contain" data-alt={vehicle.imageAlt} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbtRg8jNu0TS-g6693W2D96G1xqTHVtW18SP60hsW_wQ-wMJ_xOTppKMbR98iyXtxHjhet5YJ0G76dJMmAZXVU04cnLh_FxGwB-BCL5CknzB5CDjHcgKCZKyEdvlCvnh-nWMNdq3wWfs3CFhUNVIi2vGYRdfNKXVmhBYMPRy-iNV9oD5L2mBkSGjvI1IoOo7sQJdq3t9Wm4wBu8OvIo8XCHvE7p6-5zyMMwGVQeTf--l-GyJ5piPM" />
                      </div>
                      <div className="h-6 w-16 flex items-center justify-center">
                        <img className="h-full object-contain" data-alt={vehicle.imageAlt} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLkNzYmgNAixyl35RqPsR-PpinORCdoUN7lCONuBNSEEbB5PgKlolbV9sSZmSfzpvBFG0tdtESziAGbOss0FWF9-9Btys-mthKBo6tebp9ZT7YxS9iDoXaetzkx0TY2GAUYJHJWcrRyjXfvWTCUhUtxrG_8TEdMb2A89YP3SR3mkBLCx79Pjw29E3umLJgRPpZaUlURexTW1OIJeuKEJvX06nSGQ0e3-FUhbAtgbPW7susklpTGMA" />
                      </div>
                      <div className="h-6 w-16 flex items-center justify-center">
                        <img className="h-full object-contain" data-alt={vehicle.imageAlt} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwD9Q9PYyy4mWOc6jmKnvvMdvgIiSkKC_28Ox_weuNQqcRLfEr6EefbGUvylsmfIN8sG3eqxCDaGQ8XCeVRjItt9-OieHMPSbCzyGvoutE_2GCg0S5qOjpIBQlf4wwl11jAvcYHst-j_A7qFrYz2vihxwgopVLu3DTCY5xJf2KTxVn6NOza3NS4gTLWobC9T_7H6PLhyJ6_YIhn5TLco_6zCn5Q9wendnNY17S8hT3nh_nS7hr2JM" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-outline/50 text-[10px]">
                      <span>SSL Encrypted Connection</span>
                      <span className="material-symbols-outlined text-[12px]">lock</span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
