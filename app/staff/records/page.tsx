import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';
import { db } from '../../../db';
import { serviceRecords, vehicles } from '../../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { formatIndianCurrency } from '../../utils';

export default async function ServiceRecordsPage() {
    const records = await db
        .select({
            record: serviceRecords,
            vehicle: vehicles
        })
        .from(serviceRecords)
        .innerJoin(vehicles, eq(serviceRecords.vehicleId, vehicles.id))
        .orderBy(desc(serviceRecords.date));
        
    const totalRecords = records.length;
    const pendingRecords = records.filter(r => r.record.status === 'Pending').length;
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentRecords = records.filter(r => new Date(r.record.date) >= oneWeekAgo).length;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-on-background font-body-md antialiased">
            <StaffSidebar />
            <main className="flex-1 flex flex-col overflow-hidden bg-surface-container-lowest">
                <StaffHeader title="Service Records" icon="build" />

                <div className="flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-y-auto w-full custom-scrollbar relative">
                    {/* Background decorative gradient */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-surface-container-low to-transparent opacity-50 pointer-events-none z-0"></div>
                    
                    <div className="relative z-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
                        
                        {/* Header & Metrics */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h1 className="font-display-lg text-4xl font-bold tracking-tight text-on-surface">Service Records</h1>
                                    <p className="font-body-md text-on-surface-variant mt-2 text-lg">Manage and track vehicle maintenance and inspection history.</p>
                                </div>
                                <button className="font-label-md text-sm bg-primary text-on-primary px-6 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap transform hover:-translate-y-0.5 font-bold">
                                    <span className="material-symbols-outlined text-[20px]">add_circle</span> Upload New Record
                                </button>
                            </div>

                            {/* Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-surface-bright border border-outline-variant/40 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-14 h-14 rounded-full bg-surface-container text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[28px]">history</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-label-md text-on-surface-variant uppercase tracking-wider">Total Records</p>
                                        <p className="text-3xl font-bold font-headline-lg text-on-surface">{totalRecords}</p>
                                    </div>
                                </div>
                                <div className="bg-surface-bright border border-outline-variant/40 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[28px]">pending_actions</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-label-md text-on-surface-variant uppercase tracking-wider">Pending Actions</p>
                                        <p className="text-3xl font-bold font-headline-lg text-on-surface">{pendingRecords}</p>
                                    </div>
                                </div>
                                <div className="bg-surface-bright border border-outline-variant/40 rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-14 h-14 rounded-full bg-tertiary-fixed/40 text-tertiary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[28px]">trending_up</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-label-md text-on-surface-variant uppercase tracking-wider">Recent Activity</p>
                                        <p className="text-3xl font-bold font-headline-lg text-on-surface">{recentRecords} <span className="text-sm text-on-surface-variant font-normal">this week</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Toolbar (Search & Filters) */}
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-surface-bright p-4 rounded-2xl border border-outline-variant/40 shadow-sm">
                            <div className="relative w-full lg:w-96 group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors">search</span>
                                <input className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-container-low border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/20 font-body-md text-on-surface transition-all outline-none shadow-inner" placeholder="Search by VIN, Model or Type..." type="text" />
                            </div>
                            
                            <div className="flex items-center gap-4 w-full lg:w-auto">
                                <div className="flex items-center bg-surface-container-low rounded-xl p-1 shadow-inner overflow-hidden">
                                    <button className="px-6 py-2 rounded-lg bg-surface-bright text-primary font-label-md font-bold shadow-sm">All</button>
                                    <button className="px-6 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md transition-colors">Pending</button>
                                    <button className="px-6 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md transition-colors">Complete</button>
                                </div>
                                
                                <div className="relative shrink-0">
                                    <select className="appearance-none bg-surface-container-low border-none rounded-xl pl-4 pr-10 py-3 font-label-md text-on-surface focus:ring-2 focus:ring-primary/20 shadow-inner cursor-pointer font-bold">
                                        <option>Type: All</option>
                                        <option>Maintenance</option>
                                        <option>Inspection</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
                                </div>
                            </div>
                        </div>

                        {/* Modern Data List */}
                        <div className="flex flex-col gap-3">
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                <div className="col-span-5">Vehicle</div>
                                <div className="col-span-3">Record Type</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-2 text-right">Status</div>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                {records.map(({ record, vehicle }) => (
                                    <div key={record.id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-surface-bright p-4 md:px-6 md:py-4 rounded-2xl border border-outline-variant/30 hover:border-primary/40 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer relative overflow-hidden">
                                        {/* Status Accent Bar */}
                                        {record.status === 'Pending' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>}
                                        
                                        <div className="col-span-1 md:col-span-5 flex items-center gap-5">
                                            <div className="w-20 h-14 rounded-xl bg-surface-container overflow-hidden shrink-0 bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${vehicle.imageUrl})` }}></div>
                                            <div>
                                                <p className="text-on-surface text-base font-bold group-hover:text-primary transition-colors">{vehicle.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="font-body-md text-sm text-on-surface-variant font-medium text-primary">Cost: {formatIndianCurrency(record.cost)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-1 md:col-span-3 flex items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-outline-variant text-[20px]">
                                                    {record.type.includes('Inspection') ? 'fact_check' : record.type.includes('Maintenance') ? 'build' : 'receipt_long'}
                                                </span>
                                                <p className="font-label-md text-sm text-on-surface">{record.type}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
                                            <p className="font-label-md text-sm text-on-surface">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        
                                        <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                                            <div>
                                                {record.status === 'Completed' ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-3 py-1 text-xs font-bold text-on-tertiary-fixed uppercase tracking-wider border border-tertiary-fixed-dim/50 shadow-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Complete
                                                    </span>
                                                ) : record.status === 'Pending' ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary-container border border-primary/20 shadow-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Pending
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-surface-variant border border-outline-variant/50">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> {record.status}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                                <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 text-center pb-8">
                                <button className="font-label-md text-sm font-bold text-on-surface-variant bg-surface-bright border border-outline-variant/40 px-6 py-3 rounded-xl hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm inline-flex items-center gap-2">
                                    View All Past Records <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                </button>
                            </div>
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