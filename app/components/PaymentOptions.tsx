'use client';

import { useState } from 'react';

export default function PaymentOptions() {
  const [selected, setSelected] = useState('upi');

  return (
    <div>
      <h4 className="font-label-md text-label-md text-on-surface uppercase mb-stack-sm tracking-wider">Select Payment Method</h4>
      <div className="space-y-3">
        <label className={`payment-option flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${selected === 'upi' ? 'selected border-primary bg-surface-container-low' : 'border-outline-variant/50 bg-surface-container-lowest'}`}>
          <input 
            checked={selected === 'upi'} 
            onChange={() => setSelected('upi')} 
            className="text-primary focus:ring-primary mr-3" 
            name="payment_method" 
            type="radio" 
            value="upi" 
          />
          <div className="flex-grow">
            <span className="font-label-md text-label-md text-on-surface block">UPI</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">GPay, PhonePe, Paytm</span>
          </div>
        </label>
        
        <label className={`payment-option flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${selected === 'card' ? 'selected border-primary bg-surface-container-low' : 'border-outline-variant/50 bg-surface-container-lowest'}`}>
          <input 
            checked={selected === 'card'} 
            onChange={() => setSelected('card')} 
            className="text-primary focus:ring-primary mr-3" 
            name="payment_method" 
            type="radio" 
            value="card" 
          />
          <div className="flex-grow">
            <span className="font-label-md text-label-md text-on-surface block">Credit/Debit Card</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">Visa, Mastercard, RuPay</span>
          </div>
        </label>
        
        <label className={`payment-option flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${selected === 'netbanking' ? 'selected border-primary bg-surface-container-low' : 'border-outline-variant/50 bg-surface-container-lowest'}`}>
          <input 
            checked={selected === 'netbanking'} 
            onChange={() => setSelected('netbanking')} 
            className="text-primary focus:ring-primary mr-3" 
            name="payment_method" 
            type="radio" 
            value="netbanking" 
          />
          <div className="flex-grow">
            <span className="font-label-md text-label-md text-on-surface block">Netbanking</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">All Major Indian Banks</span>
          </div>
        </label>
      </div>
    </div>
  );
}
