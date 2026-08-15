import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '../../../../db';
import { reportUnlocks } from '../../../../db/schema';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vehicleId, amount } = await req.json();
    
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
      
    if (expectedSignature === razorpay_signature) {
      // Payment is successful, insert record
      await db.insert(reportUnlocks).values({
        vehicleId,
        amount,
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
