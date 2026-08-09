import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary-fixed selection:text-on-primary-fixed">


<aside className="fixed left-0 top-0 h-full w-64 bg-surface-container dark:bg-surface-container-highest border-r border-outline-variant flex flex-col z-40">
<div className="px-6 py-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Tribe Motors</h1>
</div>
<div className="px-6 pb-6 flex items-center gap-4 border-b border-outline-variant mb-6">
<img className="w-12 h-12 rounded-full object-cover" data-alt="A professional headshot of a staff member in a premium automotive showroom setting, wearing a sharp dark suit. The lighting is warm and inviting, highlighting a sense of luxury and trust typical of a high-end dealership." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5qg78tXbNujPA2hmu538L-qFyCH2vshTd0dGoTtjlzULDA_iKbqulpJAJgXMRWyurfLsgZMP2FtN-HRBlkGl1jAB4Qt6BrEcCdCGTtpn3JDGWzC1CCyC8xdmiTv1gZo534jJLZdvGgqI4yUeKEijSCpOqM1KtYlJ_7fvKApKZ6M-Gd7UTNZN0qnml5q2054WVrS5V9d8ms82ZLwShum4Exvc_d-nf10rVZy9Ffw5QqDZX55kyKXs"/>
<div>
<p className="font-label-bold text-label-bold text-on-surface">Staff Portal</p>
<p className="font-body-md text-body-md text-on-surface-variant text-sm">Tribe Motors Admin</p>
</div>
</div>
<nav className="flex-1 px-4 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-bold text-label-bold">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg mx-2 group" href="#">
<span className="material-symbols-outlined" data-icon="directions_car">directions_car</span>
<span className="font-label-bold text-label-bold">Inventory</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors mx-2 group" href="#">
<span className="material-symbols-outlined" data-icon="fact_check">fact_check</span>
<span className="font-label-bold text-label-bold">Inspections</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors mx-2 group" href="#">
<span className="material-symbols-outlined" data-icon="build">build</span>
<span className="font-label-bold text-label-bold">Service Records</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors mx-2 group" href="#">
<span className="material-symbols-outlined" data-icon="workspace_premium">workspace_premium</span>
<span className="font-label-bold text-label-bold">Fulfillment</span>
</a>
</nav>
<div className="px-4 py-6">
<button className="w-full bg-primary text-on-primary py-3 rounded font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                Add New Vehicle
            </button>
</div>
<div className="px-4 pb-6 mt-auto space-y-2 border-t border-outline-variant pt-6">
<a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-label-bold text-label-bold">Settings</span>
</a>
<a className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors group" href="#">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span className="font-label-bold text-label-bold">Logout</span>
</a>
</div>
</aside>

<main className="ml-64 flex-1 p-margin-desktop bg-background min-h-screen">
<header className="mb-stack-lg flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Add New Vehicle</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Enter the details for the new inventory listing.</p>
</div>
<div className="flex gap-4">
<button className="px-6 py-2 rounded border-2 border-primary text-primary font-label-bold text-label-bold hover:bg-primary-fixed hover:border-primary-fixed transition-colors" type="button">
                    Cancel
                </button>
<button className="px-6 py-2 rounded bg-primary text-on-primary font-label-bold text-label-bold hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(139,62,47,0.15)]" form="vehicle-form" type="submit">
                    Save Vehicle
                </button>
</div>
</header>
<form className="max-w-5xl space-y-stack-md" id="vehicle-form">

<div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">

<div className="xl:col-span-2 space-y-stack-md">

<section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
<h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="directions_car">directions_car</span>
                            Basic Details
                        </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
