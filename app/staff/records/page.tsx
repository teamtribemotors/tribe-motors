"use client";

import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';

export default function ServiceRecordsPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
            <StaffSidebar />
            <main className="flex-1 flex flex-col overflow-hidden bg-surface-bright">
                <StaffHeader title="Service Records" icon="description" />

                {/* Page Content */}
                <div className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto w-full custom-scrollbar">
                    {/* Page Header & Actions */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-sm">
                        <div>
                            <h1 className="font-display-lg text-display-lg text-on-surface">Service Records</h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Manage and track vehicle maintenance and inspection history.</p>
                        </div>
                        <div className="flex items-center gap-sm">
                            <div className="relative w-full md:w-80 group">
                                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors">search</span>
                                <input className="w-full h-10 pl-10 pr-sm rounded-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-surface transition-all outline-none" placeholder="Search by VIN or Model..." type="text" />
                            </div>
                            <button className="font-label-md text-label-md bg-primary text-on-primary px-sm py-xs h-10 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-xs whitespace-nowrap">
                                <span className="material-symbols-outlined text-[18px]">add</span> Upload New Record
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-2 rounded-full bg-on-surface-variant text-surface font-label-md text-label-md shadow-sm">All</button>
                            <button className="px-4 py-2 rounded-full bg-surface-container text-on-background font-label-md text-label-md hover:bg-surface-container-high transition-colors border border-outline-variant/50">Pending</button>
                            <button className="px-4 py-2 rounded-full bg-surface-container text-on-background font-label-md text-label-md hover:bg-surface-container-high transition-colors border border-outline-variant/50">Complete</button>
                        </div>
                        <div className="relative">
                            <select className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg pl-4 pr-10 py-2 font-body-md text-body-md focus:border-on-surface-variant focus:ring-1 focus:ring-on-surface-variant shadow-sm">
                                <option>Record Type: All</option>
                                <option>Maintenance</option>
                                <option>Inspection</option>
                                <option>Ownership</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col mb-16">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-bright">
                                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-outline">Vehicle</th>
                                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-outline">Record Type</th>
                                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-outline">Date Added</th>
                                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-outline">Status</th>
                                        <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-outline text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                    <tr className="hover:bg-surface-bright-alt transition-colors group">
                                        <td className="py-md px-6">
                                            <div className="flex items-center gap-sm">
                                                <div className="w-16 h-12 rounded bg-surface-container overflow-hidden shrink-0">
                                                    <div className="w-full h-full bg-surface-variant"></div>
                                                </div>
                                                <div>
                                                    <p className="text-on-surface text-sm font-semibold">1973 Porsche 911T</p>
                                                    <p className="font-body-md text-sm text-on-surface-variant/80">VIN: WP0ZZZ91ZTS123456</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-md px-6">
                                            <p className="font-body-md text-body-md">150-Point Inspection</p>
                                        </td>
                                        <td className="py-md px-6 font-body-md text-body-md text-sm text-on-surface-variant">Oct 24, 2023</td>
                                        <td className="py-md px-6">
                                            <span className="inline-flex items-center rounded-full bg-tertiary-fixed px-2 py-1 text-[10px] font-bold text-on-tertiary-fixed uppercase tracking-tight">Complete</span>
                                        </td>
                                        <td className="py-md px-6 text-right">
                                            <button className="font-label-md text-label-md text-primary border border-primary/30 px-sm py-xs rounded hover:bg-primary-fixed/20 transition-colors opacity-0 group-hover:opacity-100">View</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-bright-alt transition-colors group relative">
                                        <td className="py-md px-6">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                                            <div className="flex items-center gap-sm pl-2">
                                                <div className="w-16 h-12 rounded bg-surface-container overflow-hidden shrink-0">
                                                    <div className="w-full h-full bg-surface-variant"></div>
                                                </div>
                                                <div>
                                                    <p className="text-on-surface text-sm font-semibold">1988 Land Rover Defender</p>
                                                    <p className="font-body-md text-sm text-on-surface-variant/80">VIN: SALLDHMM7FA123456</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-md px-6">
                                            <p className="font-body-md text-body-md">Engine Overhaul</p>
                                        </td>
                                        <td className="py-md px-6 font-body-md text-body-md text-sm text-on-surface-variant">Oct 26, 2023</td>
                                        <td className="py-md px-6">
                                            <span className="inline-flex items-center rounded-full bg-primary-container text-on-primary px-2 py-1 text-[10px] font-bold uppercase tracking-tight">Pending</span>
                                        </td>
                                        <td className="py-md px-6 text-right">
                                            <button className="font-label-md text-label-md text-primary border border-primary/30 px-sm py-xs rounded hover:bg-primary-fixed/20 transition-colors opacity-0 group-hover:opacity-100">View</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-outline-variant bg-surface-container-low/30 text-center">
                            <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">View All Records</button>
                        </div>
                    </div>
                </div>

                {/* Mobile FAB */}
                <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-on-primary-fixed-variant transition-colors z-50">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </main>
        </div>
    );
}