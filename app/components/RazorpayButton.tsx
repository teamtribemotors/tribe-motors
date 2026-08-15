'use client';

import { useState } from 'react';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RazorpayButton({ vehicleId, amount }: { vehicleId: string, amount: number }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create order
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const orderData = await orderRes.json();
      
      if (orderData.error) {
        toast.error(orderData.error);
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tribe Motors",
        description: "Full History Report Unlock",
        order_id: orderData.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              vehicleId,
              amount,
            }),
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment successful! Report unlocked.");
            // Force a hard refresh to re-fetch any server state if needed, or navigate to success
            router.push(`/vehicle/${vehicleId}`); 
          } else {
            toast.error("Payment verification failed.");
          }
        },
        theme: {
          color: "#BC4624" // Primary color
        }
      };
      
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        toast.error(response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong initializing payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full md:w-auto px-stack-xl py-4 bg-primary text-white font-label-md text-label-md rounded-md hover:opacity-90 transition-opacity duration-200 shadow-sm flex justify-center items-center gap-2 mx-auto disabled:opacity-50"
      >
        <span className="material-symbols-outlined" data-icon="lock">lock</span>
        {isProcessing ? "Processing..." : "Pay ₹2,499 & Unlock Report"}
      </button>
    </>
  );
}
