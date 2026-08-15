'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#27282C] shadow-sm w-full">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img alt="Tribe Motors Logo" className="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu9LY84Ic1lzl-mMXLslWeJDWmrvoULEwL6cDwt6OFSUNJXKX0hmcQQGZR_Ajh-KmNSS350HAiaIFmAXE0amPO47tAhSN5iziu5DvWx_sl5Wr3KXYg8ybDiSITI-C46xuvmolUIW30qfu5QrxuawrPo3FyrKAZvL000_VhBp3Azm6fl3b5tbb6iTxfwddHA8FfYtNVaENnuP7dPQAUr7g0FpI14zbdDLOw-rclsj07Db4UWwSdEt8iUTOcKUvDnOFgnRc" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/browse">Inventory</Link>
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/how-it-works">About</Link>
          <a className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="mailto:support@tribemotors.com">Contact</a>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-surface-variant p-2">
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#27282C] border-t border-outline-variant/20 px-margin-mobile py-4 flex flex-col gap-4 absolute w-full shadow-lg">
          <Link onClick={() => setIsOpen(false)} className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/browse">Inventory</Link>
          <Link onClick={() => setIsOpen(false)} className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/how-it-works">About</Link>
          <a onClick={() => setIsOpen(false)} className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="mailto:support@tribemotors.com">Contact</a>
        </div>
      )}
    </header>
  );
}
