'use server';

import { db } from '@/db';
import { customers, sales, vehicles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './auth';

export async function getCustomers() {
  await requireAuth();
  const data = await db.select().from(customers).orderBy(desc(customers.createdAt));
  return data.map(item => ({
    ...item,
    createdAt: item.createdAt.toISOString().split('T')[0],
  }));
}

export async function getCustomerById(id: string) {
  await requireAuth();
  const [customer] = await db.select().from(customers).where(eq(customers.id, id));
  if (!customer) return null;

  const customerSales = await db
    .select({
      id: sales.id,
      salePrice: sales.salePrice,
      saleDate: sales.saleDate,
      vehicleId: vehicles.id,
      vehicleTitle: vehicles.title,
      vehicleMake: vehicles.make,
      vehicleModel: vehicles.model,
    })
    .from(sales)
    .innerJoin(vehicles, eq(sales.vehicleId, vehicles.id))
    .where(eq(sales.customerId, id))
    .orderBy(desc(sales.saleDate));

  return {
    ...customer,
    createdAt: customer.createdAt.toISOString().split('T')[0],
    sales: customerSales.map(s => ({
      ...s,
      saleDate: s.saleDate.toISOString().split('T')[0],
    }))
  };
}

export async function createCustomer(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  await requireAuth();
  const [newCustomer] = await db.insert(customers).values({
    name: data.name,
    email: data.email || null,
    phone: data.phone,
    address: data.address || null,
  }).returning();
  revalidatePath('/staff/customers');
  return newCustomer;
}

export async function createSale(data: {
  vehicleId: string;
  customerId: string;
  salePrice: number;
  notes?: string;
}) {
  await requireAuth();
  await db.transaction(async (tx) => {
    // Insert sale
    await tx.insert(sales).values({
      vehicleId: data.vehicleId,
      customerId: data.customerId,
      salePrice: data.salePrice,
      notes: data.notes || null,
      saleDate: new Date(),
    });
    
    // Update vehicle status
    await tx.update(vehicles)
      .set({ status: 'Sold', customerId: data.customerId })
      .where(eq(vehicles.id, data.vehicleId));
  });
  revalidatePath('/staff/customers');
  revalidatePath('/staff/inventory');
  revalidatePath(`/vehicle/${data.vehicleId}`);
}

export async function updateCustomer(id: string, data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}) {
  await requireAuth();
  await db.update(customers).set({
    ...data,
  }).where(eq(customers.id, id));
  revalidatePath('/staff/customers');
  revalidatePath(`/staff/customers/${id}`);
}

export async function deleteCustomerAction(id: string) {
  await requireAuth();
  await db.delete(customers).where(eq(customers.id, id));
  revalidatePath('/staff/customers');
}
