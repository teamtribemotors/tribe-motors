'use server';

import { db } from '../../db';
import { pageVisits } from '../../db/schema';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function trackVisit(path: string) {
  try {
    const cookieStore = await cookies();
    let visitorId = cookieStore.get('visitor_id')?.value;
    
    if (!visitorId) {
      visitorId = uuidv4();
      cookieStore.set('visitor_id', visitorId, { 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }
    
    await db.insert(pageVisits).values({
      path,
      visitorId
    });
  } catch (error) {
    console.error('Failed to track visit:', error);
  }
}
