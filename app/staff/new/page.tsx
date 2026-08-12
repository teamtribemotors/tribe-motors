'use client';

import { useActionState, useEffect } from 'react';
import { createStaff } from '../../actions/staff';
import { useRouter } from 'next/navigation';
import StaffSidebar from '../../components/StaffSidebar';

const initialState = {
  success: false,
  error: '',
};

export default function CreateStaffPage() {
    const [state, formAction, isPending] = useActionState(createStaff, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push('/staff');
        }
    }, [state.success, router]);

    return (
        <div className="h-full flex antialiased text-on-background font-body-md bg-surface-container-low">
            <StaffSidebar />
            <main className="flex-1 ml-64 p-margin-desktop bg-surface-container-low min-h-screen">
                <header className="flex justify-between items-center mb-stack-md">
                    <div>
                        <h2 className="font-headline-lg text-headline-lg text-on-background">Add New Staff</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Create a new staff member account and assign permissions.</p>
                    </div>
                </header>

                <div className="bg-surface rounded-xl border border-outline-variant shadow-sm max-w-2xl">
                    {state.error && (
                        <div className="m-6 mb-0 p-3 bg-error/10 border border-error text-error rounded-lg text-sm text-center">
                            {state.error}
                        </div>
                    )}
                    <form action={formAction} className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block font-label-bold text-on-surface mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input 
                                    id="firstName"
                                    name="firstName"
                                    type="text" 
                                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="Jane"
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="block font-label-bold text-on-surface mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input 
                                    id="lastName"
                                    name="lastName"
                                    type="text" 
                                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-label-bold text-on-surface mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input 
                                id="email"
                                name="email"
                                type="email" 
                                className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="jane.doe@tribemotors.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-label-bold text-on-surface mb-2" htmlFor="password">
                                Temporary Password
                            </label>
                            <input 
                                id="password"
                                name="password"
                                type="password" 
                                className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="default123"
                            />
                        </div>

                        <div>
                            <label className="block font-label-bold text-on-surface mb-2" htmlFor="role">
                                Role
                            </label>
                            <select 
                                id="role"
                                name="role"
                                className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                required
                                defaultValue=""
                            >
                                <option value="" disabled>Select a role...</option>
                                <option value="admin">Administrator</option>
                                <option value="sales">Sales Representative</option>
                                <option value="service">Service Technician</option>
                                <option value="inventory">Inventory Manager</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-label-bold text-on-surface mb-3">
                                Permissions
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                                    <div>
                                        <div className="font-label-bold text-on-surface">Manage Inventory</div>
                                        <div className="font-body-sm text-on-surface-variant">Add, edit, or remove vehicles from the lot.</div>
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                                    <div>
                                        <div className="font-label-bold text-on-surface">Process Sales</div>
                                        <div className="font-body-sm text-on-surface-variant">Handle customer transactions and approvals.</div>
                                    </div>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                                    <div>
                                        <div className="font-label-bold text-on-surface">View Service Records</div>
                                        <div className="font-body-sm text-on-surface-variant">Access and update maintenance logs.</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-outline-variant">
                            <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-variant transition-colors font-label-bold">
                                Cancel
                            </button>
                            <button disabled={isPending} type="submit" className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity font-label-bold disabled:opacity-50">
                                {isPending ? 'Creating...' : 'Create Staff Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
