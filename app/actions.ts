'use server';

import { z } from 'zod';
import { db } from '../db';
import { enquiries } from '../db/schema';
import { revalidatePath } from 'next/cache';

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  number: z.string().min(10, "Number must be at least 10 digits"),
  vehicleId: z.string().uuid("Invalid vehicle ID"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
});

export async function submitEnquiry(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      number: formData.get('number'),
      vehicleId: formData.get('vehicleId'),
      vehicleModel: formData.get('vehicleModel'),
    };

    const validatedData = enquirySchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Please check your inputs.',
      };
    }

    await db.insert(enquiries).values(validatedData.data);

    revalidatePath('/staff/enquiries');
    return { success: true, message: 'Your enquiry has been submitted! We will contact you soon.' };
  } catch (error) {
    console.error('Failed to submit enquiry:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
