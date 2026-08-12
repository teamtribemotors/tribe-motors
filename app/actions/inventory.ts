'use server';

import { db } from '@/db';
import { vehicles } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { requireAuth } from './auth';

export async function getVehicles() {
  await requireAuth();
  const data = await db.select().from(vehicles).orderBy(desc(vehicles.createdAt));
  return data;
}
