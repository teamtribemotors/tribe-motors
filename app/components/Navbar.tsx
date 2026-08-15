'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isOpen) return; // Don't hide if menu is open

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down and past the header height, hide
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } 
      // If scrolling up, show
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 bg-[#27282C] shadow-sm w-full transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img alt="Tribe Motors Logo" className="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu9LY84Ic1lzl-mMXLslWeJDWmrvoULEwL6cDwt6OFSUNJXKX0hmcQQGZR_Ajh-KmNSS350HAiaIFmAXE0amPO47tAhSN5iziu5DvWx_sl5Wr3KXYg8ybDiSITI-C46xuvmolUIW30qfu5QrxuawrPo3FyrKAZvL000_VhBp3Azm6fl3b5tbb6iTxfwddHA8FfYtNVaENnuP7dPQAUr7g0FpI14zbdDLOw-rclsj07Db4UWwSdEt8iUTOcKUvDnOFgnRc" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/browse">Garage</Link>
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/how-it-works">About</Link>
          <a className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="mailto:support@tribemotors.com">Contact</a>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-surface-variant p-2">
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#27282C] border-t border-outline-variant/20 px-margin-mobile py-4 flex flex-col gap-4 absolute left-0 w-full shadow-lg">
          <Link onClick={() => setIsOpen(false)} className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/browse">Garage</Link>
          <Link onClick={() => setIsOpen(false)} className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/how-it-works">About</Link>
          <a onClick={() => setIsOpen(false)} className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="mailto:support@tribemotors.com">Contact</a>
        </div>
      )}
    </header>
  );
}
