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

export async function bulkInsertVehicles(vehiclesData: any[]) {
  await requireAuth();
  
  if (!vehiclesData || vehiclesData.length === 0) {
    throw new Error('No data provided');
  }

  // Assuming standard fields from CSV: make, model, year, price, mileage, exteriorColor, interiorColor, vin
  const toInsert = vehiclesData.map(v => ({
    make: v.make || 'Unknown',
    model: v.model || 'Unknown',
    year: v.year ? parseInt(v.year) : new Date().getFullYear(),
    price: v.price ? parseInt(v.price) : 0,
    mileage: v.mileage ? parseInt(v.mileage) : 0,
    fuelType: v.fuelType || 'Petrol',
    transmission: v.transmission || 'Automatic',
    bodyType: v.bodyType || 'Sedan',
    owners: v.owners || '1st Owner',
    color: v.color || v.exteriorColor || 'Unknown',
    colorHex: v.colorHex || '#000000',
    title: v.title || `${v.year || new Date().getFullYear()} ${v.make || 'Unknown'} ${v.model || 'Unknown'}`,
    imageUrl: v.imageUrl || 'https://placeholder.com/car.jpg',
    imageAlt: v.imageAlt || 'Vehicle Image',
    status: 'Draft'
  }));

  await db.insert(vehicles).values(toInsert);
  
  return { success: true, count: toInsert.length };
}
