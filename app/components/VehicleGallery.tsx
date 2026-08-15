'use client';

import { useState, useMemo } from 'react';

type ImageObj = {
  url: string;
  section?: string;
  isMain?: boolean;
};

interface VehicleGalleryProps {
  images: ImageObj[];
  fallbackImageUrl?: string;
  imageAlt?: string;
}

export default function VehicleGallery({ images, fallbackImageUrl, imageAlt }: VehicleGalleryProps) {
  // Use fallback if images array is empty or not provided
  const validImages = Array.isArray(images) && images.length > 0 
    ? images 
    : fallbackImageUrl 
      ? [{ url: fallbackImageUrl, isMain: true }] 
      : [];

  const [activeIndex, setActiveIndex] = useState(0);
  
  // Find all unique sections
  const sections = useMemo(() => {
    const s = new Set<string>();
    validImages.forEach(img => {
      if (img.section) s.add(img.section);
    });
    return Array.from(s);
  }, [validImages]);

  // If we have sections, let user filter by section (or 'All')
  const [activeSection, setActiveSection] = useState<string>('All');

  // Filtered images based on active section
  const displayedImages = useMemo(() => {
    if (activeSection === 'All') return validImages;
    return validImages.filter(img => img.section === activeSection);
  }, [validImages, activeSection]);

  // When changing section, reset active index to 0 of the newly displayed images
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setActiveIndex(0);
  };

  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-surface-container rounded-xl overflow-hidden flex items-center justify-center border border-outline-variant/30">
        <span className="material-symbols-outlined text-6xl text-outline-variant">directions_car</span>
      </div>
    );
  }

  const currentImage = displayedImages[activeIndex] || validImages[0];

  const goNext = () => setActiveIndex((prev) => (prev + 1) % displayedImages.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + displayedImages.length) % displayedImages.length);

  return (
    <div className="flex flex-col gap-stack-sm">
      {/* Sections Tab */}
      {sections.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => handleSectionChange('All')}
            className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
              activeSection === 'All' 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-container hover:bg-surface-variant text-on-surface'
            }`}
          >
            All Photos
          </button>
          {sections.map(section => (
            <button
              key={section}
              onClick={() => handleSectionChange(section)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
                activeSection === section 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      )}

      {/* Main Image Area */}
      <div className="w-full aspect-[16/9] bg-[#1a1a1a] rounded-xl overflow-hidden relative group shadow-sm border border-outline-variant/20 cursor-pointer">
        <img 
          className="w-full h-full object-contain transition-opacity duration-300" 
          src={currentImage.url} 
          alt={imageAlt || 'Vehicle Image'} 
        />
        
        {/* Navigation Arrows */}
        {displayedImages.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full font-label-sm text-label-sm tracking-wide">
              {activeIndex + 1} / {displayedImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayedImages.length > 1 && (
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 overflow-x-auto pb-2">
          {displayedImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === idx ? 'border-primary shadow-md scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img 
                className="w-full h-full object-cover" 
                src={img.url} 
                alt={`Thumbnail ${idx + 1}`} 
              />
              {activeIndex === idx && (
                <div className="absolute inset-0 bg-primary/10"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
