"use client";

import { useState } from 'react';
import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';

export default function AppointmentsPage() {
    const [selectedBooking, setSelectedBooking] = useState<boolean>(true);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
            <StaffSidebar />
            <main className="flex-1 flex flex-col overflow-hidden bg-surface-bright">
                <StaffHeader title="Schedule" icon="calendar_today" />

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

                                    {/* Column 1 (Mon) */}
                                    <div className="relative">
                                        <div className="absolute top-4 left-1 right-1 bg-surface-container-lowest border border-outline-variant rounded p-2 shadow-sm opacity-60">
                                            <div className="text-label-sm font-bold text-secondary mb-1">09:00 - 10:00</div>
                                            <div className="text-label-md text-on-background truncate">Completed - M4</div>
                                        </div>
                                    </div>

                                    {/* Column 2 (Tue) */}
                                    <div className="relative bg-surface-container-lowest/50">
                                        <div 
                                            className="absolute top-[88px] left-1 right-1 bg-[#fe3b01]/10 border-l-4 border-[#fe3b01] rounded-r p-2 shadow-[0_10px_25px_-5px_rgba(41,23,19,0.05),0_8px_10px_-6px_rgba(41,23,19,0.01)] cursor-pointer hover:bg-[#fe3b01]/20 transition-colors z-10"
                                            onClick={() => setSelectedBooking(true)}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="text-label-sm font-bold text-[#fe3b01]">11:00 - 12:30</div>
                                                <span className="material-symbols-outlined text-[#fe3b01] text-[16px]">schedule</span>
                                            </div>
                                            <div className="text-label-md text-on-background truncate font-bold">Vikram J. - 911</div>
                                            <div className="text-label-sm text-on-surface-variant truncate">Pending Approval</div>
                                        </div>
                                        <div className="absolute top-[248px] left-1 right-1 bg-green-800/10 border-l-4 border-green-800 rounded-r p-2 shadow-sm cursor-pointer hover:bg-green-800/20 transition-colors">
                                            <div className="text-label-sm font-bold text-green-800 mb-1">15:00 - 16:00</div>
                                            <div className="text-label-md text-on-background truncate font-bold">Sarah L. - Taycan</div>
                                            <div className="text-label-sm text-on-surface-variant truncate">Confirmed</div>
                                        </div>
                                    </div>

                                    {/* Column 3 (Wed) */}
                                    <div className="relative">
                                        <div className="absolute top-[168px] left-1 right-1 bg-green-800/10 border-l-4 border-green-800 rounded-r p-2 shadow-sm cursor-pointer hover:bg-green-800/20 transition-colors">
                                            <div className="text-label-sm font-bold text-green-800 mb-1">13:00 - 14:00</div>
                                            <div className="text-label-md text-on-background truncate font-bold">David W. - RS6</div>
                                            <div className="text-label-sm text-on-surface-variant truncate">Confirmed</div>
                                        </div>
                                    </div>

                                    {/* Column 4 (Thu) */}
                                    <div className="relative"></div>

                                    {/* Column 5 (Fri) */}
                                    <div className="relative">
                                        <div className="absolute top-[48px] left-1 right-1 bg-[#fe3b01]/10 border-l-4 border-[#fe3b01] rounded-r p-2 shadow-sm cursor-pointer hover:bg-[#fe3b01]/20 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="text-label-sm font-bold text-[#fe3b01]">09:30 - 10:30</div>
                                            </div>
                                            <div className="text-label-md text-on-background truncate font-bold">Alex K. - AMG GT</div>
                                        </div>
                                    </div>
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
                                    onClick={() => setSelectedBooking(false)}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="p-md flex-1 overflow-y-auto space-y-6">
                                {/* Status Badge */}
                                <div className="inline-flex items-center space-x-2 bg-[#fe3b01]/10 text-[#fe3b01] px-3 py-1 rounded-full font-label-sm border border-[#fe3b01]/20">
                                    <span className="material-symbols-outlined text-[14px]">pending_actions</span>
                                    <span>Pending Approval</span>
                                </div>

                                {/* Time Info */}
                                <div>
                                    <div className="text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Schedule</div>
                                    <div className="font-headline-md text-on-background">Tomorrow</div>
                                    <div className="font-body-md text-secondary">11:00 AM - 12:30 PM (90 mins)</div>
                                </div>

                                {/* Customer Info */}
                                <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant/30">
                                    <div className="text-label-sm text-on-surface-variant mb-3 uppercase tracking-wider">Customer</div>
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-inverse-surface text-on-primary flex items-center justify-center font-bold text-lg">VJ</div>
                                        <div>
                                            <div className="font-label-md text-on-background text-base">Vikram J.</div>
                                            <div className="font-body-md text-secondary text-sm">Returning Client</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 text-on-surface-variant font-body-md text-sm">
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                        <span>+91 98765 43210</span>
                                    </div>
                                </div>

                                {/* Vehicle Info */}
                                <div className="bg-surface-bright p-4 rounded-lg border border-outline-variant/30">
                                    <div className="text-label-sm text-on-surface-variant mb-3 uppercase tracking-wider">Interest</div>
                                    <div className="flex space-x-3">
                                        <div className="w-16 h-12 bg-surface-container rounded overflow-hidden">
                                            {/* Placeholder for Vehicle Image */}
                                            <div className="w-full h-full bg-surface-variant"></div>
                                        </div>
                                        <div>
                                            <div className="font-label-md text-on-background">2021 Porsche 911</div>
                                            <div className="font-body-md text-secondary text-sm">Carrera S</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="p-md border-t border-outline-variant/20 bg-surface-container-lowest mt-auto space-y-3">
                                <button className="w-full h-12 bg-primary text-white font-label-md rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center space-x-2 shadow-sm">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span>Approve Booking</span>
                                </button>
                                <div className="flex space-x-3">
                                    <button className="flex-1 h-12 border-2 border-inverse-surface text-inverse-surface font-label-md rounded-lg hover:bg-surface-container transition-colors">
                                        Reschedule
                                    </button>
                                    <button className="flex-1 h-12 text-error font-label-md rounded-lg hover:bg-error-container/50 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </main>
        </div>
    );
}
