export default function Page() {
  return (
    <div className="flex bg-surface min-h-screen font-body-md text-on-surface">


<nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-surface-container dark:bg-surface-container-highest border-r border-outline-variant dark:border-outline z-50 shadow-sm">
<div className="px-6 py-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Staff Portal</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Tribe Motors Admin</p>
</div>
<div className="px-margin-mobile mb-stack-md">
<button className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-label-bold text-label-bold py-3 px-4 rounded-lg hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined">add</span>
                Add New Vehicle
            </button>
</div>
<ul className="flex flex-col gap-1 flex-1 overflow-y-auto px-2">
<li>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-inverse-surface rounded-lg transition-colors font-label-bold text-label-bold mx-2" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-inverse-surface rounded-lg transition-colors font-label-bold text-label-bold mx-2" href="#">
<span className="material-symbols-outlined" data-icon="directions_car">directions_car</span>
                    Inventory
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-inverse-surface rounded-lg transition-colors font-label-bold text-label-bold mx-2" href="#">
<span className="material-symbols-outlined" data-icon="fact_check">fact_check</span>
                    Inspections
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-inverse-surface rounded-lg transition-colors font-label-bold text-label-bold mx-2" href="#">
<span className="material-symbols-outlined" data-icon="build">build</span>
                    Service Records
                </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container rounded-lg mx-2 font-label-bold text-label-bold active:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined filled-icon" data-icon="workspace_premium">workspace_premium</span>
                    Fulfillment
                </a>
</li>
</ul>
<div className="mt-auto px-2 pb-6 border-t border-outline-variant pt-4">
<ul className="flex flex-col gap-1">
<li>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-inverse-surface rounded-lg transition-colors font-label-bold text-label-bold mx-2" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
                        Settings
                    </a>
</li>
<li>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-inverse-surface rounded-lg transition-colors font-label-bold text-label-bold mx-2" href="#">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
                        Logout
                    </a>
</li>
</ul>
</div>
</nav>

<main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto w-full flex flex-col gap-stack-lg">

<header className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md pt-4">
<div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-2">Fulfillment Queue</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage and dispatch pending unlock reports to buyers. Ensure timely delivery to maintain premium service standards.</p>
</div>
<div className="flex gap-4">
<div className="relative w-full md:w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors" placeholder="Search buyers or vehicles..." type="text"/>
</div>
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center text-on-surface-variant" title="Filter">
<span className="material-symbols-outlined">filter_list</span>
</button>
</div>
</header>

<div className="flex border-b border-outline-variant">
<button className="px-6 py-3 font-label-bold text-label-bold tab-active transition-colors flex items-center gap-2">
                Pending Requests
                <span className="bg-primary text-on-primary rounded-full px-2 py-0.5 text-[10px] leading-tight">4</span>
</button>
<button className="px-6 py-3 font-label-bold text-label-bold tab-inactive hover:text-primary transition-colors">
                Completed
            </button>
</div>

<div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant font-label-bold text-label-bold text-on-surface-variant">
<th className="p-4 whitespace-nowrap">Buyer Information</th>
<th className="p-4 whitespace-nowrap">Vehicle Requested</th>
<th className="p-4 whitespace-nowrap">Contact Details</th>
<th className="p-4 whitespace-nowrap">Request Time</th>
<th className="p-4 whitespace-nowrap text-right">Action</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary font-headline-md text-headline-md">JD</div>
<div>
<p className="font-bold text-on-background">James Donovan</p>
<p className="text-on-surface-variant text-sm">Premium Member</p>
</div>
</div>
</td>
<td className="p-4">
<p className="font-bold text-on-background">2021 Porsche 911 Carrera S</p>
<p className="text-on-surface-variant text-sm">VIN: WPOZZZ99ZMS2...</p>
</td>
<td className="p-4">
<div className="flex items-center gap-2 text-on-background">
<span className="material-symbols-outlined text-[#25D366] text-lg">chat</span>
                                    +1 (555) 019-2834
                                </div>
</td>
<td className="p-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-lg">schedule</span>
<span className="text-error font-medium">10 mins ago</span>
</div>
</td>
<td className="p-4 text-right">
<button className="bg-primary text-on-primary font-label-bold text-label-bold py-2 px-4 rounded-lg hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 shadow-sm" >
<span className="material-symbols-outlined text-sm">send</span>
                                    Mark as Sent
                                </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary font-headline-md text-headline-md">SL</div>
<div>
<p className="font-bold text-on-background">Sarah Lin</p>
<p className="text-on-surface-variant text-sm">New Buyer</p>
</div>
</div>
</td>
<td className="p-4">
<p className="font-bold text-on-background">2019 Range Rover Sport HSE</p>
<p className="text-on-surface-variant text-sm">VIN: SALWA2EEXLA...</p>
</td>
<td className="p-4">
<div className="flex items-center gap-2 text-on-background">
<span className="material-symbols-outlined text-[#25D366] text-lg">chat</span>
                                    +1 (555) 847-9201
                                </div>
</td>
<td className="p-4">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-lg">schedule</span>
<span>45 mins ago</span>
</div>
</td>
<td className="p-4 text-right">
<button className="bg-primary text-on-primary font-label-bold text-label-bold py-2 px-4 rounded-lg hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 shadow-sm" >
<span className="material-symbols-outlined text-sm">send</span>
                                    Mark as Sent
                                </button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary font-headline-md text-headline-md">MW</div>
<div>
<p className="font-bold text-on-background">Michael Wright</p>
<p className="text-on-surface-variant text-sm">Returning Client</p>
</div>
</div>
</td>
<td className="p-4">
<p className="font-bold text-on-background">2022 BMW M4 Competition</p>
<p className="text-on-surface-variant text-sm">VIN: WBS43AW0XNC...</p>
</td>
<td className="p-4">
<div className="flex items-center gap-2 text-on-background">
<span className="material-symbols-outlined text-[#25D366] text-lg">chat</span>
                                    +44 7700 900077
                                </div>
</td>
<td className="p-4">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-lg">schedule</span>
<span>2 hours ago</span>
</div>
</td>
<td className="p-4 text-right">
<button className="bg-primary text-on-primary font-label-bold text-label-bold py-2 px-4 rounded-lg hover:bg-primary-container transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 shadow-sm" >
<span className="material-symbols-outlined text-sm">send</span>
                                    Mark as Sent
                                </button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="border-t border-outline-variant p-4 flex items-center justify-between bg-surface-container-lowest">
<span className="text-on-surface-variant font-body-md text-body-md text-sm">Showing 1 to 3 of 4 entries</span>
<div className="flex gap-2">
<button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-variant transition-colors text-on-surface-variant disabled:opacity-50" disabled={true}>Previous</button>
<button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-variant transition-colors text-on-surface-variant">Next</button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface dark:bg-on-background border-t border-outline-variant shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-50 pb-safe">
<ul className="flex justify-around items-center h-16">
<li>
<a className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-2xl">dashboard</span>
<span className="text-[10px] mt-1 font-label-sm">Dash</span>
</a>
</li>
<li>
<a className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-2xl">directions_car</span>
<span className="text-[10px] mt-1 font-label-sm">Inventory</span>
</a>
</li>
<li>
<a className="flex flex-col items-center justify-center w-16 h-full text-primary" href="#">
<span className="material-symbols-outlined filled-icon text-2xl">workspace_premium</span>
<span className="text-[10px] mt-1 font-label-sm font-bold">Queue</span>
</a>
</li>
<li>
<a className="flex flex-col items-center justify-center w-16 h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined text-2xl">settings</span>
<span className="text-[10px] mt-1 font-label-sm">Settings</span>
</a>
</li>
</ul>
</nav>


    </div>
  );
}