'use client';

import { useQueryState } from 'nuqs';
import { useState } from 'react';

export default function Filters({ availableMakes }: { availableMakes: { name: string; count: number }[] }) {
  const [minPrice, setMinPrice] = useQueryState('minPrice');
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice');
  const [year, setYear] = useQueryState('year');
  const [sort, setSort] = useQueryState('sort');
  const [page, setPage] = useQueryState('page');
  const [makeStr, setMakeStr] = useQueryState('make');
  
  const selectedMakes = makeStr ? makeStr.split(',').filter(Boolean) : [];
  
  const [makeSearch, setMakeSearch] = useState('');

  const toggleMake = (make: string) => {
    let updated = [...selectedMakes];
    if (updated.includes(make)) {
      updated = updated.filter(m => m !== make);
    } else {
      updated.push(make);
    }
    setMakeStr(updated.length > 0 ? updated.join(',') : null);
    setPage(null); // Reset page on filter change
  };

  const applyPrice = () => {
    // handled via state binding on inputs, but button resets page
    setPage(null);
    setIsOpen(false);
  };

  const filteredMakes = availableMakes.filter(m => m.name.toLowerCase().includes(makeSearch.toLowerCase()));

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden w-full flex items-center justify-center gap-2 bg-surface-container-low border border-outline-variant rounded-lg p-3 mb-4 text-on-surface font-label-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'filter_list'}</span>
        {isOpen ? 'Close Filters' : 'Show Filters'}
      </button>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-surface-container-lowest rounded-xl border border-outline-variant/50 p-6 md:sticky md:top-24 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto`}>
        <h2 className="hidden md:block text-headline-md font-headline-md text-on-background mb-6">Filters</h2>
      
      {/* Filter: Make */}
      <div className="filter-section pb-6 mb-6">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Make &amp; Model</h3>
        <div className="relative mb-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
          <input 
            className="w-full bg-surface border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
            placeholder="Search make..." 
            type="text" 
            value={makeSearch}
            onChange={(e) => setMakeSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {filteredMakes.length > 0 ? (
            filteredMakes.map(make => (
              <label key={make.name} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedMakes.includes(make.name)}
                  onChange={() => toggleMake(make.name)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" 
                />
                <span className="text-body-md group-hover:text-primary transition-colors">{make.name} ({make.count})</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-on-surface-variant">No makes found</p>
          )}
        </div>
      </div>
      
      {/* Filter: Price Range */}
      <div className="filter-section pb-6 mb-6">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase tracking-wider">Price Range (₹)</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="sr-only">Min Price</label>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg py-2 px-3 text-body-md text-center focus:ring-1 focus:ring-primary outline-none" 
              type="text" 
              value={minPrice || ''}
              placeholder="Min"
              onChange={(e) => {
                const val = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(val))) setMinPrice(val || null);
              }}
            />
          </div>
          <span className="text-on-surface-variant">-</span>
          <div className="flex-1">
            <label className="sr-only">Max Price</label>
            <input 
              className="w-full bg-surface border border-outline-variant rounded-lg py-2 px-3 text-body-md text-center focus:ring-1 focus:ring-primary outline-none" 
              type="text" 
              value={maxPrice || ''}
              placeholder="Max"
              onChange={(e) => {
                const val = e.target.value.replace(/,/g, '');
                if (!isNaN(Number(val))) setMaxPrice(val || null);
              }}
            />
          </div>
        </div>
        {/* Decorative Slider */}
        <div className="h-1.5 w-full bg-surface-variant rounded-full relative">
          <div className="absolute left-[0%] right-[0%] h-full bg-primary rounded-full"></div>
          <div className="absolute left-[0%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface-bright shadow cursor-pointer"></div>
          <div className="absolute right-[0%] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface-bright shadow cursor-pointer"></div>
        </div>
      </div>
      
      <button 
        onClick={applyPrice}
        className="w-full h-12 bg-primary text-on-primary font-label-md rounded-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
      >
        Apply Filters
      </button>
      </div>
    </>
  );
}
