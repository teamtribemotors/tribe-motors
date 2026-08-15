"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '../actions/auth';

export default function StaffSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => {
        return path === '/staff' ? pathname === '/staff' : pathname.startsWith(path);
    };

    const getLinkClass = (path: string) => {
        if (isActive(path)) {
            return "flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white transition-colors cursor-pointer";
        }
        return "flex items-center gap-3 px-3 py-2 hover:bg-[#3a3b40] rounded-lg transition-colors cursor-pointer text-surface/70 hover:text-surface group";
    };

    const getIconClass = (path: string) => {
        if (isActive(path)) {
            return "material-symbols-outlined";
        }
        return "material-symbols-outlined text-primary";
    };

    const handleLogout = async () => {
        await logout();
        router.push('/staff/login');
    };

    return (
        <aside className="w-64 border-r border-outline-variant/30 flex flex-col shrink-0 min-h-screen" style={{ backgroundColor: '#27282c' }}>
            <div className="flex h-full flex-col justify-between p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center mb-6 px-2">
                        <img alt="Tribe Motors Logo" className="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yF1ZzCS-6-Kr83TrMef8NYKo1pl2uTEtXhWKc-lzWr_D6cRIx_UeLAHay7d27J0dbiAfvXgWcMiapq9WzKrEMzz_MjAAT_hjrIBjY8-1QWkM2CKFB8TvNhLuxh0KRSvbVigsdiqpVn-4AhsTowEh90qcMZLnG9NSKiGAS9-5GN4vYZoEQGImUnNvg9FjVNkw6i8EZC9RX3zeITgtQIavELG8tbvrN6f2s_A005JUMJcuOd8F3E0759rf8ySDNXplqAU" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Link href="/staff" className={getLinkClass('/staff')}>
                            <span className={getIconClass('/staff')} style={{ fontVariationSettings: isActive('/staff') ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
                            <p className="text-sm font-medium leading-normal font-label-md">Dashboard</p>
                        </Link>
                        
                        <Link href="/staff/enquiries" className={getLinkClass('/staff/enquiries')}>
                            <span className={getIconClass('/staff/enquiries')} style={{ fontVariationSettings: isActive('/staff/enquiries') ? "'FILL' 1" : "'FILL' 0" }}>shuffle</span>
                            <p className="text-sm font-medium leading-normal font-label-md">Enquiries</p>
                        </Link>
                        
                        <Link href="/staff/inventory" className={getLinkClass('/staff/inventory')}>
                            <span className={getIconClass('/staff/inventory')} style={{ fontVariationSettings: isActive('/staff/inventory') ? "'FILL' 1" : "'FILL' 0" }}>directions_car</span>
                            <p className="text-sm font-medium leading-normal font-label-md">Inventory</p>
                        </Link>
                        
                        <Link href="/staff/appointments" className={getLinkClass('/staff/appointments')}>
                            <span className={getIconClass('/staff/appointments')} style={{ fontVariationSettings: isActive('/staff/appointments') ? "'FILL' 1" : "'FILL' 0" }}>calendar_today</span>
                            <p className="text-sm font-medium leading-normal font-label-md">Appointments</p>
                        </Link>
                        
                        <Link href="/staff/records" className={getLinkClass('/staff/records')}>
                            <span className={getIconClass('/staff/records')} style={{ fontVariationSettings: isActive('/staff/records') ? "'FILL' 1" : "'FILL' 0" }}>description</span>
                            <p className="text-sm font-medium leading-normal font-label-md">Service Records</p>
                        </Link>
                    </div>
                </div>
                
                <div className="flex flex-col gap-1">
                    <Link href="/staff/settings" className={getLinkClass('/staff/settings')}>
                        <span className={getIconClass('/staff/settings')} style={{ fontVariationSettings: isActive('/staff/settings') ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
                        <p className="text-sm font-medium leading-normal font-label-md">Settings</p>
                    </Link>
                    
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 hover:bg-[#3a3b40] rounded-lg transition-colors cursor-pointer text-surface/70 hover:text-surface group w-full text-left">
                        <span className="material-symbols-outlined text-primary">logout</span>
                        <p className="text-sm font-medium leading-normal font-label-md">Logout</p>
                    </button>
                </div>
            </div>
        </aside>
    );
}
