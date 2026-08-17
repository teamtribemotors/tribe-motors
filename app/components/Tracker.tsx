'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '../actions/analytics';

export default function Tracker() {
  const pathname = usePathname();
  
  useEffect(() => {
    if (pathname) {
      trackVisit(pathname);
    }
  }, [pathname]);
  
  return null;
}
