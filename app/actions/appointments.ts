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