<div>
<label className="custom-label" htmlFor="make">Make</label>
<select className="custom-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2355433f%22%20strokeWidth%3D%222%22%20strokeLinecap%3D%22round%22%20strokeLinejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em]" id="make">
<option disabled={true} selected={true} value="">Select Make</option>
<option value="audi">Audi</option>
<option value="bmw">BMW</option>
<option value="mercedes">Mercedes-Benz</option>
<option value="porsche">Porsche</option>
</select>
</div>
<div>
<label className="custom-label" htmlFor="model">Model</label>
<input className="custom-input" id="model" placeholder="e.g. 911 Carrera S" type="text"/>
</div>
<div>
<label className="custom-label" htmlFor="year">Year</label>
<input className="custom-input" id="year" max="2025" min="1990" placeholder="YYYY" type="number"/>
</div>
<div>
<label className="custom-label" htmlFor="vin">VIN</label>
<input className="custom-input uppercase font-mono" id="vin" placeholder="17-character VIN" type="text"/>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
<h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="settings_suggest">settings_suggest</span>
                            Specifications
                        </h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-6">
<div>
<label className="custom-label" htmlFor="mileage">Mileage (km)</label>
<input className="custom-input" id="mileage" placeholder="0" type="number"/>
</div>
<div>
<label className="custom-label" htmlFor="transmission">Transmission</label>
<select className="custom-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2355433f%22%20strokeWidth%3D%222%22%20strokeLinecap%3D%22round%22%20strokeLinejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em]" id="transmission">
<option value="auto">Automatic</option>
<option value="manual">Manual</option>
</select>
</div>
<div>
<label className="custom-label" htmlFor="fuel">Fuel Type</label>
<select className="custom-input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2355433f%22%20strokeWidth%3D%222%22%20strokeLinecap%3D%22round%22%20strokeLinejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em]" id="fuel">
<option value="petrol">Petrol</option>
<option value="diesel">Diesel</option>
<option value="electric">Electric</option>
<option value="hybrid">Hybrid</option>
</select>
</div>
<div className="md:col-span-3">
<label className="custom-label">Exterior Color</label>
<div className="flex flex-wrap gap-4 mt-2">

<label className="relative cursor-pointer">
<input className="peer sr-only" name="color" type="radio"/>
<div className="w-8 h-8 rounded-full bg-black border-2 border-transparent peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
</label>
<label className="relative cursor-pointer">
<input checked={true} className="peer sr-only" name="color" type="radio"/>
<div className="w-8 h-8 rounded-full bg-white border border-outline-variant peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
</label>
<label className="relative cursor-pointer">
<input className="peer sr-only" name="color" type="radio"/>
<div className="w-8 h-8 rounded-full bg-gray-400 border border-transparent peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
</label>
<label className="relative cursor-pointer">
<input className="peer sr-only" name="color" type="radio"/>
<div className="w-8 h-8 rounded-full bg-red-700 border border-transparent peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
</label>
<label className="relative cursor-pointer">
<input className="peer sr-only" name="color" type="radio"/>
<div className="w-8 h-8 rounded-full bg-blue-800 border border-transparent peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-primary transition-all"></div>
</label>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
<h3 className="font-headline-md text-headline-md text-on-background mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="photo_camera">photo_camera</span>
                            Media Gallery
                        </h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Upload high-quality images. The first image will be used as the cover.</p>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:text-primary transition-colors" data-icon="cloud_upload">cloud_upload</span>
