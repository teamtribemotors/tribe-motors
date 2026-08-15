import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { vehicles, enquiries, staff, customers, sales, serviceRecords, reportUnlocks, appointments, tasks, activityLogs } from './schema';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log('Seeding data...');
  try {
    // We expect some vehicles, staff, and customers to already exist, or we can create them
    const existingStaff = await db.select().from(staff).limit(1);
    let staffId;
    if (existingStaff.length === 0) {
      const [newStaff] = await db.insert(staff).values({
        name: 'Alex Rivera',
        email: 'alex@tribemotors.com',
        password: 'password123',
        role: 'Admin'
      }).returning({ id: staff.id });
      staffId = newStaff.id;
    } else {
      staffId = existingStaff[0].id;
    }

    const existingVehicles = await db.select().from(vehicles).limit(2);
    let v1, v2;
    if (existingVehicles.length < 2) {
      const [nv1] = await db.insert(vehicles).values({
        make: 'Porsche',
        model: '911',
        year: 2021,
        price: 150000,
        mileage: 10000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        bodyType: 'Coupe',
        colorHex: '#ffffff',
        title: '2021 Porsche 911 Carrera',
        imageUrl: '/placeholder.jpg',
        imageAlt: 'Porsche',
        status: 'Live'
      }).returning();
      const [nv2] = await db.insert(vehicles).values({
        make: 'Land Rover',
        model: 'Defender',
        year: 2023,
        price: 80000,
        mileage: 5000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        bodyType: 'SUV',
        colorHex: '#000000',
        title: '2023 Land Rover Defender',
        imageUrl: '/placeholder2.jpg',
        imageAlt: 'Defender',
        status: 'Live'
      }).returning();
      v1 = nv1.id;
      v2 = nv2.id;
    } else {
      v1 = existingVehicles[0].id;
      v2 = existingVehicles[1].id;
    }

    const existingCustomers = await db.select().from(customers).limit(1);
    let c1;
    if (existingCustomers.length === 0) {
      const [nc1] = await db.insert(customers).values({
        name: 'Vikram J.',
        phone: '+919876543210'
      }).returning();
      c1 = nc1.id;
    } else {
      c1 = existingCustomers[0].id;
    }

    // Seed Appointments
    await db.insert(appointments).values([
      { customerId: c1, vehicleId: v1, staffId: staffId, startTime: new Date(Date.now() + 86400000), endTime: new Date(Date.now() + 86400000 + 3600000), status: 'Pending', type: 'Test Drive' },
      { customerId: c1, vehicleId: v2, staffId: staffId, startTime: new Date(Date.now() + 86400000 * 2), endTime: new Date(Date.now() + 86400000 * 2 + 3600000), status: 'Confirmed', type: 'Visit' }
    ]);

    // Seed Tasks
    await db.insert(tasks).values([
      { title: 'Confirm booking: Vikram J.', description: 'Test Drive - Porsche 911', status: 'Pending', assignedTo: staffId, priority: 'High' },
      { title: 'Review draft: 2022 BMW M4', description: 'Missing high-res interior photos', status: 'In Progress', assignedTo: staffId, priority: 'Normal' }
    ]);

    // Seed Activity Logs
    await db.insert(activityLogs).values([
      { type: 'Enquiry', description: 'New enquiry for 2021 Porsche 911', userId: staffId },
      { type: 'Booking', description: 'Booking confirmed for tomorrow at 11:00 AM', userId: staffId },
      { type: 'Unlock', description: 'Report unlocked by Rahul S.', userId: staffId }
    ]);

    // Seed Report Unlocks
    await db.insert(reportUnlocks).values([
      { vehicleId: v1, customerId: c1, amount: 499 },
      { vehicleId: v2, customerId: c1, amount: 499 }
    ]);

    // Seed Service Records
    await db.insert(serviceRecords).values([
      { vehicleId: v1, type: '150-Point Inspection', cost: 0, status: 'Completed', date: new Date() },
      { vehicleId: v2, type: 'Engine Overhaul', cost: 5000, status: 'Pending', date: new Date() }
    ]);

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
