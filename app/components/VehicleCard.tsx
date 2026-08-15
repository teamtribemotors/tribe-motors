import Link from 'next/link';
import { formatIndianCurrency } from '../utils';

export interface VehicleCardProps {
  id: string;
  title: string;
  price: number | string;
  mileage: number | string;
  fuelType: string;
  transmission: string;
  isCertified: boolean;
  imageUrl: string;
  imageAlt: string;
  year?: number | string;
}

export default function VehicleCard({ vehicle }: { vehicle: VehicleCardProps }) {
  const formattedPrice = formatIndianCurrency(vehicle.price);

  const formattedMileage = typeof vehicle.mileage === 'number'
    ? `${new Intl.NumberFormat('en-IN').format(vehicle.mileage)} km`
    : vehicle.mileage;

  return (
    <Link href={`/vehicle/${vehicle.id}`} className="block h-full">
      <article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 group hover:shadow-lg transition-all duration-300 relative flex flex-col h-full cursor-pointer">
        {vehicle.isCertified && (
          <div className="absolute top-4 right-4 z-10 trust-badge px-3 py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[16px]" data-icon="verified">verified</span>
            Verified
          </div>
        )}
        <div className="relative w-full aspect-[4/3] bg-surface-variant overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
            data-alt={vehicle.imageAlt} 
            style={{ backgroundImage: `url('${vehicle.imageUrl}')` }}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
            <h3 className="text-headline-md font-headline-md text-on-background leading-tight">{vehicle.title}</h3>
            <p className="text-body-md text-on-surface-variant mt-1">{vehicle.year || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="text-display-sm font-headline-lg text-primary">{formattedPrice}</p>
          </div>
          <div className="mt-auto pt-4 border-t border-outline-variant/20 grid grid-cols-2 gap-y-2 gap-x-4">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]" data-icon="speed">speed</span>
              <span className="font-label-sm text-label-sm">{formattedMileage}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]" data-icon="settings">settings</span>
              <span className="font-label-sm text-label-sm">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant col-span-2">
              <span className="material-symbols-outlined text-[18px]" data-icon="local_gas_station">local_gas_station</span>
              <span className="font-label-sm text-label-sm">{vehicle.fuelType}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
