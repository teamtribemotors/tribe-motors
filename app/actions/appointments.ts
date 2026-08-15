'use server';

import { db } from '../../db';
import { appointments } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from './auth';
import { revalidatePath } from 'next/cache';

export async function updateAppointmentStatus(id: string, status: string) {
  await requireAuth();

  const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  await db.update(appointments).set({ status }).where(eq(appointments.id, id));

  revalidatePath('/staff/appointments');

  return { success: true };
}

import { customers, activityLogs } from '../../db/schema';
import { z } from 'zod';

const scheduleSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  notes: z.string().optional(),
  date: z.string(),
  time: z.string(),
  vehicleId: z.string().uuid(),
});

export async function scheduleVisit(prevState: any, formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      notes: formData.get('notes'),
      date: formData.get('date'),
      time: formData.get('time'),
      vehicleId: formData.get('vehicleId'),
    };

    const validatedData = scheduleSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Please check your inputs.',
      };
    }

    const { firstName, lastName, phone, notes, date, time, vehicleId } = validatedData.data;

    // Find or create customer
    let customerRecord = await db.select().from(customers).where(eq(customers.phone, phone)).limit(1);
    let customerId;

    if (customerRecord.length > 0) {
      customerId = customerRecord[0].id;
    } else {
      const newCustomer = await db.insert(customers).values({
        name: `${firstName} ${lastName}`,
        phone: phone,
      }).returning({ id: customers.id });
      customerId = newCustomer[0].id;
    }

    const startTime = new Date(`2024-10-${date.padStart(2, '0')} ${time}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    // Insert appointment
    await db.insert(appointments).values({
      customerId: customerId,
      vehicleId: vehicleId,
      startTime,
      endTime,
      type: 'Test Drive',
    });

    // Log activity
    await db.insert(activityLogs).values({
      type: 'Booking',
      description: `New Test Drive scheduled by ${firstName} ${lastName}`,
    });

    return { success: true, message: 'Test drive scheduled successfully! A confirmation email will be sent to you.' };
  } catch (error) {
    console.error('Failed to schedule visit:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
