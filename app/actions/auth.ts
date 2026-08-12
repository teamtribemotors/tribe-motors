'use server';

import { db } from '../../db';
import { staff } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const staffList = await db.select().from(staff).where(eq(staff.email, email));
  const user = staffList[0];

  if (!user || user.password !== password) {
    return { success: false, error: 'Invalid email or password' };
  }

  const cookieStore = await cookies();
  cookieStore.set('staff_session', JSON.stringify({ id: user.id, email: user.email, role: user.role }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('staff_session');
  return { success: true };
}

export async function requireAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('staff_session')?.value;
  if (!session) {
    throw new Error('Unauthorized');
  }
  try {
    return JSON.parse(session);
  } catch (e) {
    throw new Error('Invalid session');
  }
}
