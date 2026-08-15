'use client';

import { useQueryState } from 'nuqs';

export default function Filters() {
  const [minPrice, setMinPrice] = useQueryState('minPrice');
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice');
  const [year, setYear] = useQueryState('year');
  const [sort, setSort] = useQueryState('sort');
  const [page, setPage] = useQueryState('page');

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 p-6 sticky top-24">
      <h2 className="text-headline-md font-headline-md text-on-background mb-6">Filters</h2>
      
      {/* Filter: Make */}
      <div className="filter-section pb-6 mb-6">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Make &amp; Model</h3>
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
          <input className="w-full bg-surface border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-body-md focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Search make..." type="text" />
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
            <span className="text-body-md group-hover:text-primary transition-colors">Porsche (12)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
            <span className="text-body-md group-hover:text-primary transition-colors">Mercedes-Benz (8)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
            <span className="text-body-md group-hover:text-primary transition-colors">BMW (4)</span>
          </label>
        </div>
      </div>
      
      {/* Filter: Price Range */}
      <div className="filter-section pb-6 mb-6">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Price Range (₹)</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="sr-only">Min Price</label>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg py-2 px-3 text-body-md text-center focus:ring-1 focus:ring-primary" 
              type="text" 
              defaultValue="10,00,000" 
              onChange={(e) => setMinPrice(e.target.value.replace(/,/g, '') || null)}
            />
          </div>
          <span className="text-on-surface-variant">-</span>
          <div className="flex-1">
            <label className="sr-only">Max Price</label>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg py-2 px-3 text-body-md text-center focus:ring-1 focus:ring-primary" 
              type="text" 
              defaultValue="3,00,00,000" 
              onChange={(e) => setMaxPrice(e.target.value.replace(/,/g, '') || null)}
            />
          </div>
        </div>
        {/* Decorative Slider */}
        <div className="h-1.5 w-full bg-surface-variant rounded-full relative">
          <div className="absolute left-[10%] right-[30%] h-full bg-primary rounded-full"></div>
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface-bright shadow cursor-pointer"></div>
          <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface-bright shadow cursor-pointer"></div>
        </div>
      </div>
      
      <button 
        onClick={() => setPage(null)}
        className="w-full h-12 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-colors shadow-sm"
      >
        Apply Filters
      </button>
    </div>
  );
}
