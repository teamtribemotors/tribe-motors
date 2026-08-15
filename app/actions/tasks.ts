'use server';

import { db } from '../../db';
import { tasks } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateTaskStatus(id: string, status: string) {
  await db.update(tasks)
    .set({ status })
    .where(eq(tasks.id, id));
  
  revalidatePath('/staff');
  return { success: true };
}

export async function assignTask(id: string, staffId: string) {
  await db.update(tasks)
    .set({ assignedTo: staffId })
    .where(eq(tasks.id, id));
  
  revalidatePath('/staff');
  return { success: true };
}
