"use client";

import { useState } from 'react';

export default function AppointmentsClient({ initialData }: { initialData: any[] }) {
    const [selectedBooking, setSelectedBooking] = useState<any>(initialData[0] || null);

    return (
        <>
            {/* Workspace Header */}
            <div className="px-gutter py-md border-b border-outline-variant/20 bg-surface-bright flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
                <div className="flex items-center space-x-4">
                    <h2 className="font-headline-lg text-headline-lg text-on-background">Schedule</h2>
                    <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg p-1">
                        <button className="px-4 py-1.5 font-label-md text-on-surface-variant hover:text-primary transition-colors rounded">Day</button>
                        <button className="px-4 py-1.5 font-label-md bg-surface-container-highest text-primary font-bold rounded shadow-sm">Week</button>
                        <button className="px-4 py-1.5 font-label-md text-on-surface-variant hover:text-primary transition-colors rounded">Month</button>
                    </div>
                </div>
                <div className="flex items-center space-x-md">
                    <div className="relative">
                        <select className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-background font-label-md py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                            <option>All Staff</option>
                            <option>Sarah Jenkins</option>
                            <option>Michael Chang</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-1">
                        <button className="p-1 text-on-surface-variant hover:text-primary transition-colors rounded hover:bg-surface-container-highest">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="font-label-md text-on-background px-2">Oct 23 - 29, 2023</span>
                        <button className="p-1 text-on-surface-variant hover:text-primary transition-colors rounded hover:bg-surface-container-highest">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Calendar View (Main Left) */}
                <div className="flex-1 overflow-auto bg-surface relative">
                    {/* Grid Placeholder / Structure */}
                    <div className="min-w-[800px] h-full flex flex-col">
                        {/* Days Header */}
                        <div className="flex border-b border-outline-variant/20 sticky top-0 bg-surface/95 backdrop-blur z-10">
                            <div className="w-16 shrink-0 border-r border-outline-variant/20"></div>
                            <div className="flex-1 grid grid-cols-5 text-center font-label-md text-on-surface-variant divide-x divide-outline-variant/20">
                                <div className="py-sm"><div className="text-label-sm uppercase tracking-wider mb-1">Mon</div><div className="text-body-lg font-semibold text-on-background">23</div></div>
                                <div className="py-sm bg-surface-container-lowest"><div className="text-label-sm uppercase tracking-wider mb-1 text-primary">Tue</div><div className="text-body-lg font-bold text-primary">24</div></div>
                                <div className="py-sm"><div className="text-label-sm uppercase tracking-wider mb-1">Wed</div><div className="text-body-lg font-semibold text-on-background">25</div></div>
                                <div className="py-sm"><div className="text-label-sm uppercase tracking-wider mb-1">Thu</div><div className="text-body-lg font-semibold text-on-background">26</div></div>
                                <div className="py-sm"><div className="text-label-sm uppercase tracking-wider mb-1">Fri</div><div className="text-body-lg font-semibold text-on-background">27</div></div>
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="flex-1 flex relative">
                            {/* Time Axis */}
                            <div className="w-16 shrink-0 flex flex-col border-r border-outline-variant/20 text-right pr-2 text-label-sm text-on-surface-variant/70 pt-2">
                                <div className="h-20">09:00</div>
                                <div className="h-20">10:00</div>
                                <div className="h-20">11:00</div>
                                <div className="h-20">12:00</div>
                                <div className="h-20">13:00</div>
                                <div className="h-20">14:00</div>
                                <div className="h-20">15:00</div>
                                <div className="h-20">16:00</div>
                            </div>

                            {/* Grid Lines */}
                            <div className="flex-1 grid grid-cols-5 divide-x divide-outline-variant/20 relative">
                                {/* Horizontal Grid Lines */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                    <div className="h-20 border-b border-outline-variant/10 w-full"></div>
                                </div>

                                {/* Dynamic Column Mapping */}
                                <div className="relative"></div>
                                <div className="relative bg-surface-container-lowest/50">
                                    {initialData.map((data, idx) => {
                                        // A naive implementation to map time to Y coordinate just for show
                                        // 09:00 is top 0, each hour is 80px
                                        const startHour = data.appointment.startTime.getHours() + (data.appointment.startTime.getMinutes() / 60);
                                        const endHour = data.appointment.endTime.getHours() + (data.appointment.endTime.getMinutes() / 60);
                                        const top = Math.max(0, (startHour - 9) * 80 + 8);
                                        const height = (endHour - startHour) * 80;
                                        
                                        const isPending = data.appointment.status === 'Pending';
                                        
                                        return (
                                            <div 
                                                key={data.appointment.id}
                                                className={`absolute left-1 right-1 rounded-r p-2 shadow-sm cursor-pointer transition-colors z-10 ${
                                                    isPending 
                                                        ? 'bg-[#fe3b01]/10 border-l-4 border-[#fe3b01] hover:bg-[#fe3b01]/20'
                                                        : 'bg-green-800/10 border-l-4 border-green-800 hover:bg-green-800/20'
                                                }`}
                                                style={{ top: `${top}px`, height: `${Math.max(40, height)}px` }}
                                                onClick={() => setSelectedBooking(data)}
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className={`text-label-sm font-bold ${isPending ? 'text-[#fe3b01]' : 'text-green-800'}`}>
                                                        {data.appointment.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </div>
                                                    <span className={`material-symbols-outlined text-[16px] ${isPending ? 'text-[#fe3b01]' : 'text-green-800'}`}>schedule</span>
                                                </div>
                                                <div className="text-label-md text-on-background truncate font-bold">{data.customer.name.split(' ')[0]} - {data.vehicle.model}</div>
                                                <div className="text-label-sm text-on-surface-variant truncate">{data.appointment.status}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="relative"></div>
                                <div className="relative"></div>
                                <div className="relative"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Details Panel (Right Sidebar) */}
                {selectedBooking && (
                    <aside className="w-80 shrink-0 border-l border-outline-variant/20 bg-surface-container-lowest flex flex-col h-full z-20 shadow-[0_10px_25px_-5px_rgba(41,23,19,0.05),0_8px_10px_-6px_rgba(41,23,19,0.01)]">
                        <div className="p-md border-b border-outline-variant/20 flex justify-between items-center">
                            <h3 className="font-headline-md text-headline-md text-on-background">Booking Details</h3>
                            <button 
                                className="text-on-surface-variant hover:text-on-background p-1 rounded-full hover:bg-surface-container"
                                onClick={() => setSelectedBooking(null)}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-md flex-1 overflow-y-auto space-y-6">
                            {/* Status Badge */}
                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full font-label-sm border ${selectedBooking.appointment.status === 'Pending' ? 'bg-[#fe3b01]/10 text-[#fe3b01] border-[#fe3b01]/20' : 'bg-green-800/10 text-green-800 border-green-800/20'}`}>
                                <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                                <span>{selectedBooking.appointment.status}</span>
                            </div>

                            {/* Time Info */}
                            <div>
                                <div className="text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Schedule</div>
                                <div className="font-headline-md text-on-background">{selectedBooking.appointment.startTime.toLocaleDateString()}</div>
                                <div className="font-body-md text-secondary">{selectedBooking.appointment.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant/30">
                                <div className="text-label-sm text-on-surface-variant mb-3 uppercase tracking-wider">Customer</div>
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-inverse-surface text-on-primary flex items-center justify-center font-bold text-lg">{selectedBooking.customer.name.substring(0, 2).toUpperCase()}</div>
                                    <div>
                                        <div className="font-label-md text-on-background text-base">{selectedBooking.customer.name}</div>
                                        <div className="font-body-md text-secondary text-sm">Client</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-on-surface-variant font-body-md text-sm">
                                    <span className="material-symbols-outlined text-[18px]">call</span>
                                    <span>{selectedBooking.customer.phone}</span>
                                </div>
                            </div>

                            {/* Vehicle Info */}
                            <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant/30">
                                <div className="text-label-sm text-on-surface-variant mb-3 uppercase tracking-wider">Interest</div>
                                <div className="flex space-x-3">
                                    <div className="w-16 h-12 bg-surface-container rounded overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${selectedBooking.vehicle.imageUrl})` }}>
                                    </div>
                                    <div>
                                        <div className="font-label-md text-on-background">{selectedBooking.vehicle.year} {selectedBooking.vehicle.make}</div>
                                        <div className="font-body-md text-secondary text-sm">{selectedBooking.vehicle.model}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="p-md border-t border-outline-variant/20 bg-surface-container-lowest mt-auto space-y-3">
                            <button className="w-full h-12 bg-primary text-white font-label-md rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center space-x-2 shadow-sm">
                                <span className="material-symbols-outlined">check_circle</span>
                                <span>Update Booking</span>
                            </button>
                        </div>
                    </aside>
                )}
            </div>
        </>
    );
}
