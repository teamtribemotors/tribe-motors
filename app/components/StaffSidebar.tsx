"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../actions/auth';

export default function StaffSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const getLinkClass = (path: string) => {
        // Exact match for /staff, otherwise prefix match for others like /staff/inventory
        const isActive = path === '/staff' ? pathname === '/staff' : pathname.startsWith(path);
        return isActive
            ? "flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded-lg mx-2 transition-colors duration-200 shadow-sm"
            : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant mx-2 rounded-lg transition-colors duration-200 group";
    };

    const getIconClass = (path: string) => {
        const isActive = path === '/staff' ? pathname === '/staff' : pathname.startsWith(path);
        return isActive ? "material-symbols-outlined filled-icon" : "material-symbols-outlined";
    };
    
    const handleLogout = async () => {
        await logout();
        router.push('/staff/login');
    };

    return (
        <nav className="fixed left-0 top-0 h-full w-64 bg-surface-container flex flex-col border-r border-outline-variant z-20">
            <div className="px-6 py-8">
                <h1 className="font-headline-md text-headline-md font-bold text-primary">Tribe Motors</h1>
                <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-outline-variant bg-surface-variant flex items-center justify-center font-label-bold text-on-surface">TM</div>
                    <div>
                        <div className="font-label-bold text-label-bold text-on-surface">Staff Portal</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">Admin Level</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <Link className={getLinkClass('/staff')} href="/staff">
                    <span className={getIconClass('/staff')}>dashboard</span>
                    <span className="font-label-bold text-label-bold">Dashboard</span>
                </Link>
                <Link className={getLinkClass('/staff/inventory')} href="/staff/inventory">
                    <span className={getIconClass('/staff/inventory')}>directions_car</span>
                    <span className="font-label-bold text-label-bold">Inventory</span>
                </Link>
                <Link className={getLinkClass('/staff/inspections')} href="/staff/inspections">
                    <span className={getIconClass('/staff/inspections')}>fact_check</span>
                    <span className="font-label-bold text-label-bold">Inspections</span>
                </Link>
                <Link className={getLinkClass('/staff/records')} href="/staff/records">
                    <span className={getIconClass('/staff/records')}>build</span>
                    <span className="font-label-bold text-label-bold">Service Records</span>
                </Link>
                <Link className={getLinkClass('/staff/fulfillment')} href="/staff/fulfillment">
                    <span className={getIconClass('/staff/fulfillment')}>workspace_premium</span>
                    <span className="font-label-bold text-label-bold">Fulfillment</span>
                </Link>
                <Link className={getLinkClass('/staff/enquiries')} href="/staff/enquiries">
                    <span className={getIconClass('/staff/enquiries')}>forum</span>
                    <span className="font-label-bold text-label-bold">Enquiries</span>
                </Link>
                <Link className={getLinkClass('/staff/new')} href="/staff/new">
                    <span className={getIconClass('/staff/new')}>person_add</span>
                    <span className="font-label-bold text-label-bold">Add Staff</span>
                </Link>
                <Link className={getLinkClass('/staff/settings')} href="/staff/settings">
                    <span className={getIconClass('/staff/settings')}>settings</span>
                    <span className="font-label-bold text-label-bold">Settings</span>
                </Link>
            </div>

            <div className="p-4">
                <Link href="/staff/inventory/new" className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    Add New Vehicle
                </Link>
            </div>

            <div className="p-4 border-t border-outline-variant space-y-1">
                <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors duration-200" href="#">
                    <span className="material-symbols-outlined">settings</span>
                    <span className="font-label-bold text-label-bold">Settings</span>
                </a>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors duration-200">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="font-label-bold text-label-bold">Logout</span>
                </button>
            </div>
        </nav>
    );
}
