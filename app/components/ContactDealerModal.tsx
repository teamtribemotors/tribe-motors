'use client';

import { useState, useActionState, useEffect } from 'react';
import { submitEnquiry } from '../actions';
import toast from 'react-hot-toast';

export default function ContactDealerModal({
  vehicleId,
  vehicleModel,
}: {
  vehicleId: string;
  vehicleModel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(submitEnquiry, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setIsOpen(false);
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 bg-surface text-on-surface border border-outline-variant font-label-bold text-label-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-surface-variant transition-colors"
      >
        <span className="material-symbols-outlined text-primary">chat_bubble</span>
        Contact Dealer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface rounded-xl shadow-ambient-lg max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="font-headline-md text-headline-md text-on-background mb-2">Contact Dealer</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Enquire about the {vehicleModel}.</p>
            
            <form action={formAction} className="flex flex-col gap-4">
              <input type="hidden" name="vehicleId" value={vehicleId} />
              <input type="hidden" name="vehicleModel" value={vehicleModel} />
              
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-1">Your Name</label>
                <input 
                  name="name"
                  type="text" 
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="John Doe"
                />
                {state?.errors?.name && <p className="text-error text-sm mt-1">{state.errors.name[0]}</p>}
              </div>

              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-1">Phone Number</label>
                <input 
                  name="number"
                  type="tel" 
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+91 98765 43210"
                />
                {state?.errors?.number && <p className="text-error text-sm mt-1">{state.errors.number[0]}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
