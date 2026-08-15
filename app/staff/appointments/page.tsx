import StaffSidebar from '../../components/StaffSidebar';
import StaffHeader from '../../components/StaffHeader';
import AppointmentsClient from './AppointmentsClient';
import { db } from '../../../db';
import { appointments, customers, vehicles } from '../../../db/schema';
import { eq, desc } from 'drizzle-orm';

export default async function AppointmentsPage() {
    const data = await db.select({
        appointment: appointments,
        customer: customers,
        vehicle: vehicles,
    }).from(appointments)
    .innerJoin(customers, eq(appointments.customerId, customers.id))
    .innerJoin(vehicles, eq(appointments.vehicleId, vehicles.id))
    .orderBy(desc(appointments.startTime));

    return (
        <div className="flex h-screen w-full overflow-hidden bg-surface-bright text-on-surface font-body-md antialiased">
            <StaffSidebar />
            <main className="flex-1 flex flex-col overflow-hidden bg-surface-bright">
                <StaffHeader title="Schedule" icon="calendar_today" />
                <AppointmentsClient initialData={data} />
            </main>
        </div>
    );
}
