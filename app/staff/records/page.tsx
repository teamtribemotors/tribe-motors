import Link from 'next/link';
import { dummyStaffRecords } from '../../lib/dummy-data';
export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased flex h-screen overflow-hidden">


<nav aria-label="Sidebar Navigation" className="fixed left-0 top-0 h-full w-64 bg-surface-container flex flex-col border-r border-outline-variant z-20 hidden md:flex">
<div className="px-6 py-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Tribe Motors</h1>
<div className="mt-4 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden">
<img alt="Staff Member Avatar" className="w-full h-full object-cover" data-alt="A professional headshot of a mature man in a tailored dark grey suit, standing in a well-lit premium auto showroom with a blurred classic car in the background. High-key lighting, modern light-mode aesthetic, exuding trust and establishment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASmjPZPQ9O6ijIzRTWdimtybuvRxpPv_PRM1UdAViXsTYPCYRXhT3CHSTlp7aM0aFEP339cCjCAy2MywEXVsol5aYCgRZvzN-SZ3qBYjx9p5N445aLRUNJNZv1ZeRjrn7A1dhJTCjhJcRWHm4H39W_H8vOlS_rS4LYAiw_39BM_fCx8oFfhFcotaath09b8Z9Hp3BSOspMGENTJMNcm4tIn_udEk8cV5opWK3nITuWHg2onFLfNhA"/>
</div>
<div>
<p className="font-label-bold text-label-bold text-on-surface">Staff Portal</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Admin Access</p>
</div>
</div>
</div>
<div className="flex-1 overflow-y-auto py-4">
<ul className="space-y-2">

<li>
<a className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">dashboard</span>
<span className="font-label-bold text-label-bold">Dashboard</span>
</a>
</li>

<li>
<a className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">directions_car</span>
<span className="font-label-bold text-label-bold">Inventory</span>
</a>
</li>

<li>
<a className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">fact_check</span>
<span className="font-label-bold text-label-bold">Inspections</span>
</a>
</li>

<li>
<a className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg bg-primary text-on-primary translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined filled text-on-primary">build</span>
<span className="font-label-bold text-label-bold">Service Records</span>
</a>
</li>

<li>
<a className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">workspace_premium</span>
<span className="font-label-bold text-label-bold">Fulfillment</span>
</a>
</li>
</ul>
</div>
<div className="p-4 mt-auto border-t border-outline-variant">
<button className="w-full py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">add</span>
                Add New Vehicle
            </button>
<ul className="mt-4 space-y-2">
<li>
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-xl">settings</span>
<span className="font-label-bold text-label-bold">Settings</span>
</a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-xl">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</li>
</ul>
</div>
</nav>

<main className="flex-1 md:ml-64 bg-surface h-full overflow-y-auto flex flex-col">

<header className="px-margin-desktop py-stack-md flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-variant bg-surface-container-lowest sticky top-0 z-10 shadow-sm">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Service Records</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and review all vehicle service histories.</p>
</div>
<button className="bg-primary text-on-primary px-6 py-3 rounded font-label-bold text-label-bold flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors shadow-[0_4px_14px_rgba(139,62,47,0.15)]">
<span className="material-symbols-outlined text-lg">add_circle</span>
                Add New Record
            </button>
</header>
<div className="p-margin-desktop max-w-container-max mx-auto w-full flex-1 flex flex-col gap-stack-lg">

<section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_30px_rgba(139,62,47,0.04)] border border-surface-variant flex flex-col lg:flex-row gap-4 items-end">
<div className="flex-1 w-full relative">
<label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Search</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface placeholder:text-outline" placeholder="VIN or Customer Name..." type="text"/>
</div>
</div>
<div className="w-full lg:w-48 relative">
<label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Service Type</label>
<div className="relative">
<select className="w-full px-4 py-3 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface appearance-none cursor-pointer">
<option value="">All Types</option>
<option value="major">Major Service</option>
<option value="oil">Oil Change</option>
<option value="inspection">Inspection</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">arrow_drop_down</span>
</div>
</div>
<div className="w-full lg:w-48 relative">
<label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Date Range</label>
<div className="relative">
<input className="w-full px-4 py-3 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface cursor-pointer text-sm" type="date"/>
</div>
</div>
<button className="w-full lg:w-auto px-6 py-3 border-2 border-primary text-primary rounded font-label-bold text-label-bold hover:bg-primary-container hover:text-on-primary-container hover:border-primary-container transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">filter_list</span>
                    Filter
                </button>
</section>

<section className="flex-1 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgba(139,62,47,0.04)] border border-surface-variant overflow-hidden flex flex-col">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse min-w-[800px]">
<thead>
<tr className="bg-surface-container border-b border-surface-variant">
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Vehicle Details</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Customer</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Date</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Service Type</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-right">Cost</th>
<th className="py-4 px-6 font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-center">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant">

