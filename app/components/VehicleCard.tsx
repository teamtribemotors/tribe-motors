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
      <article className="bg-surface-container-lowest rounded-lg border border-secondary-container/50 overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
        <div className="relative h-64 overflow-hidden">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            data-alt={vehicle.imageAlt} 
            src={vehicle.imageUrl} 
            alt={vehicle.title} 
          />
          {vehicle.isCertified && (
            <div className="absolute top-4 right-4">
              <span className="trust-badge">
                <span className="material-symbols-outlined text-[14px]">verified</span> Verified
              </span>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{vehicle.title}</h3>
          <p className="font-display-lg text-headline-md text-primary mb-6">{formattedPrice}</p>
          <ul className="flex flex-col gap-3 mt-auto border-t border-secondary-container pt-4">
            <li className="flex justify-between items-center text-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Year</span>
              <span className="font-body-md text-body-md text-on-surface">{vehicle.year || 'N/A'}</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Transmission</span>
              <span className="font-body-md text-body-md text-on-surface">{vehicle.transmission}</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Mileage</span>
              <span className="font-body-md text-body-md text-on-surface">{formattedMileage}</span>
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}
