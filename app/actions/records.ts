'use server';

import { db } from '../../db';
import { serviceRecords, vehicles } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './auth';

export async function getServiceRecords() {
  await requireAuth();
  const data = await db
    .select({
      id: serviceRecords.id,
      vehicleId: serviceRecords.vehicleId,
      fileUrl: serviceRecords.fileUrl,
      cost: serviceRecords.cost,
      originalCost: serviceRecords.originalCost,
      status: serviceRecords.status,
      date: serviceRecords.date,
      vehicleTitle: vehicles.title,
    })
    .from(serviceRecords)
    .leftJoin(vehicles, eq(serviceRecords.vehicleId, vehicles.id))
    .orderBy(desc(serviceRecords.date));

  return data.map(item => ({
    id: item.id,
    vehicleId: item.vehicleId,
    fileUrl: item.fileUrl,
    cost: item.cost, // keep raw for UI
    originalCost: item.originalCost,
    status: item.status,
    date: item.date.toISOString().split('T')[0],
    vehicle: item.vehicleTitle || 'Unknown Vehicle',
  }));
}

export async function getServiceRecordById(id: string) {
  await requireAuth();
  const [data] = await db
    .select()
    .from(serviceRecords)
    .where(eq(serviceRecords.id, id));
  
  if (!data) return null;

  return {
    ...data,
    date: data.date.toISOString().split('T')[0],
  };
}

export async function createServiceRecord(data: {
  vehicleId: string;
  fileUrl: string;
  cost: number;
  originalCost?: number;
  status: string;
}) {
  await requireAuth();
  await db.insert(serviceRecords).values({
    vehicleId: data.vehicleId,
    fileUrl: data.fileUrl,
    cost: data.cost,
    originalCost: data.originalCost,
    status: data.status,
    date: new Date(),
  });
  revalidatePath('/staff/records');
}

export async function updateServiceRecord(id: string, data: {
  fileUrl?: string;
  cost?: number;
  originalCost?: number;
  status?: string;
}) {
  await requireAuth();
  await db.update(serviceRecords).set({
    ...data,
  }).where(eq(serviceRecords.id, id));
  revalidatePath('/staff/records');
}

export async function deleteServiceRecordAction(id: string) {
  await requireAuth();
  await db.delete(serviceRecords).where(eq(serviceRecords.id, id));
  revalidatePath('/staff/records');
}
