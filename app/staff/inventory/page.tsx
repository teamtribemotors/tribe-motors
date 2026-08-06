export default function Page() {
  return (
    <div className="bg-background text-on-background h-full flex font-body-md">


<aside className="fixed left-0 top-0 h-full w-64 bg-surface-container flex flex-col border-r border-outline-variant z-20">
<div className="px-6 py-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Tribe Motors</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Staff Portal</p>
</div>
<div className="px-6 mb-8 flex items-center gap-4">
<img className="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="A professional headshot of a staff member in a luxury car dealership environment. Soft, warm lighting highlighting a friendly expression. Subtle automotive background out of focus. High-end corporate portrait style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKEUk0mySnRmqItE8LVpOXylqclJ7nLthlte4miCMXrfMqysEJbSlx5sU2p14cLAsDebqvmvmunSaPWINOCuag4vYmBI9GyTmEdMLgqbvuH46tm2GiPJRBksxfVSlOy8JevLQFuV_Yf1DH85CTOjc7qoxFRa5YdPyUDSW5s1xvZj-5JWbNrVIoJLidnQvH6sIAqFBgNt9ZPP2Me0oY3y1yAp1jv7oTGKUJ9IvIftzwvnJh8T3nBdU"/>
<div>
<p className="font-label-bold text-label-bold text-on-surface">Alex Mercer</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Admin</p>
</div>
</div>
<nav className="flex-1 flex flex-col gap-2 px-2 overflow-y-auto">

<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined group-hover:text-primary transition-colors">dashboard</span>
<span className="font-label-bold text-label-bold">Dashboard</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg translate-x-1 duration-200 shadow-sm" href="#">
<span className="material-symbols-outlined">directions_car</span>
<span className="font-label-bold text-label-bold">Inventory</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined group-hover:text-primary transition-colors">fact_check</span>
<span className="font-label-bold text-label-bold">Inspections</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined group-hover:text-primary transition-colors">build</span>
<span className="font-label-bold text-label-bold">Service Records</span>
</a>

<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined group-hover:text-primary transition-colors">workspace_premium</span>
<span className="font-label-bold text-label-bold">Fulfillment</span>
</a>
</nav>
<div className="p-4 border-t border-outline-variant mt-auto">
<button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[20px]">add</span>
                Add New Vehicle
            </button>
<div className="flex flex-col gap-2 mt-4 px-2">
<a className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">settings</span>
<span className="font-label-bold text-label-bold">Settings</span>
</a>
<a className="flex items-center gap-3 px-2 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</div>
</div>
</aside>

<main className="flex-1 ml-64 p-margin-desktop flex flex-col h-full overflow-hidden bg-background">

<header className="flex justify-between items-end pb-6 border-b border-outline-variant mb-6 shrink-0">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Inventory Management</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage and track all vehicles currently in the dealership's possession.</p>
</div>
<div className="flex gap-4 items-center">
<div className="relative w-80">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant" placeholder="Search by make, model, or VIN..." type="text"/>
</div>
<button className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
<span className="material-symbols-outlined">add</span>
                    Add New Vehicle
                </button>
</div>
</header>

<div className="flex-1 bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-[0_4px_24px_rgba(139,62,47,0.04)] flex flex-col">

<div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest flex gap-4 shrink-0">
<select className="bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 font-label-sm text-label-sm text-on-surface focus:border-primary outline-none">
<option>All Statuses</option>
<option>Live</option>
<option>Draft</option>
<option>Sold</option>
</select>
<select className="bg-surface-container-low border border-outline-variant rounded-md px-3 py-2 font-label-sm text-label-sm text-on-surface focus:border-primary outline-none">
<option>Sort by: Date Added (Newest)</option>
<option>Sort by: Price (High to Low)</option>
<option>Sort by: Price (Low to High)</option>
</select>
</div>

<div className="grid grid-cols-12 gap-4 px-6 py-4 bg-surface-container-lowest border-b border-outline-variant font-label-bold text-label-bold text-on-surface-variant shrink-0 uppercase tracking-wider text-xs">
<div className="col-span-4">Vehicle</div>
<div className="col-span-2">VIN</div>
<div className="col-span-2">Price</div>
<div className="col-span-1">Status</div>
<div className="col-span-2">Date Added</div>
<div className="col-span-1 text-right">Actions</div>
</div>

<div className="overflow-y-auto flex-1 bg-surface-container-lowest">

<div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant items-center table-row-hover transition-colors">
<div className="col-span-4 flex items-center gap-4">
<img className="w-16 h-12 object-cover rounded shadow-sm" data-alt="A sleek dark grey 2021 Porsche 911 parked in a well-lit studio. Professional automotive photography, clean white background, high contrast, sharp details. Premium luxury sports car aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnpZH1koqDs2SqTmIaf-Tq4GEkqfZDwXArXSojwumIuBpKm3C2Ic1Bo-pW7T_DD71obxEjfL-_ALPNcFNpEYMUumRZU1W_7yQrSCIPqsB3PltjQ08xQp_eTMIMNEvNzkq7D1e8nlYz4UD7lk34mxKAmR73aqbPS-xj5PuTVXoaKUdsiceLKAoCEbtEIMc4XUuWvSjWWbW1e72kUcxVqRHyetQAShnZtBKMjmAM-1nzGJTILbSoXqk"/>
<div>
<p className="font-headline-md text-[16px] leading-snug text-on-surface font-semibold">2021 Porsche 911 Carrera S</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">3.0L Twin-Turbo Flat-6 • 12,450 mi</p>
</div>
</div>
<div className="col-span-2 font-body-md text-sm text-on-surface font-mono">WP0AB2A9XMS2XXXXX</div>
<div className="col-span-2 font-headline-md text-[18px] text-primary">$134,500</div>
<div className="col-span-1">
<span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px] uppercase tracking-wider font-bold">Live</span>
</div>
<div className="col-span-2 font-body-md text-sm text-on-surface-variant">Oct 12, 2023</div>
<div className="col-span-1 flex justify-end gap-2 text-on-surface-variant">
<button className="hover:text-primary transition-colors p-1" title="View"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
<button className="hover:text-primary transition-colors p-1" title="Edit"><span className="material-symbols-outlined text-[20px]">edit</span></button>
</div>
</div>

<div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant items-center table-row-hover transition-colors">
<div className="col-span-4 flex items-center gap-4">
<img className="w-16 h-12 object-cover rounded shadow-sm" data-alt="A pristine white 2022 Range Rover Autobiography. Studio lighting highlighting the smooth curves and luxurious imposing stance. High-end automotive commercial style. Bright and clean." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm3p7CRfb9UfZVM-Vtjf578FQGfw3RFcr-xc1IdAXrLJpoLqJAR4Om1zSXbv-ik4ALd7xVCEy_grvVGHqcWNQi6MPekxvFytWsN5a1iYnxcEo_pS9cINQ0WEc5QCiObW1ejOLKxrOWJwDfd7X2Box60z9MQNn9TQIg0aKoLMJMumG7jYAGq0BVfbVTRNWvj8f4km7MccilokTJWvje1Nz8WrkLGgzfEYLq5TMDqQLQAlhXrea772Y"/>
<div>
<p className="font-headline-md text-[16px] leading-snug text-on-surface font-semibold">2022 Land Rover Range Rover</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Autobiography LWB • 8,200 mi</p>
</div>
</div>
<div className="col-span-2 font-body-md text-sm text-on-surface font-mono">SALGS2RX5N2XXXXX</div>
<div className="col-span-2 font-headline-md text-[18px] text-primary">$152,000</div>
<div className="col-span-1">
<span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-variant text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider font-bold">Draft</span>
</div>
<div className="col-span-2 font-body-md text-sm text-on-surface-variant">Oct 14, 2023</div>
<div className="col-span-1 flex justify-end gap-2 text-on-surface-variant">
<button className="hover:text-primary transition-colors p-1" title="View"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
<button className="hover:text-primary transition-colors p-1" title="Edit"><span className="material-symbols-outlined text-[20px]">edit</span></button>
</div>
</div>

<div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-outline-variant items-center table-row-hover transition-colors opacity-60">
<div className="col-span-4 flex items-center gap-4">
<img className="w-16 h-12 object-cover rounded shadow-sm grayscale-[50%]" data-alt="A classic deep blue 2018 BMW M5. Studio shot with slight shadow underneath. Aggressive sporty front fascia. Premium performance sedan aesthetic. Professional lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfeTPIm0DbQbBrgVmac1vWk24muKwXHpEXd7yHLdlahj9rJdwhv5SbmmMokUdntTnOFOaLgeJ3bfFUSv4XG73rzqoLh0e6FxIGalW1lYyHnX8vWz-MIRKO2En-cqc6wh1npFfpGAEdbeKmtWDT_Ua3oZl2IsZBm2qMvKQX2kXYE7KrUrqbOpm4mxAiFd6JBwtZRXHqOsfq3Y9k1x7fnDbodMB-VShpN1z7F_Q0J6_HjxllTvR16xs"/>
<div>
<p className="font-headline-md text-[16px] leading-snug text-on-surface font-semibold line-through decoration-outline">2018 BMW M5 Base</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">4.4L V8 TwinPower Turbo • 34,000 mi</p>
</div>
</div>
<div className="col-span-2 font-body-md text-sm text-on-surface font-mono">WBSJF0C59JEXXXXXX</div>
<div className="col-span-2 font-headline-md text-[18px] text-on-surface-variant">$78,900</div>
<div className="col-span-1">
<span className="inline-flex items-center px-2 py-1 rounded-md bg-outline-variant text-on-surface font-label-sm text-[10px] uppercase tracking-wider font-bold">Sold</span>
</div>
<div className="col-span-2 font-body-md text-sm text-on-surface-variant">Sep 28, 2023</div>
<div className="col-span-1 flex justify-end gap-2 text-on-surface-variant">
<button className="hover:text-primary transition-colors p-1" title="View"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
<button className="opacity-30 cursor-not-allowed p-1" disabled={true}><span className="material-symbols-outlined text-[20px]">edit</span></button>
</div>
</div>
</div>

<div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-between items-center shrink-0">
<p className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 3 of 124 entries</p>
<div className="flex gap-2">
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled={true}>Prev</button>
<button className="px-3 py-1 border border-primary bg-primary text-on-primary rounded font-bold">1</button>
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container transition-colors">2</button>
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container transition-colors">3</button>
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface hover:bg-surface-container transition-colors">Next</button>
</div>
</div>
</div>
</main>

    </div>
  );
}