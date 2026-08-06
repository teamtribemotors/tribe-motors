import Link from 'next/link';

export default function StaffLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-4">
            <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-sm border border-outline-variant">
                <div className="text-center mb-8">
                    <h1 className="font-headline-lg text-headline-lg font-bold text-primary mb-2">Tribe Motors</h1>
                    <p className="font-body-md text-on-surface-variant">Staff Portal Login</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block font-label-bold text-on-surface mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
                            <input 
                                id="email"
                                type="email" 
                                className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="name@tribemotors.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-label-bold text-on-surface mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
                            <input 
                                id="password"
                                type="password" 
                                className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                            <span className="font-body-sm text-on-surface-variant">Remember me</span>
                        </label>
                        <a href="#" className="font-label-sm text-primary hover:underline">Forgot password?</a>
                    </div>

                    <Link href="/staff" className="w-full block text-center bg-primary text-on-primary font-label-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                        Sign In
                    </Link>
                </form>
            </div>
        </div>
    );
}
