import { db } from './index';
import { sql } from 'drizzle-orm';
import { vehicles, staff, enquiries, inspections, fulfillmentRequests, serviceRecords } from './schema';

async function resetDb() {
  console.log('Resetting DB...');

  // 1. Delete all records from all tables
  await db.execute(sql`TRUNCATE TABLE fulfillment_requests CASCADE;`);
  await db.execute(sql`TRUNCATE TABLE service_records CASCADE;`);
  await db.execute(sql`TRUNCATE TABLE inspections CASCADE;`);
  await db.execute(sql`TRUNCATE TABLE enquiries CASCADE;`);
  await db.execute(sql`TRUNCATE TABLE vehicles CASCADE;`);
  await db.execute(sql`TRUNCATE TABLE staff CASCADE;`);

  console.log('Tables truncated.');

  // 2. Insert the admin user
  console.log('Inserting admin user...');
  await db.insert(staff).values({
    name: 'Admin User',
    email: 'mstelidevara123@gmail.com',
    role: 'admin',
    password: 'admin123',
  });
  console.log('Admin user inserted.');

  console.log('DB reset complete.');
  process.exit(0);
}

resetDb().catch((e) => {
  console.error(e);
  process.exit(1);
});
