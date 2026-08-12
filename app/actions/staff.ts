'use server';

import { db } from '../../db';
import { staff } from '../../db/schema';
import { revalidatePath } from 'next/cache';
import { requireAuth } from './auth';
import { redirect } from 'next/navigation';

export async function createStaff(prevState: any, formData: FormData) {
  try {
    await requireAuth();
  } catch (e) {
    return { success: false, error: 'Unauthorized. Please log in again.' };
  }

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const password = formData.get('password') as string || 'default123';

  if (!firstName || !lastName || !email || !role) {
    return { success: false, error: 'All fields are required' };
  }

  const name = `${firstName} ${lastName}`;

  try {
    await db.insert(staff).values({
      name,
      email,
      role,
      password,
    });
  } catch (error) {
    console.error('Failed to create staff:', error);
    return { success: false, error: 'Failed to create staff. Email might already exist.' };
  }

  revalidatePath('/staff');
  redirect('/staff');
}