<p className="font-label-bold text-label-bold text-on-surface mb-1">Click to upload or drag and drop</p>
<p className="font-body-md text-body-md text-sm text-on-surface-variant">SVG, PNG, JPG or GIF (max. 800x400px)</p>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
<div className="relative aspect-[3/2] rounded overflow-hidden group border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A pristine white Porsche 911 parked in a minimalist, well-lit modern showroom. The glossy paint reflects warm overhead lights, emphasizing the car's sleek curves against a clean, off-white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCin5fM3hME3Gke4YZYLcuVFT_G8lzTJmdUc683UYse4u13kiUqPe4UVlWx_0m1ewukmu5oFo2YCXMKNc6W8dsizEAagMWIRzNYB9u_jTxmK9Jh9UndGuZUVm9vs5AVxsIISX-pYIFsgvDaGf-AHkfwYkLiPN-4WgPJxeIPhWAAlIQkSTZEFnFU5vOevq8gv9qgPxJBDPI9kBxOJlnHjC_HyLGM6zye7XsjRB71Xf8gHrjYac_U5Qg"/>
<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<button className="text-white p-1 hover:text-error transition-colors" type="button"><span className="material-symbols-outlined" data-icon="delete">delete</span></button>
</div>
<span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded font-label-bold">Cover</span>
</div>
<div className="relative aspect-[3/2] rounded overflow-hidden group border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A detailed close-up shot of the driver's side front wheel of a luxury sports car, showing the intricate alloy spoke design and a hint of the red brake caliper behind it, set against a smooth concrete floor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYBNZewd2t-_YigDnfh6AspMb6bKtRCtGz8GrtmB11W9mvQ94vN_Qfm1oMXHtlxvyO_AznGLg-yKQUX15nfh-MF9KaucV6PdEodquIiPEXqyLWbO4SEkT7HCRVfE1VN6BBYrAPg1GkKt3ymOannkILy1zYBeSpOf5-gvU3LjzI9UhHxoc2BBJON6qxtxNs3XMV2gP0pRjXRwQV6ekZ6reyklzFQ8u5YSMfpjs5ECBDarrzjh_RMEk"/>
<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<button className="text-white p-1 hover:text-error transition-colors" type="button"><span className="material-symbols-outlined" data-icon="delete">delete</span></button>
</div>
</div>
<div className="relative aspect-[3/2] rounded overflow-hidden border-2 border-dashed border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-primary transition-colors cursor-pointer bg-surface-container-low">
<span className="material-symbols-outlined" data-icon="add">add</span>
</div>
</div>
</section>
</div>

<div className="space-y-stack-md">

<section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
<h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="payments">payments</span>
                            Pricing &amp; Status
                        </h3>
<div className="space-y-6">
<div>
<label className="custom-label" htmlFor="price">Listing Price (₹)</label>
<div className="relative">
<span className="absolute left-4 top-3 text-on-surface-variant font-body-md">₹</span>
<input className="custom-input pl-8 text-lg font-bold text-primary" id="price" placeholder="0.00" type="number"/>
</div>
</div>
<hr className="border-outline-variant"/>
<div>
<label className="custom-label mb-3">Inventory Status</label>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant bg-surface-container-low hover:border-primary transition-colors">
<input checked={true} className="text-primary focus:ring-primary border-outline" name="status" type="radio" value="available"/>
<span className="font-label-bold text-label-bold text-on-surface">Available</span>
</label>
<label className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant hover:border-primary transition-colors">
<input className="text-primary focus:ring-primary border-outline" name="status" type="radio" value="pending"/>
<span className="font-label-bold text-label-bold text-on-surface">Sale Pending</span>
</label>
<label className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant hover:border-primary transition-colors opacity-70">
<input className="text-primary focus:ring-primary border-outline" name="status" type="radio" value="sold"/>
<span className="font-label-bold text-label-bold text-on-surface">Sold</span>
</label>
</div>
</div>
<hr className="border-outline-variant"/>
<div>
<label className="flex items-start gap-3 cursor-pointer">
<input checked={true} className="mt-1 rounded text-secondary focus:ring-secondary border-outline" type="checkbox"/>
<div>
<span className="block font-label-bold text-label-bold text-on-surface mb-1 flex items-center gap-1">
                                            Tribe Certified <span className="material-symbols-outlined text-tertiary-container text-sm" data-icon="workspace_premium" data-weight="fill" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</span>
<span className="block text-sm font-body-md text-on-surface-variant">Vehicle has passed the 150-point inspection and qualifies for premium warranty.</span>
</div>
</label>
</div>
</div>
</section>

<section className="bg-primary-container/10 rounded-xl p-stack-md border border-primary-container/20">
<h4 className="font-label-bold text-label-bold text-primary mb-2">Need Help?</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">Refer to the vehicle onboarding guide for detailed instructions on photography and specification accuracy.</p>
<a className="inline-flex items-center gap-2 text-primary hover:text-on-primary-fixed-variant font-label-bold text-label-bold transition-colors" href="#">
                             View Guidelines <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</a>
</section>
</div>
</div>

</form>
</main>

    </div>
  );
}