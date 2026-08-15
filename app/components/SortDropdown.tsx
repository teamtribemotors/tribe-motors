'use client';

import { useQueryState } from 'nuqs';

export default function SortDropdown() {
  const [sort, setSort] = useQueryState('sort');
  const [page, setPage] = useQueryState('page');

  return (
    <div className="flex items-center gap-4 self-end md:self-auto w-full md:w-auto">
      <label className="sr-only" htmlFor="sort">Sort by</label>
      <div className="relative w-full md:w-64">
        <select 
          className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg py-3 pl-4 pr-10 text-body-md font-body-md text-on-background focus:ring-1 focus:ring-primary focus:border-primary" 
          id="sort"
          value={sort || ''}
          onChange={(e) => {
            setSort(e.target.value || null);
            setPage(null);
          }}
        >
          <option value="">Sort by: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="mileage_asc">Mileage: Low to High</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
      </div>
    </div>
  );
}
