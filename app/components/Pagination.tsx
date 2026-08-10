'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2">
      <Link 
        href={createPageURL(currentPage - 1)} 
        className={`w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold transition-colors ${currentPage <= 1 ? 'bg-surface-container text-on-surface opacity-50 pointer-events-none' : 'bg-surface-container text-on-surface hover:bg-surface-variant'}`}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </Link>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold transition-colors ${page === currentPage ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-variant'}`}
        >
          {page}
        </Link>
      ))}

      <Link 
        href={createPageURL(currentPage + 1)} 
        className={`w-10 h-10 rounded-full flex items-center justify-center font-label-bold text-label-bold transition-colors ${currentPage >= totalPages ? 'bg-surface-container text-on-surface opacity-50 pointer-events-none' : 'bg-surface-container text-on-surface hover:bg-surface-variant'}`}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </Link>
    </div>
  );
}
