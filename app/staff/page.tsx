import Link from 'next/link';
export default function Page() {
  return (
    <div className="h-full flex antialiased text-on-background font-body-md bg-surface-container-low">


<nav className="fixed left-0 top-0 h-full w-64 bg-surface-container flex flex-col border-r border-outline-variant z-20">

<div className="px-6 py-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Tribe Motors</h1>
<div className="mt-4 flex items-center gap-3">
<img alt="Staff Member Avatar" className="w-10 h-10 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a well-dressed administrative staff member in a warmly lit, modern automotive showroom office setting. Soft, natural lighting. High quality photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRXz99O5MXab08DFZEm1cdWqY-Mv-D6tZ8ZSIK0xGfSOeNqLhNO1lUFBZZ4qD6aMDDCn9GVphwIDvHBZ0ywzBG4tXAyZ_g0oi4kEoBlN1Hfa4yAegjYF1hwYISbl8DKDEzAAbiL05phSTzwbZtz9DgIh6LxnLRnX1cAtA8-FUM8N8Jn7xCV-cRapc9h-AkeQ8yQH1cf_Eha776PHbwFVm-TkKO_ojI9y2IYoIrGGwH3oHtbM8jQCs"/>
<div>
<div className="font-label-bold text-label-bold text-on-surface">Staff Portal</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Admin Level</div>
</div>
</div>
</div>

<div className="flex-1 overflow-y-auto px-2 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg mx-2 transition-colors duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>dashboard</span>
<span className="font-label-bold text-label-bold">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined">directions_car</span>
<span className="font-label-bold text-label-bold">Inventory</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-label-bold text-label-bold">Inspections</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined">build</span>
<span className="font-label-bold text-label-bold">Service Records</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="font-label-bold text-label-bold">Fulfillment</span>
</a>
</div>

<div className="p-4">
<button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span className="material-symbols-outlined">add</span>
                Add New Vehicle
            </button>
</div>

<div className="p-4 border-t border-outline-variant space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-bold text-label-bold">Settings</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</div>
</nav>

<main className="flex-1 ml-64 p-margin-desktop bg-surface-container-low min-h-screen">

<header className="flex justify-between items-center mb-stack-md">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-background">Active Listings</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage current vehicle inventory and statuses.</p>
</div>
<div className="flex items-center gap-4">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none w-64 transition-all" placeholder="Search VIN or Model..." type="text"/>
</div>
<button className="p-2 bg-surface border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined">filter_list</span>
</button>
</div>
</header>

<div className="grid grid-cols-4 gap-gutter mb-stack-md">
<div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-bold text-label-bold text-on-surface-variant">Total Inventory</span>
<span className="material-symbols-outlined text-primary">inventory_2</span>
</div>
<div className="font-headline-lg text-headline-lg text-on-background">142</div>
</div>
<div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-bold text-label-bold text-on-surface-variant">Live Listings</span>
<span className="material-symbols-outlined text-secondary">public</span>
</div>
<div className="font-headline-lg text-headline-lg text-on-background">89</div>
</div>
<div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-bold text-label-bold text-on-surface-variant">Pending Review</span>
<span className="material-symbols-outlined text-tertiary">pending_actions</span>
</div>
<div className="font-headline-lg text-headline-lg text-on-background">12</div>
</div>
<div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-bold text-label-bold text-on-surface-variant">Sold (This Month)</span>
<span className="material-symbols-outlined text-primary">sell</span>
</div>
<div className="font-headline-lg text-headline-lg text-on-background">41</div>
</div>
</div>

<div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div className="overflow-x-auto custom-scrollbar">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container border-b border-outline-variant">
<tr>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Vehicle</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">VIN</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Price</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Status</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant">Added</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant font-body-md">

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-4 px-6">
<div className="flex items-center gap-4">
<img alt="Porsche 911" className="w-16 h-12 rounded object-cover border border-outline-variant" data-alt="A sleek, black 2021 Porsche 911 Carrera parked in a clean, modern studio with dramatic overhead lighting. The paint is highly polished, reflecting the stark white lights. Automotive photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHFdr7-I74ozLUBwH6-s9joozSO1A0LfBJ4TvLj_4avH9IDEZIsOEsiXJ8FV6m0yYHoBgN4ED2JPZAF7H06q2AXGGq5PB9indS5LzTibBfnYWqOsLkdfrKWluT8g7bPzfuY1lSxrWp8TkxQR2MaCEz1qKtRQG4FUz5kBQPCq27NZSlF4Yk6lpHSnvRuY1khH8DRJothdwxoGC6SQNXXogZwJ4KIBfHTCvcSiWUOJFWtTgSabd3ZOk"/>
<div>
<div className="font-label-bold text-on-surface">2021 Porsche 911 Carrera</div>
<div className="text-label-sm text-on-surface-variant mt-0.5">Black • 12k miles</div>
</div>
</div>
</td>
<td className="py-4 px-6 text-on-surface-variant">WPOAA299...</td>
<td className="py-4 px-6 font-label-bold text-primary">$105,900</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-bold bg-secondary-container text-on-secondary-container">
                                    Live
                                </span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Oct 12, 2023</td>
<td className="py-4 px-6 text-right">
<button className="text-primary hover:text-primary-container font-label-bold text-label-bold transition-colors">Edit</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-4 px-6">
<div className="flex items-center gap-4">
<img alt="Range Rover Sport" className="w-16 h-12 rounded object-cover border border-outline-variant" data-alt="A pristine white 2022 Range Rover Sport HSE parked in front of a modern glass building. Soft daylight reflecting off the elegant body panels. High end commercial automotive styling." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-RV7O8TKmtYryINaf82xuzm50A83Rlw1Ol3Bt_6ZPhU38PeAjZgAEr139cpFo1yg0eUMYoubkRLz0AKD7kUPEFeSIMtRuCeCVFhW_ftCUxqqUnIo70fSLukiibkMTquYzCk8r3KKh-y84ka1b0hLRIbxTqBQBjAR9H3yGSWL6fdNW9q0asT5a4uyPKxjWsjcBx1SemDMTrpn9PbuFtR80RxPpI8999JtAR6G4bd6BKRiGz7kq-4U"/>
<div>
<div className="font-label-bold text-on-surface">2022 Range Rover Sport</div>
<div className="text-label-sm text-on-surface-variant mt-0.5">White • 8k miles</div>
</div>
</div>
</td>
<td className="py-4 px-6 text-on-surface-variant">SALCA2...</td>
<td className="py-4 px-6 font-label-bold text-primary">$82,500</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-bold bg-surface-variant text-on-surface-variant">
                                    Draft
                                </span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Oct 14, 2023</td>
<td className="py-4 px-6 text-right">
<button className="text-primary hover:text-primary-container font-label-bold text-label-bold transition-colors">Edit</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-4 px-6">
<div className="flex items-center gap-4">
<img alt="BMW M5" className="w-16 h-12 rounded object-cover border border-outline-variant" data-alt="A dark blue 2019 BMW M5 Competition sitting in a sophisticated underground garage with cinematic, moody lighting highlighting its aggressive stance. Professional automotive photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqkW7OHe5tv-XtnFY6rL2Dax9BsHT089N_lavACmgER2sdeezYIGOtqDDrqZuTCOwxOVxEk1apGXTFoMEgnG6VXBC6-yfl8NH7ZRwhD6orZlW9HbZwzrf6vAV_HkNZBJNzGpUMSBRqfg8BQMJ7O-FLjto9Nq5w5AqkNvyab1tvkl4SkTPnLpIhQ-jceKa36_7g8Q99canvVM4eQDTfYvKye3kC2zIqlOUQ-LaOVOdHXnXWLwQJXu4"/>
<div>
<div className="font-label-bold text-on-surface">2019 BMW M5 Comp</div>
<div className="text-label-sm text-on-surface-variant mt-0.5">Blue • 24k miles</div>
</div>
</div>
</td>
<td className="py-4 px-6 text-on-surface-variant">WBSJF0C...</td>
<td className="py-4 px-6 font-label-bold text-primary">$78,000</td>
<td className="py-4 px-6">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-bold bg-tertiary-container text-on-tertiary-container">
                                    Pending
                                </span>
</td>
<td className="py-4 px-6 text-on-surface-variant">Oct 15, 2023</td>
<td className="py-4 px-6 text-right">
<button className="text-primary hover:text-primary-container font-label-bold text-label-bold transition-colors">Edit</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-6 py-4 border-t border-outline-variant bg-surface flex items-center justify-between">
<span className="text-label-sm font-label-sm text-on-surface-variant">Showing 1 to 10 of 142 entries</span>
<div className="flex gap-2">
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-50" disabled={true}>Prev</button>
<button className="px-3 py-1 border border-outline-variant rounded bg-primary text-on-primary font-label-bold">1</button>
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-variant transition-colors">2</button>
<button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-variant transition-colors">Next</button>
</div>
</div>
</div>
</main>

    </div>
  );
}