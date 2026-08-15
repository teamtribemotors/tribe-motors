'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useEmblaCarousel from 'embla-carousel-react';

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

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Embla Carousel refs
  const [mainRef, mainApi] = useEmblaCarousel({ skipSnaps: false, startIndex: 0 });
  const [fsRef, fsApi] = useEmblaCarousel({ skipSnaps: false, startIndex: 0 });

  const onSelectMain = useCallback(() => {
    if (!mainApi) return;
    setActiveIndex(mainApi.selectedScrollSnap());
  }, [mainApi]);

  const onSelectFs = useCallback(() => {
    if (!fsApi) return;
    setActiveIndex(fsApi.selectedScrollSnap());
  }, [fsApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on('select', onSelectMain);
    return () => { mainApi.off('select', onSelectMain); };
  }, [mainApi, onSelectMain]);

  useEffect(() => {
    if (!fsApi) return;
    fsApi.on('select', onSelectFs);
    return () => { fsApi.off('select', onSelectFs); };
  }, [fsApi, onSelectFs]);

  const handleIndexChange = useCallback((newIndex: number) => {
    setActiveIndex(newIndex);
    if (mainApi && mainApi.selectedScrollSnap() !== newIndex) {
      mainApi.scrollTo(newIndex);
    }
    if (fsApi && fsApi.selectedScrollSnap() !== newIndex) {
      fsApi.scrollTo(newIndex);
    }
  }, [mainApi, fsApi]);

  // Sync Embla instances when fullscreen mode changes
  useEffect(() => {
    if (isFullscreen && fsApi) {
      fsApi.scrollTo(activeIndex, true); // true = instant scroll
    }
    if (!isFullscreen && mainApi) {
      mainApi.scrollTo(activeIndex, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen, fsApi, mainApi]); // Intentionally omit activeIndex so it doesn't instantly scroll on normal index changes

  // Re-init embla if images array changes length (e.g. section change)
  useEffect(() => {
    if (mainApi) mainApi.reInit();
    if (fsApi) fsApi.reInit();
  }, [displayedImages, mainApi, fsApi]);

  // When changing section, reset active index to 0
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    handleIndexChange(0);
  };

  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-surface-container rounded-xl overflow-hidden flex items-center justify-center border border-outline-variant/30">
        <span className="material-symbols-outlined text-6xl text-outline-variant">directions_car</span>
      </div>
    );
  }

  const goNext = () => handleIndexChange((activeIndex + 1) % displayedImages.length);
  const goPrev = () => handleIndexChange((activeIndex - 1 + displayedImages.length) % displayedImages.length);

  return (
    <>
      <div className="flex flex-col gap-stack-sm">
        {/* Sections Tab */}
        {sections.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleSectionChange('All')}
              className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${activeSection === 'All'
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
                className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${activeSection === section
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
        <div
          className="w-full aspect-[16/9] bg-[#1a1a1a] rounded-xl overflow-hidden relative group shadow-sm border border-outline-variant/20 cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          {/* Scrollable Container (Embla) */}
          <div className="overflow-hidden w-full h-full" ref={mainRef}>
            <div className="flex w-full h-full">
              {displayedImages.map((img, idx) => (
                <div key={`${img.url}-${idx}`} className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain pointer-events-none"
                    src={img.url}
                    alt={imageAlt || `Vehicle Image ${idx + 1}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {displayedImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-primary text-white rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-10"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-primary text-white rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-10"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full font-label-sm text-label-sm tracking-wide z-10 pointer-events-none">
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
                onClick={() => handleIndexChange(idx)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-primary shadow-md scale-[1.02]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  loading="lazy"
                />
                {activeIndex === idx && (
                  <div className="absolute inset-0 bg-primary/10"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal via Portal to escape z-index constraints */}
      {mounted && isFullscreen && createPortal(
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="text-white bg-black/50 px-4 py-2 rounded-full font-label-md text-label-md backdrop-blur-md">
              {activeIndex + 1} / {displayedImages.length}
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-12 h-12 bg-black/50 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md pointer-events-auto"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Fullscreen Image Area */}
          <div className="flex-1 w-full h-full relative flex items-center justify-center">
            <div className="overflow-hidden w-full h-full" ref={fsRef}>
              <div className="flex w-full h-full items-center">
                {displayedImages.map((img, idx) => (
                  <FullscreenImageSlide 
                    key={`fs-${img.url}-${idx}`} 
                    img={img} 
                    idx={idx} 
                    activeIndex={activeIndex} 
                    imageAlt={imageAlt} 
                  />
                ))}
              </div>
            </div>

            {/* Navigation Arrows for Fullscreen */}
            {displayedImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 hover:bg-white/20 text-white rounded-full hidden md:flex items-center justify-center transition-all backdrop-blur-md z-10"
                >
                  <span className="material-symbols-outlined text-3xl">chevron_left</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/50 hover:bg-white/20 text-white rounded-full hidden md:flex items-center justify-center transition-all backdrop-blur-md z-10"
                >
                  <span className="material-symbols-outlined text-3xl">chevron_right</span>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails for Fullscreen (optional, but nice) */}
          {displayedImages.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 z-50 px-4">
              <div className="flex justify-center">
                <div className="flex gap-2 overflow-x-auto pb-2 max-w-full snap-x scrollbar-hide px-4">
                  {displayedImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleIndexChange(idx)}
                      className={`relative flex-none w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all snap-center ${activeIndex === idx ? 'border-primary opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}

function FullscreenImageSlide({ img, idx, activeIndex, imageAlt }: { img: ImageObj, idx: number, activeIndex: number, imageAlt?: string }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className={`flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-2 md:p-12 relative ${!isZoomed ? 'touch-pan-x' : ''}`}>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit
        disabled={idx !== activeIndex}
        wheel={{ wheelDisabled: true }}
        onTransformed={(ref) => setIsZoomed(ref.state.scale > 1)}
        panning={{ disabled: !isZoomed }}
      >
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            className="max-w-full max-h-full object-contain pointer-events-none"
            src={img.url}
            alt={imageAlt || `Vehicle Image ${idx + 1}`}
            loading={Math.abs(idx - activeIndex) <= 1 ? 'eager' : 'lazy'}
            style={{ pointerEvents: isZoomed ? 'auto' : 'none' }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
