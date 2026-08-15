'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveVehicle } from '../staff/inventory/actions';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { formatIndianCurrency } from '../utils';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

export const vehicleSchema = z.object({
  id: z.string().optional(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear(), "Year cannot be in the future"),
  price: z.coerce.number().min(0, "Price must be positive"),
  mileage: z.coerce.number().min(0, "Mileage must be positive"),
  distanceDriven: z.coerce.number().min(0, "Distance driven must be positive"),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  bodyType: z.string().min(1, "Body type is required"),
  owners: z.string().min(1, "Owners is required"),
  color: z.string().min(1, "Color is required"),
  colorHex: z.string().min(1, "Color Hex is required"),
  accidentalHistory: z.preprocess((val) => val === 'true' || val === true, z.boolean()),
  isCertified: z.boolean().default(false),
  status: z.enum(['Draft', 'Live', 'Pending', 'Sold']),
  imageUrl: z.string().url("Invalid image URL"),
  imageAlt: z.string().min(1, "Image Alt is required"),
  description: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export default function VehicleForm({ initialData }: { initialData?: any }) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema) as any,
    mode: 'onChange',
    defaultValues: initialData ? {
      ...initialData,
      accidentalHistory: String(initialData.accidentalHistory || false)
    } : {
      status: 'Draft',
      isCertified: false,
      accidentalHistory: 'false',
      owners: '1st Owner',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      color: '',
      colorHex: '#000000',
      imageUrl: '',
      imageAlt: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      distanceDriven: 0,
    },
  });

  const formValues = watch();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok && data.url) {
        setValue('imageUrl', data.url, { shouldValidate: true });
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch (err) {
      toast.error('An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

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

  const handleSaveDraft = () => {
      setValue('status', 'Draft');
      handleSubmit(onSubmit)();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[1600px] mx-auto pb-32" id="vehicle-form">
      {initialData?.id && <input type="hidden" {...register('id')} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-8 space-y-12">
            
            {/* Basic Information Section */}
            <section className="bg-surface rounded-2xl border border-outline-variant/30 p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <h3 className="font-headline-md text-headline-md mb-8 text-on-surface flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">directions_car</span>
                    Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Make</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            placeholder="e.g. Mercedes-Benz"
                            {...register('make')}
                        />
                        {errors.make && <p className="text-error text-sm mt-1">{errors.make.message as string}</p>}
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Model</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            placeholder="e.g. G-Class"
                            {...register('model')}
                        />
                        {errors.model && <p className="text-error text-sm mt-1">{errors.model.message as string}</p>}
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Year</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            {...register('year')}
                        >
                            <option value="">Select Year</option>
                            {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        {errors.year && <p className="text-error text-sm mt-1">{errors.year.message as string}</p>}
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Body Type</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            {...register('bodyType')}
                        >
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Specifications Section */}
            <section className="bg-surface rounded-2xl border border-outline-variant/30 p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <h3 className="font-headline-md text-headline-md mb-8 text-on-surface flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">tune</span>
                    Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Mileage (km/l or equivalent)</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            placeholder="0"
                            type="number"
                            {...register('mileage')}
                        />
                        {errors.mileage && <p className="text-error text-sm mt-1">{errors.mileage.message as string}</p>}
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Distance Driven (km)</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            placeholder="0"
                            type="number"
                            {...register('distanceDriven')}
                        />
                        {errors.distanceDriven && <p className="text-error text-sm mt-1">{errors.distanceDriven.message as string}</p>}
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Transmission</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            {...register('transmission')}
                        >
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="DCT">DCT</option>
                        </select>
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Fuel Type</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            {...register('fuelType')}
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Color</label>
                        <div className="flex items-center gap-3 w-full p-2 bg-surface-container-lowest border border-outline-variant rounded-xl focus-within:ring-1 focus-within:ring-primary focus-within:border-primary shadow-sm transition-all">
                            <input
                                type="color"
                                className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent flex-shrink-0"
                                value={watch('colorHex') || '#000000'}
                                onChange={(e) => setValue('colorHex', e.target.value, { shouldValidate: true })}
                            />
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-none focus:outline-none font-body-md text-body-md px-2"
                                placeholder="e.g. Phantom Black"
                                {...register('color')}
                            />
                        </div>
                        {errors.color && <p className="text-error text-sm mt-1">{errors.color.message as string}</p>}
                    </div>
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Owners</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            {...register('owners')}
                        >
                            <option value="1st Owner">1st Owner</option>
                            <option value="2nd Owner">2nd Owner</option>
                            <option value="3rd Owner">3rd Owner</option>
                        </select>
                    </div>
                    <div className="space-y-2 group/input md:col-span-2 pt-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary mb-3">Accidental History</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-3 cursor-pointer p-3 border border-outline-variant rounded-xl bg-surface-container-lowest hover:border-primary transition-all flex-1 justify-center">
                                <input type="radio" value="true" className="text-primary focus:ring-primary border-outline w-5 h-5" {...register('accidentalHistory')} />
                                <span className="font-label-md text-label-md text-on-surface">Yes</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer p-3 border border-outline-variant rounded-xl bg-surface-container-lowest hover:border-primary transition-all flex-1 justify-center">
                                <input type="radio" value="false" className="text-primary focus:ring-primary border-outline w-5 h-5" {...register('accidentalHistory')} />
                                <span className="font-label-md text-label-md text-on-surface">No</span>
                            </label>
                        </div>
                        {errors.accidentalHistory && <p className="text-error text-sm mt-1">{errors.accidentalHistory.message as string}</p>}
                    </div>
                </div>
            </section>

            {/* Description & Pricing Section */}
            <section className="bg-surface rounded-2xl border border-outline-variant/30 p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <h3 className="font-headline-md text-headline-md mb-8 text-on-surface flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">payments</span>
                    Description & Pricing
                </h3>
                
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 group/input">
                            <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Price (INR)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">₹</span>
                                <input
                                    className="w-full pl-10 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all text-lg font-bold text-primary"
                                    placeholder="0"
                                    type="number"
                                    {...register('price')}
                                />
                            </div>
                            {errors.price && <p className="text-error text-sm mt-1">{errors.price.message as string}</p>}
                        </div>

                        <div className="flex items-end pb-2">
                            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-outline-variant bg-surface-container-lowest hover:border-primary transition-colors shadow-sm w-full">
                                <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5" {...register('isCertified')} />
                                <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    Tribe Certified
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Description</label>
                        <div className="rounded-xl overflow-hidden border border-outline-variant shadow-sm">
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                <RichTextEditor value={field.value || ''} onChange={field.onChange} />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Media & Upload Section */}
            <section className="bg-surface rounded-2xl border border-outline-variant/30 p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <h3 className="font-headline-md text-headline-md mb-8 text-on-surface flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">photo_camera</span>
                    Media
                </h3>
                
                <div className="space-y-6">
                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Vehicle Image</label>
                        
                        <div className="relative w-full aspect-[3/1] bg-surface-container-lowest border-2 border-dashed border-outline-variant/60 hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden group/upload">
                            {watch('imageUrl') ? (
                                <>
                                    <img src={watch('imageUrl')} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-inverse-surface/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                                        <span className="material-symbols-outlined text-4xl mb-2">swap_horiz</span>
                                        <span className="font-label-md">Change Image</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6 pointer-events-none">
                                    <span className="material-symbols-outlined text-5xl text-primary/50 mb-3 group-hover/upload:scale-110 transition-transform">cloud_upload</span>
                                    <p className="font-label-md text-on-surface mb-1">Drag and drop or click to upload</p>
                                    <p className="font-body-sm text-on-surface-variant">Supports JPG, PNG, WEBP (Max 5MB)</p>
                                </div>
                            )}
                            
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        {isUploading && <p className="text-primary text-sm mt-2 font-label-sm animate-pulse">Uploading securely to cloud...</p>}
                        {errors.imageUrl && <p className="text-error text-sm mt-1">{errors.imageUrl.message as string}</p>}
                    </div>

                    <div className="space-y-2 group/input">
                        <label className="font-label-md text-label-md text-on-surface-variant block transition-colors group-focus-within/input:text-primary">Image Alt Text</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-sm transition-all"
                            placeholder="Describe the vehicle image for accessibility"
                            {...register('imageAlt')}
                        />
                        {errors.imageAlt && <p className="text-error text-sm mt-1">{errors.imageAlt.message as string}</p>}
                    </div>
                </div>
            </section>
        </div>

        {/* Right Column: Live Preview Sticky Card */}
        <div className="lg:col-span-4 sticky top-8">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Live Preview
            </h3>
            
            <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative">
                {formValues.isCertified && (
                    <div className="absolute top-4 right-4 z-10 bg-primary text-on-primary text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 backdrop-blur-md">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Certified
                    </div>
                )}
                
                <div className="aspect-[4/3] bg-surface-container flex items-center justify-center overflow-hidden relative">
                    {formValues.imageUrl ? (
                        <img src={formValues.imageUrl} alt={formValues.imageAlt || "Vehicle preview"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                        <div className="text-center text-on-surface-variant opacity-50 flex flex-col items-center">
                            <span className="material-symbols-outlined text-6xl mb-2">directions_car</span>
                            <span className="font-label-sm uppercase tracking-wider">No Image</span>
                        </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                            <p className="text-white/80 font-label-md text-sm drop-shadow-md">{formValues.make || 'Make'} {formValues.year || 'Year'}</p>
                            <h4 className="text-white font-headline-md text-xl drop-shadow-md line-clamp-1">{formValues.model || 'Model'}</h4>
                        </div>
                        <p className="text-white font-headline-sm drop-shadow-md">{formValues.price ? formatIndianCurrency(formValues.price) : '₹0'}</p>
                    </div>
                </div>
                
                <div className="p-5 grid grid-cols-2 gap-4 bg-surface relative z-10">
                    <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px] uppercase tracking-wider font-label-sm mb-1">Fuel</span>
                        <span className="text-on-surface font-body-md text-sm font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">local_gas_station</span>
                            {formValues.fuelType || '-'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px] uppercase tracking-wider font-label-sm mb-1">Transmission</span>
                        <span className="text-on-surface font-body-md text-sm font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">settings_applications</span>
                            {formValues.transmission || '-'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px] uppercase tracking-wider font-label-sm mb-1">Mileage</span>
                        <span className="text-on-surface font-body-md text-sm font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
                            {formValues.distanceDriven ? `${formValues.distanceDriven.toLocaleString()} km` : '-'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-on-surface-variant text-[10px] uppercase tracking-wider font-label-sm mb-1">Ownership</span>
                        <span className="text-on-surface font-body-md text-sm font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                            {formValues.owners || '-'}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                <p className="text-sm font-body-sm text-on-surface-variant leading-relaxed">This preview represents exactly how the vehicle will appear in the customer-facing catalogue. Ensure lighting is good and information is accurate.</p>
            </div>
        </div>
      </div>

      {/* Hidden Fields */}
      <input type="hidden" {...register('imageUrl')} />
      <input type="hidden" {...register('colorHex')} />

      {/* Status & Action Bar - Glassmorphic Fixed Footer */}
      <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-inverse-surface/95 backdrop-blur-md border-t border-inverse-surface p-4 md:p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)] z-40 transition-all">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
            <label className="font-label-md text-label-md text-inverse-on-surface/70">Visibility Status:</label>
            <div className="relative">
                <select 
                    className="appearance-none bg-inverse-surface border border-inverse-on-surface/20 text-inverse-on-surface py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-primary font-label-md text-label-md shadow-sm cursor-pointer"
                    {...register('status')}
                >
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Live">Live (Public)</option>
                    <option value="Sold">Sold (Archived)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-inverse-on-surface/50 pointer-events-none text-sm">expand_more</span>
            </div>
            {errors.status && <p className="text-error text-sm mt-1">{errors.status.message as string}</p>}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
                onClick={handleSaveDraft}
                disabled={isPending}
                className="flex-1 md:flex-none px-6 py-3 border border-inverse-on-surface/20 text-inverse-on-surface hover:bg-white/10 font-label-md text-label-md rounded-xl transition-all text-center disabled:opacity-50" 
                type="button"
            >
                Save Draft
            </button>
            <button 
                disabled={isPending}
                className="flex-1 md:flex-none px-10 py-3 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-md text-label-md rounded-xl transition-all shadow-[0_4px_14px_0_rgba(176,38,0,0.39)] text-center disabled:opacity-50 disabled:shadow-none relative overflow-hidden group" 
                type="submit"
            >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <span className="relative flex items-center gap-2">
                    {initialData?.id ? 'Save Changes' : 'Publish Vehicle'}
                    {isPending ? <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">rocket_launch</span>}
                </span>
            </button>
        </div>
      </div>
    </form>
  );
}
