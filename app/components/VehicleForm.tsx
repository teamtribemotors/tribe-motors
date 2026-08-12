'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveVehicle } from '../staff/inventory/actions';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

export const vehicleSchema = z.object({
  id: z.string().optional(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1900, "Invalid year").max(2100, "Invalid year"),
  price: z.coerce.number().min(0, "Price must be positive"),
  mileage: z.coerce.number().min(0, "Mileage must be positive"),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  bodyType: z.string().min(1, "Body type is required"),
  owners: z.string().min(1, "Owners is required"),
  color: z.string().min(1, "Color is required"),
  isCertified: z.boolean().default(false),
  status: z.enum(['Draft', 'Live', 'Pending', 'Sold']),
  imageUrl: z.string().url("Invalid image URL"),
  imageAlt: z.string().min(1, "Image Alt is required"),
  description: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export default function VehicleForm({ initialData }: { initialData?: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema) as any,
    defaultValues: initialData || {
      status: 'Draft',
      isCertified: false,
      owners: '1st Owner',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      color: 'Black',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCin5fM3hME3Gke4YZYLcuVFT_G8lzTJmdUc683UYse4u13kiUqPe4UVlWx_0m1ewukmu5oFo2YCXMKNc6W8dsizEAagMWIRzNYB9u_jTxmK9Jh9UndGuZUVm9vs5AVxsIISX-pYIFsgvDaGf-AHkfwYkLiPN-4WgPJxeIPhWAAlIQkSTZEFnFU5vOevq8gv9qgPxJBDPI9kBxOJlnHjC_HyLGM6zye7XsjRB71Xf8gHrjYac_U5Qg',
      imageAlt: 'New Vehicle',
    },
  });

  const onSubmit = (data: any) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      const res = await saveVehicle(null, formData);
      if (res.success) {
        toast.success(res.message);
        router.push('/staff/inventory');
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl space-y-stack-md" id="vehicle-form">
        {initialData?.id && <input type="hidden" {...register('id')} />}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
          <div className="xl:col-span-2 space-y-stack-md">
            <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
              <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">directions_car</span>
                Basic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6">
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Make</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                    placeholder="e.g. Audi"
                    {...register('make')}
                  />
                  {errors.make && <p className="text-error text-sm mt-1">{errors.make.message}</p>}
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Model</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                    placeholder="e.g. Q5"
                    {...register('model')}
                  />
                  {errors.model && <p className="text-error text-sm mt-1">{errors.model.message}</p>}
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Year</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                    placeholder="YYYY"
                    type="number"
                    {...register('year')}
                  />
                  {errors.year && <p className="text-error text-sm mt-1">{errors.year.message}</p>}
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Body Type</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                    {...register('bodyType')}
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
              <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings_suggest</span>
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-gutter gap-y-6">
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Mileage (km)</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                    placeholder="e.g. 12450"
                    type="number"
                    {...register('mileage')}
                  />
                  {errors.mileage && <p className="text-error text-sm mt-1">{errors.mileage.message}</p>}
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Transmission</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                    {...register('transmission')}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="DCT">DCT</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Fuel Type</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                    {...register('fuelType')}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="EV">EV</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6 mt-6">
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Color</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface"
                    placeholder="e.g. Black"
                    {...register('color')}
                  />
                </div>
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Owners</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface bg-none"
                    {...register('owners')}
                  >
                    <option value="1st Owner">1st Owner</option>
                    <option value="2nd Owner">2nd Owner</option>
                    <option value="3rd Owner">3rd Owner</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Description</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor value={field.value || ''} onChange={field.onChange} />
                  )}
                />
              </div>
            </section>
          </div>

          <div className="space-y-stack-md">
            <section className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0_4px_24px_rgba(139,62,47,0.04)] border border-surface-container">
              <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Pricing & Status
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-2">Listing Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-on-surface-variant font-body-md">₹</span>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors font-body-md text-on-surface pl-8 text-lg font-bold text-primary"
                      placeholder="0"
                      type="number"
                      {...register('price')}
                    />
                  </div>
                  {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" {...register('isCertified')} />
                    <span className="font-label-bold text-label-bold text-on-surface">Tribe Certified</span>
                  </label>
                </div>

                <hr className="border-outline-variant" />
                <div>
                  <label className="block font-label-bold text-label-bold text-on-surface-variant mb-3">Inventory Status</label>
                  <div className="space-y-3">
                    {['Live', 'Draft', 'Pending', 'Sold'].map((s) => (
                      <label key={s} className="flex items-center gap-3 cursor-pointer p-3 rounded border border-outline-variant hover:border-primary transition-colors">
                        <input
                          className="text-primary focus:ring-primary border-outline"
                          type="radio"
                          value={s}
                          {...register('status')}
                        />
                        <span className="font-label-bold text-label-bold text-on-surface">{s}</span>
                      </label>
                    ))}
                  </div>
                  {errors.status && <p className="text-error text-sm mt-1">{errors.status.message}</p>}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Hidden inputs to preserve default image for now */}
        <input type="hidden" {...register('imageUrl')} />
        <input type="hidden" {...register('imageAlt')} />
        <button id="hidden-submit" type="submit" disabled={isPending} className="hidden" />
      </form>
    </>
  );
}
