"use client";

import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { updateAppointmentStatus } from '../../actions/appointments';
import toast from 'react-hot-toast';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentsClient({ initialData }: { initialData: any[] }) {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [view, setView] = useState(Views.WEEK);
    const [date, setDate] = useState(new Date());

    // Map initialData to calendar events
    const events = initialData.map((data) => ({
        id: data.appointment.id,
        title: `${data.customer.name.split(' ')[0]} - ${data.vehicle.model}`,
        start: new Date(data.appointment.startTime),
        end: new Date(data.appointment.endTime),
        resource: data,
    }));

    const handleSelectEvent = (event: any) => {
        setSelectedBooking(event.resource);
    };

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        try {
            await updateAppointmentStatus(selectedBooking.appointment.id, newStatus);
            // Optimistically update the selected booking view
            setSelectedBooking({
                ...selectedBooking,
                appointment: { ...selectedBooking.appointment, status: newStatus }
            });
            toast.success('Status updated successfully');
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    // Custom event styling based on status
    const eventPropGetter = (event: any) => {
        const status = event.resource.appointment.status;
        let backgroundColor = '#e2e8f0';
        let borderColor = '#94a3b8';
        let color = '#334155';

        if (status === 'Pending') {
            backgroundColor = '#fff0ed'; // bg-[#fe3b01]/10
            borderColor = '#fe3b01';
            color = '#b02600';
        } else if (status === 'Confirmed') {
            backgroundColor = '#e0f2fe';
            borderColor = '#0284c7';
            color = '#0369a1';
        } else if (status === 'Completed') {
            backgroundColor = '#dcfce7';
            borderColor = '#16a34a';
            color = '#15803d';
        } else if (status === 'Cancelled') {
            backgroundColor = '#f1f5f9';
            borderColor = '#94a3b8';
            color = '#64748b';
        }

        return {
            style: {
                backgroundColor,
                borderLeft: `4px solid ${borderColor}`,
                color,
                borderRadius: '4px',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                opacity: 0.9,
                fontWeight: 600,
                fontSize: '12px',
            }
        };
    };

    return (
        <>
            {/* Workspace Header */}
            <div className="px-gutter py-md border-b border-outline-variant/20 bg-surface-bright flex flex-col md:flex-row md:items-center justify-between shrink-0 gap-4">
                <div className="flex items-center space-x-4">
                    <h2 className="font-headline-lg text-headline-lg text-on-background">Schedule</h2>
                    <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg p-1">
                        <button onClick={() => setView(Views.DAY)} className={`px-4 py-1.5 font-label-md rounded shadow-sm transition-colors ${view === Views.DAY ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>Day</button>
                        <button onClick={() => setView(Views.WEEK)} className={`px-4 py-1.5 font-label-md rounded shadow-sm transition-colors ${view === Views.WEEK ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>Week</button>
                        <button onClick={() => setView(Views.MONTH)} className={`px-4 py-1.5 font-label-md rounded shadow-sm transition-colors ${view === Views.MONTH ? 'bg-surface-container-highest text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>Month</button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Calendar View (Main Left) */}
                <div className="flex-1 overflow-auto bg-surface p-4">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%', minHeight: '600px' }}
                        view={view}
                        onView={(v) => setView(v as any)}
                        date={date}
                        onNavigate={(d) => setDate(d)}
                        onSelectEvent={handleSelectEvent}
                        eventPropGetter={eventPropGetter}
                        step={30}
                        timeslots={2}
                    />
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
                            {/* Status Badge & Editor */}
                            <div>
                                <div className="text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Status</div>
                                <select 
                                    className="w-full bg-surface-container-lowest border border-outline-variant text-on-background font-label-md py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    value={selectedBooking.appointment.status}
                                    onChange={handleStatusChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Time Info */}
                            <div>
                                <div className="text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Schedule</div>
                                <div className="font-headline-md text-on-background">{new Date(selectedBooking.appointment.startTime).toLocaleDateString()}</div>
                                <div className="font-body-md text-secondary">
                                    {new Date(selectedBooking.appointment.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                                    {new Date(selectedBooking.appointment.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
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
                    </aside>
                )}
            </div>
        </>
    );
}
