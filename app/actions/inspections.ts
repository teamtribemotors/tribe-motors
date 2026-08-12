'use server';

import { db } from '../../db';
import { inspections, vehicles } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getInspections() {
  const data = await db
    .select({
      id: inspections.id,
      vehicleId: inspections.vehicleId,
      inspectorName: inspections.inspectorName,
      date: inspections.date,
      score: inspections.score,
      status: inspections.status,
      vehicleTitle: vehicles.title,
      vin: vehicles.vin,
    })
    .from(inspections)
    .leftJoin(vehicles, eq(inspections.vehicleId, vehicles.id))
    .orderBy(desc(inspections.date));

  return data.map(item => ({
    id: item.id,
    vehicleId: item.vehicleId,
    inspector: item.inspectorName,
    date: item.date.toISOString().split('T')[0],
    score: `${item.score}/100`,
    status: item.status,
    vehicleTitle: item.vehicleTitle || 'Unknown Vehicle',
    vin: item.vin || 'UNKNOWN',
  }));
}

export async function getInspectionById(id: string) {
  const [data] = await db
    .select()
    .from(inspections)
    .where(eq(inspections.id, id));
  
  if (!data) return null;

  return {
    ...data,
    date: data.date.toISOString().split('T')[0],
  };
}

export async function createInspection(data: {
  vehicleId: string;
  inspectorName: string;
  score: number;
  status: string;
}) {
  await db.insert(inspections).values({
    vehicleId: data.vehicleId,
    inspectorName: data.inspectorName,
    score: data.score,
    status: data.status,
    date: new Date(),
  });
  revalidatePath('/staff/inspections');
}

export async function updateInspection(id: string, data: {
  inspectorName?: string;
  score?: number;
  status?: string;
}) {
  await db.update(inspections).set({
    ...data,
    updatedAt: new Date(),
  }).where(eq(inspections.id, id));
  revalidatePath('/staff/inspections');
}

export async function deleteInspectionAction(id: string) {
  await db.delete(inspections).where(eq(inspections.id, id));
  revalidatePath('/staff/inspections');
}
