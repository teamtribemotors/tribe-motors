'use client';

import { useState } from 'react';

export default function ScheduleVisitForm() {
  const [selectedDate, setSelectedDate] = useState<number | null>(10);
  const [selectedTime, setSelectedTime] = useState<string | null>('11:00 AM');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <form className="space-y-stack-lg flex-grow flex flex-col" onSubmit={(e) => e.preventDefault()}>
      {/* Date & Time Selection */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md md:p-stack-lg shadow-sm space-y-stack-lg">
        
        {/* Date Picker */}
        <div>
          <div className="flex justify-between items-center mb-stack-md">
            <h3 className="font-headline-md text-headline-md">Select Date</h3>
            <div className="flex space-x-2">
              <button className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-50" type="button">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="font-label-md text-label-md flex items-center px-2">October 2024</span>
              <button className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors" type="button">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="font-label-sm text-label-sm text-on-surface-variant py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Empty days */}
            <div></div><div></div>
            
            {/* Days */}
            {[1, 2].map(day => (
              <button key={day} className="py-3 rounded-lg font-body-md text-body-md text-on-surface-variant opacity-30 cursor-not-allowed" disabled type="button">
                {day}
              </button>
            ))}
            
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => (
              <button 
                key={day} 
                onClick={() => setSelectedDate(day)}
                className={`py-3 rounded-lg font-body-md text-body-md transition-colors ${selectedDate === day ? 'text-on-primary bg-primary shadow-sm' : 'text-on-surface hover:bg-surface-variant'}`} 
                type="button"
              >
                {day}
              </button>
            ))}
          </div>
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
            <input className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none" id="firstName" placeholder="Enter first name" type="text"/>
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="lastName">Last Name</label>
            <input className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none" id="lastName" placeholder="Enter last name" type="text"/>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="phone">Phone Number</label>
            <input className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none" id="phone" placeholder="(555) 000-0000" type="tel"/>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="notes">Additional Notes (Optional)</label>
            <textarea className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none outline-none" id="notes" placeholder="Let us know if you'd like to test drive, value a trade-in, etc." rows={3}></textarea>
          </div>
        </div>
      </div>

      {/* Submission Area */}
      <div className="pt-stack-sm flex flex-col items-end space-y-4">
        <button className="w-full sm:w-auto min-h-[48px] bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md px-stack-xl py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2" type="submit">
          <span>Confirm Booking</span>
          <span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
        </button>
        <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center space-x-2">
          <span className="material-symbols-outlined text-[16px]" data-icon="info">info</span>
          <span>A confirmation email will be sent to you and your concierge immediately.</span>
        </p>
      </div>
    </form>
  );
}