<tr className="hover:bg-surface-bright transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded bg-surface-variant overflow-hidden flex-shrink-0">
<img alt="Car Thumbnail" className="w-full h-full object-cover" data-alt="Close up of a classic British racing green sports car wheel and fender, detailed metallic reflection, studio lighting, premium automotive photography aesthetic, light mode." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHVP2m43gqA-DH9S8JKaL94qgrOSfd15PD2DD1jW2S26fNg_43iUp84SLOj9jDDOlTBKYSRg-821I4UQj7TypG5wzhjzLMCcF7O7vXqSwIfrZl2gI4j0nKRgGJkxJdGyrvbdkqNVkv7Oi_o44Uzb19wlUYAJ3-cBYph098PkPM9hZx6GQ6X32tW4cK2Cr3KeB53a1ogEtAuDmisBDwQ8fbRdg6hRud8pDvyMzyXB66SyJbI5CW51c"/>
</div>
<div>
<p className="font-body-md text-body-md font-semibold text-on-surface">2018 Jaguar F-Type</p>
<p className="font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5">VIN: SAJWA123456789</p>
</div>
</div>
</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface">Eleanor Vance</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Oct 12, 2024</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">oil_barrel</span>
                                        Major Service
                                    </span>
</td>
<td className="py-4 px-6 font-body-md text-body-md font-semibold text-on-surface text-right">₹1,250.00</td>
<td className="py-4 px-6">
<div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="View Details">
<span className="material-symbols-outlined text-xl">visibility</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="Edit Record">
<span className="material-symbols-outlined text-xl">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="Download PDF">
<span className="material-symbols-outlined text-xl">download</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-bright transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded bg-surface-variant overflow-hidden flex-shrink-0">
<img alt="Car Thumbnail" className="w-full h-full object-cover" data-alt="Detail shot of a silver luxury sedan grille, chrome accents gleaming under soft diffuse white light, professional showroom setting, established premium visual tone." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYFYRZkxsHqdhogXW-U8c3mYAut-9VQVANJeiGV9-zrxCiSTPJTDoHuw_DRS3fJ0qayXeUhYWWyO8GkP5M5aJXDB3M1X7-7B1uaeBPCFgbVSBv76RlhVCgm8Aoc4opKJRHwD1NwReW84-7PexuaPNTJAu88XlNltxtSmqR_-6RuH9sm280_zB2HizM7mP3b-CHKmY7rz0w9BZPm9A5nzthQBX0sm5JJVL6SoDvWA8LMVQgcoFdeqQ"/>
</div>
<div>
<p className="font-body-md text-body-md font-semibold text-on-surface">2021 Mercedes S-Class</p>
<p className="font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5">VIN: WBAAB987654321</p>
</div>
</div>
</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface">Marcus Sterling</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Oct 10, 2024</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">search_check</span>
                                        Inspection
                                    </span>
</td>
<td className="py-4 px-6 font-body-md text-body-md font-semibold text-on-surface text-right">₹350.00</td>
<td className="py-4 px-6">
<div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="View Details">
<span className="material-symbols-outlined text-xl">visibility</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="Edit Record">
<span className="material-symbols-outlined text-xl">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="Download PDF">
<span className="material-symbols-outlined text-xl">download</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-bright transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded bg-surface-variant overflow-hidden flex-shrink-0">
<img alt="Car Thumbnail" className="w-full h-full object-cover" data-alt="Macro photography of a deep maroon vintage car hood ornament, polished to a mirror finish, warm ambient lighting reflecting off the metal, premium automotive mood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpiDKFFsqo5OQkao0JN47uu9870VZZr50-MJkpS4gyeRSjcC96_VXgHCmj3_XlA--Xx2V6kmNrhr01HRCccvhD6rv4c7coxo69m95rz6Bkn_DBekiziTSp3OdWNy1j7cwq0l1OrljCIOTXzM4jl8i77NegtcdCVl39DIo84MkbteUA0xiH2Kwu5zIGVi0-sseOKa7BTaFhjFUeV4OUl6GMEj4ZsVkhqMXpiRp5smfnJzktZpYA0Vs"/>
</div>
<div>
<p className="font-body-md text-body-md font-semibold text-on-surface">1968 Ford Mustang</p>
<p className="font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5">VIN: 8F02J100001</p>
</div>
</div>
</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface">Thomas Shelby</td>
<td className="py-4 px-6 font-body-md text-body-md text-on-surface-variant">Sep 28, 2024</td>
<td className="py-4 px-6">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-error-container text-on-error-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">build_circle</span>
                                        Engine Rebuild
                                    </span>
</td>
<td className="py-4 px-6 font-body-md text-body-md font-semibold text-on-surface text-right">₹4,800.00</td>
<td className="py-4 px-6">
<div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="View Details">
<span className="material-symbols-outlined text-xl">visibility</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="Edit Record">
<span className="material-symbols-outlined text-xl">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-variant" title="Download PDF">
<span className="material-symbols-outlined text-xl">download</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="bg-surface-container py-3 px-6 border-t border-surface-variant flex items-center justify-between mt-auto">
<p className="font-label-sm text-label-sm text-on-surface-variant">Showing 1-3 of 42 records</p>
<div className="flex items-center gap-2">
<button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50" disabled={true}>
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center">1</button>
<button className="w-8 h-8 rounded hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition-colors">2</button>
<button className="w-8 h-8 rounded hover:bg-surface-variant text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition-colors">3</button>
<button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</section>
</div>
</main>

    </div>
  );
}