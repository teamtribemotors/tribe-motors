'use server';

import { db } from '../../db';
import { enquiries } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { requireAuth } from './auth';
import { revalidatePath } from 'next/cache';

export async function updateEnquiryStatus(id: string, status: string) {
  // Ensure user is authenticated
  await requireAuth();

  // Validate status
  const validStatuses = ['New', 'Pending', 'In Progress', 'Contacted', 'Test Drive', 'QC', 'Review', 'Negotiation', 'Resolved', 'Closed', 'Ready'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  // Update in DB
  await db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
  
  revalidatePath('/staff/enquiries');

  return { success: true };
}
