'use server';

import { db } from '@/db';
import { fulfillmentRequests, vehicles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './auth';

export async function getFulfillmentRequests() {
  await requireAuth();
  const data = await db
    .select({
      id: fulfillmentRequests.id,
      vehicleId: fulfillmentRequests.vehicleId,
      buyerName: fulfillmentRequests.buyerName,
      buyerType: fulfillmentRequests.buyerType,
      contact: fulfillmentRequests.contact,
      status: fulfillmentRequests.status,
      requestTime: fulfillmentRequests.requestTime,
      vehicleTitle: vehicles.title,
    })
    .from(fulfillmentRequests)
    .leftJoin(vehicles, eq(fulfillmentRequests.vehicleId, vehicles.id))
    .orderBy(desc(fulfillmentRequests.requestTime));

  return data.map(item => ({
    id: item.id,
    vehicleId: item.vehicleId,
    buyerName: item.buyerName,
    buyerType: item.buyerType,
    contact: item.contact,
    status: item.status,
    requestTime: item.requestTime.toISOString().split('T')[0],
    vehicle: item.vehicleTitle || 'Unknown Vehicle',
  }));
}

export async function getFulfillmentRequestById(id: string) {
  await requireAuth();
  const [data] = await db
    .select()
    .from(fulfillmentRequests)
    .where(eq(fulfillmentRequests.id, id));

  if (!data) return null;

  return {
    ...data,
    requestTime: data.requestTime.toISOString().split('T')[0],
  };
}

export async function createFulfillmentRequest(data: {
  vehicleId: string;
  buyerName: string;
  buyerType: string;
  contact: string;
  status: string;
}) {
  await requireAuth();
  await db.insert(fulfillmentRequests).values({
    vehicleId: data.vehicleId,
    buyerName: data.buyerName,
    buyerType: data.buyerType,
    contact: data.contact,
    status: data.status,
    requestTime: new Date(),
  });
  revalidatePath('/staff/fulfillment');
}

export async function updateFulfillmentRequest(id: string, data: {
  buyerName?: string;
  buyerType?: string;
  contact?: string;
  status?: string;
}) {
  await requireAuth();
  await db.update(fulfillmentRequests).set({
    ...data,
  }).where(eq(fulfillmentRequests.id, id));
  revalidatePath('/staff/fulfillment');
}

export async function deleteFulfillmentRequestAction(id: string) {
  await requireAuth();
  await db.delete(fulfillmentRequests).where(eq(fulfillmentRequests.id, id));
  revalidatePath('/staff/fulfillment');
}
