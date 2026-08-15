'use server';

import { z } from 'zod';
import { db } from '@/db';
import { vehicles } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/app/actions/auth';

const vehicleSchema = z.object({
  id: z.string().optional(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1900).max(2100),
  price: z.coerce.number().min(0),
  mileage: z.coerce.number().min(0),
  distanceDriven: z.coerce.number().min(0),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  bodyType: z.string().min(1, "Body type is required"),
  owners: z.string().min(1, "Owners is required"),
  color: z.string().min(1, "Color is required"),
  colorHex: z.string().min(1, "Color Hex is required"),
  accidentalHistory: z.coerce.boolean(),
  isCertified: z.coerce.boolean(),
  status: z.enum(['Draft', 'Live', 'Pending', 'Sold']),
  imageUrl: z.string().url("Invalid image URL"),
  imageAlt: z.string().min(1, "Image Alt is required"),
  description: z.string().optional(),
});

export async function saveVehicle(prevState: any, formData: FormData) {
  try {
    await requireAuth();
    const isCertified = formData.get('isCertified') === 'true' || formData.get('isCertified') === 'on';

    const rawData = {
      id: formData.get('id') || undefined,
      make: formData.get('make'),
      model: formData.get('model'),
      year: formData.get('year'),
      price: formData.get('price'),
      mileage: formData.get('mileage'),
      distanceDriven: formData.get('distanceDriven'),
      fuelType: formData.get('fuelType'),
      transmission: formData.get('transmission'),
      bodyType: formData.get('bodyType'),
      owners: formData.get('owners'),
      color: formData.get('color'),
      colorHex: formData.get('colorHex'),
      accidentalHistory: formData.get('accidentalHistory') === 'true',
      isCertified,
      status: formData.get('status'),
      imageUrl: formData.get('imageUrl'),
      imageAlt: formData.get('imageAlt'),
      description: formData.get('description') || '',
    };

    const validatedData = vehicleSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Please check your inputs.',
      };
    }

    const { id, ...dataToSave } = validatedData.data;
    const title = `${dataToSave.year} ${dataToSave.make.charAt(0).toUpperCase() + dataToSave.make.slice(1)} ${dataToSave.model}`;

    if (id) {
      // Update
      await db.update(vehicles).set({ ...dataToSave, title }).where(eq(vehicles.id, id));
    } else {
      // Insert
      await db.insert(vehicles).values({ ...dataToSave, title });
    }

    revalidatePath('/staff/inventory');
    revalidatePath('/browse');
    return { success: true, message: 'Vehicle saved successfully!' };
  } catch (error) {
    console.error('Failed to save vehicle:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}

export async function deleteVehicle(id: string) {
  try {
    await requireAuth();
    await db.delete(vehicles).where(eq(vehicles.id, id));
    revalidatePath('/staff/inventory');
    revalidatePath('/browse');
    return { success: true, message: 'Vehicle deleted successfully!' };
  } catch (error) {
    console.error('Failed to delete vehicle:', error);
    return { success: false, message: 'Failed to delete vehicle.' };
  }
}
