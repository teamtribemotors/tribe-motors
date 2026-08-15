'use client';

import { useState, useActionState } from 'react';
import { scheduleVisit } from '../actions/appointments';

export default function ScheduleVisitForm({ vehicleId }: { vehicleId: string }) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>('11:00 AM');

  const [state, formAction, isPending] = useActionState(scheduleVisit, null);

  if (state?.success) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-xl shadow-sm text-center">
        <span className="material-symbols-outlined text-4xl text-tertiary mb-4">check_circle</span>
        <h3 className="font-headline-lg text-headline-lg mb-2">Booking Confirmed!</h3>
        <p className="font-body-md text-on-surface-variant">{state.message}</p>
      </div>
    );
  }

  return (
    <form className="space-y-stack-lg flex-grow flex flex-col" action={formAction}>
      {/* Hidden Inputs for Action */}
      <input type="hidden" name="vehicleId" value={vehicleId} />
      <input type="hidden" name="time" value={selectedTime || ''} />

      {state?.success === false && (
        <div className="bg-error/10 text-error border border-error/20 p-4 rounded-lg font-body-md text-body-md">
          {state.message}
        </div>
      )}

      {/* Date & Time Selection */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md md:p-stack-lg shadow-sm space-y-stack-lg">
        
        {/* Date Picker */}
        <div>
          <label className="font-headline-md text-headline-md mb-stack-md block">Select Date</label>
          <input 
            type="date" 
            name="date"
            min={new Date().toISOString().split('T')[0]}
            max={new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]}
            required
            className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            value={selectedDate || ''}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="border-t border-outline-variant/30 pt-stack-lg">
          <h3 className="font-headline-md text-headline-md mb-stack-md">Select Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-stack-sm">
            <button className="py-3 px-4 border border-outline-variant/50 rounded-lg text-on-surface-variant font-label-md text-label-md opacity-40 cursor-not-allowed" disabled type="button">
              09:00 AM
            </button>
            {['10:00 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map(time => (
              <button 
                key={time} 
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-4 border rounded-lg font-label-md text-label-md transition-all ${selectedTime === time ? 'border-primary bg-surface-container-low text-primary shadow-sm' : 'border-outline-variant text-on-surface hover:border-primary hover:text-primary'}`} 
                type="button"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md md:p-stack-lg shadow-sm">
        <h3 className="font-headline-md text-headline-md mb-stack-md">Contact Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="firstName">First Name</label>
            <input name="firstName" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none" id="firstName" placeholder="Enter first name" type="text" required/>
            {state?.errors?.firstName && <p className="text-error text-label-sm">{state.errors.firstName[0]}</p>}
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="lastName">Last Name</label>
            <input name="lastName" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none" id="lastName" placeholder="Enter last name" type="text" required/>
            {state?.errors?.lastName && <p className="text-error text-label-sm">{state.errors.lastName[0]}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="phone">Phone Number</label>
            <input name="phone" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none" id="phone" placeholder="(555) 000-0000" type="tel" required/>
            {state?.errors?.phone && <p className="text-error text-label-sm">{state.errors.phone[0]}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="notes">Additional Notes (Optional)</label>
            <textarea name="notes" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none outline-none" id="notes" placeholder="Let us know if you'd like to test drive, value a trade-in, etc." rows={3}></textarea>
          </div>
        </div>
      </div>

      {/* Submission Area */}
      <div className="pt-stack-sm flex flex-col items-end space-y-4">
        <button disabled={isPending} className="w-full sm:w-auto min-h-[48px] bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md px-stack-xl py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2 disabled:opacity-70" type="submit">
          <span>{isPending ? 'Confirming...' : 'Confirm Booking'}</span>
          {!isPending && <span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>}
        </button>
        <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center space-x-2">
          <span className="material-symbols-outlined text-[16px]" data-icon="info">info</span>
          <span>A confirmation email will be sent to you and your concierge immediately.</span>
        </p>
      </div>
    </form>
  );
}
