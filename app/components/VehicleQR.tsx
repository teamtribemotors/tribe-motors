'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

export default function VehicleQR({ vehicleId }: { vehicleId: string }) {
  const qrRef = useRef<SVGSVGElement>(null);
  
  // URL to the public page
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/browse/${vehicleId}` 
    : `https://tribemotors.com/browse/${vehicleId}`;

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `vehicle-qr-${vehicleId}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container">
      <h4 className="font-label-bold text-label-bold text-on-surface-variant">Public Listing QR</h4>
      <div className="bg-white p-4 rounded-lg shadow-inner">
        <QRCodeSVG 
          value={url} 
          size={160} 
          fgColor="#6d281a" // var(--color-primary)
          ref={qrRef}
        />
      </div>
      <button 
        onClick={downloadQR}
        type="button"
        className="flex items-center gap-2 bg-surface-container-low hover:bg-surface-container-high border border-outline-variant text-primary px-4 py-2 rounded transition-colors font-label-bold"
      >
        <span className="material-symbols-outlined text-[20px]">download</span>
        Download QR
      </button>
    </div>
  );
}
