'use client';

import { useQueryState } from 'nuqs';

export default function Filters() {
  const [minPrice, setMinPrice] = useQueryState('minPrice');
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice');
  const [year, setYear] = useQueryState('year');
  const [sort, setSort] = useQueryState('sort');
  const [page, setPage] = useQueryState('page');

  // Clear filters
  const resetFilters = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setYear(null);
    setSort(null);
    setPage(null);
  };

  return (
    <div className="bg-surface p-stack-md rounded-xl ambient-shadow sticky top-28">
      <div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-stack-sm">
        <h2 className="font-headline-md text-headline-md text-on-background">Filters</h2>
        <button onClick={resetFilters} className="font-label-sm text-label-sm text-primary hover:underline">Reset</button>
      </div>

      <div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
        <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Price Range</h3>
        <div className="flex items-center gap-2">
          <input 
            className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2" 
            placeholder="Min" 
            type="number" 
            value={minPrice || ''}
            onChange={(e) => {
              setMinPrice(e.target.value || null);
              setPage(null); // Reset page on filter change
            }}
          />
          <span className="text-on-surface-variant">-</span>
          <input 
            className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2" 
            placeholder="Max" 
            type="number"
            value={maxPrice || ''}
            onChange={(e) => {
              setMaxPrice(e.target.value || null);
              setPage(null);
            }} 
          />
        </div>
      </div>

      <div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
        <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Year</h3>
        <select 
          className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2"
          value={year || ''}
          onChange={(e) => {
            setYear(e.target.value || null);
            setPage(null);
          }}
        >
          <option value="">Any Year</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
      </div>

      {/* Fuel Type & Body Type filters omitted for brevity, but easily addable */}
      
      <div className="mt-4">
        <h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Sort By</h3>
        <select 
          className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2"
          value={sort || ''}
          onChange={(e) => setSort(e.target.value || null)}
        >
          <option value="">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="year_desc">Year: Newest</option>
        </select>
      </div>
    </div>
  );
}
