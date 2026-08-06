import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex font-body-md">



<main className="flex-1 max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">

<div className="mb-stack-lg">
<button className="flex items-center gap-base text-on-surface-variant hover:text-primary transition-colors mb-stack-sm font-label-bold">
<span className="material-symbols-outlined text-[20px]">arrow_back</span>
                Back to Records List
            </button>
<h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Upload Service Record</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-base">Enter the details of a completed service or repair.</p>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(139,62,47,0.08)] p-stack-md md:p-stack-lg border border-outline-variant/30">
<form>

<section className="mb-stack-lg">
<h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-base border-b border-outline-variant/30 pb-base">
<span className="material-symbols-outlined">directions_car</span>
                        Vehicle Information
                    </h2>
<div className="grid grid-cols-1 gap-gutter">
<div>
<label className="block font-label-bold text-label-bold text-on-surface mb-base">Search Vehicle by VIN</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Enter 17-digit VIN" type="text"/>
</div>
</div>
</div>
</section>

<section className="mb-stack-lg">
<h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-base border-b border-outline-variant/30 pb-base">
<span className="material-symbols-outlined">build</span>
                        Service Details
                    </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div>
<label className="block font-label-bold text-label-bold text-on-surface mb-base">Date of Service</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">calendar_today</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-on-surface" type="date"/>
</div>
</div>
<div>
<label className="block font-label-bold text-label-bold text-on-surface mb-base">Mileage at Service</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">speed</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. 45,000" type="number"/>
</div>
</div>
<div className="md:col-span-2">
<label className="block font-label-bold text-label-bold text-on-surface mb-base">Service Center</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">store</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Name of Dealership or Shop" type="text"/>
</div>
</div>
<div className="md:col-span-2">
<label className="block font-label-bold text-label-bold text-on-surface mb-base">Type of Service</label>
<div className="relative">
<select className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-4 pr-10 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
<option disabled={true} selected={true} value="">Select Primary Category</option>
<option value="routine">Routine Maintenance (Oil, Filters)</option>
<option value="repair">Mechanical Repair</option>
<option value="inspection">Comprehensive Inspection</option>
<option value="bodywork">Body &amp; Paint</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>
</div>
</section>

<section className="mb-stack-lg">
<h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-base border-b border-outline-variant/30 pb-base">
<span className="material-symbols-outlined">receipt_long</span>
                        Line Items
                    </h2>
<div className="space-y-stack-sm mb-stack-sm">

<div className="flex gap-base items-start">
<div className="flex-1">
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Item Description (e.g. Synthetic Oil Change)" type="text"/>
</div>
<div className="w-32 relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-bold">$</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-8 pr-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Cost" type="number"/>
</div>
<button className="p-3 text-on-surface-variant hover:text-error transition-colors mt-1" type="button">
<span className="material-symbols-outlined">delete</span>
</button>
</div>

<div className="flex gap-base items-start">
<div className="flex-1">
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Item Description" type="text"/>
</div>
<div className="w-32 relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-bold">$</span>
<input className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-8 pr-4 py-3 font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Cost" type="number"/>
</div>
<button className="p-3 text-on-surface-variant hover:text-error transition-colors mt-1" type="button">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<button className="font-label-bold text-label-bold text-primary flex items-center gap-1 hover:text-on-primary-fixed-variant transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">add</span>
                        Add Another Item
                    </button>
</section>

<section className="mb-stack-lg">
<h2 className="font-headline-md text-headline-md text-primary mb-stack-md flex items-center gap-base border-b border-outline-variant/30 pb-base">
<span className="material-symbols-outlined">upload_file</span>
                        Document Upload
                    </h2>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-stack-lg text-center bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer">
<span className="material-symbols-outlined text-[48px] text-outline mb-stack-sm">cloud_upload</span>
<h3 className="font-label-bold text-label-bold text-on-surface mb-1">Drag and drop receipts here</h3>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-stack-md">or click to browse from your device (PDF, JPG, PNG)</p>
<button className="bg-surface border-2 border-primary text-primary px-6 py-2 rounded-lg font-label-bold text-label-bold hover:bg-surface-container transition-colors" type="button">
                            Browse Files
                        </button>
</div>
</section>

<div className="flex items-center justify-end gap-stack-sm pt-stack-md border-t border-outline-variant/30">
<button className="px-6 py-3 font-label-bold text-label-bold text-on-surface hover:bg-surface-container rounded-lg transition-colors" type="button">
                        Cancel
                    </button>
<button className="px-8 py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm" type="submit">
                        Save Record
                    </button>
</div>
</form>
</div>
</main>

    </div>
  );
}