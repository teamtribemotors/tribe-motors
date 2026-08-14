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
}

export default function VehicleCard({ vehicle }: { vehicle: VehicleCardProps }) {
  const formattedPrice = formatIndianCurrency(vehicle.price);

  const formattedMileage = typeof vehicle.mileage === 'number'
    ? `${new Intl.NumberFormat('en-IN').format(vehicle.mileage)} km`
    : vehicle.mileage;

  return (
    <Link href={`/vehicle/${vehicle.id}`} className="block h-full">
      <article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300 h-full flex flex-col">
        <div className="relative aspect-[3/2] overflow-hidden bg-surface-variant flex-shrink-0">
          <img className="w-full h-full object-cover" data-alt={vehicle.imageAlt} src={vehicle.imageUrl} alt={vehicle.title} />
          {vehicle.isCertified && (
            <div className="absolute top-3 right-3 bg-verified-green text-surface-bright font-label-sm text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <span className="material-symbols-outlined text-[14px] text-surface-bright">workspace_premium</span>
              Verified
            </div>
          )}
        </div>
        <div className="p-stack-md flex flex-col gap-stack-sm flex-grow">
          <div className="flex justify-between items-start">
            <h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">{vehicle.title}</h2>
          </div>
          <p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">{formattedPrice}</p>
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            <span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">{formattedMileage}</span>
            <span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">{vehicle.fuelType}</span>
            <span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">{vehicle.transmission}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
