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

const STEPS = [
  { id: 1, title: 'Details' },
  { id: 2, title: 'Description & Pricing' },
  { id: 3, title: 'Media & Upload' }
];

export default function VehicleForm({ initialData }: { initialData?: any }) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema) as any,
    mode: 'onTouched',
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
    },
  });

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

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['make', 'model', 'year', 'bodyType', 'mileage', 'distanceDriven', 'transmission', 'fuelType', 'color', 'colorHex', 'owners', 'accidentalHistory'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['description', 'price', 'isCertified', 'status'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1280px] mx-auto space-y-md" id="vehicle-form">
      {initialData?.id && <input type="hidden" {...register('id')} />}

      {/* Wizard Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-outline-variant/30 z-0 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 rounded-full transition-all duration-300" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}></div>
            
            {STEPS.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        currentStep >= step.id ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/50'
                    }`}>
                        {currentStep > step.id ? <span className="material-symbols-outlined text-[20px]">check</span> : step.id}
                    </div>
                    <span className={`mt-2 font-label-sm absolute -bottom-6 whitespace-nowrap ${currentStep >= step.id ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{step.title}</span>
                </div>
            ))}
        </div>
      </div>

      <div className="pt-8">
        {/* Step 1: Basic Information & Specs */}
        {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <section className="bg-surface rounded-lg border border-outline-variant/30 p-md shadow-sm">
                    <h3 className="font-headline-md text-headline-md mb-6 pb-2 border-b border-outline-variant/30 text-on-surface">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Make</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            placeholder="e.g. Mercedes-Benz"
                            {...register('make')}
                        />
                        {errors.make && <p className="text-error text-sm mt-1">{errors.make.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Model</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            placeholder="e.g. G-Class"
                            {...register('model')}
                        />
                        {errors.model && <p className="text-error text-sm mt-1">{errors.model.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Year</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            {...register('year')}
                        >
                            <option value="">Select Year</option>
                            {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        {errors.year && <p className="text-error text-sm mt-1">{errors.year.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Body Type</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            {...register('bodyType')}
                        >
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                        </select>
                        </div>
                    </div>
                </section>

                <section className="bg-surface rounded-lg border border-outline-variant/30 p-md shadow-sm mb-32">
                    <h3 className="font-headline-md text-headline-md mb-6 pb-2 border-b border-outline-variant/30 text-on-surface">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Mileage (km/l or equivalent)</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            placeholder="0"
                            type="number"
                            {...register('mileage')}
                        />
                        {errors.mileage && <p className="text-error text-sm mt-1">{errors.mileage.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Distance Driven (km)</label>
                        <input
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            placeholder="0"
                            type="number"
                            {...register('distanceDriven')}
                        />
                        {errors.distanceDriven && <p className="text-error text-sm mt-1">{errors.distanceDriven.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Transmission</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            {...register('transmission')}
                        >
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="DCT">DCT</option>
                        </select>
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Fuel Type</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            {...register('fuelType')}
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Color</label>
                        <div className="flex items-center gap-3 w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus-within:ring-1 focus-within:ring-primary focus-within:border-primary shadow-sm">
                            <input
                                type="color"
                                className="h-8 w-8 rounded cursor-pointer border-0 p-0 bg-transparent flex-shrink-0"
                                value={watch('colorHex') || '#000000'}
                                onChange={(e) => setValue('colorHex', e.target.value, { shouldValidate: true })}
                            />
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-none focus:outline-none font-body-md text-body-md p-0"
                                placeholder="e.g. Phantom Black"
                                {...register('color')}
                            />
                        </div>
                        {errors.color && <p className="text-error text-sm mt-1">{errors.color.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Owners</label>
                        <select
                            className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                            {...register('owners')}
                        >
                            <option value="1st Owner">1st Owner</option>
                            <option value="2nd Owner">2nd Owner</option>
                            <option value="3rd Owner">3rd Owner</option>
                        </select>
                        </div>
                        <div className="space-y-2">
                        <label className="font-label-md text-label-md text-on-surface-variant block">Accidental History</label>
                        <div className="flex gap-4 mt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" value="true" className="text-primary focus:ring-primary border-outline w-5 h-5" {...register('accidentalHistory')} />
                                <span className="font-label-md text-label-md text-on-surface">Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" value="false" className="text-primary focus:ring-primary border-outline w-5 h-5" {...register('accidentalHistory')} />
                                <span className="font-label-md text-label-md text-on-surface">No</span>
                            </label>
                        </div>
                        {errors.accidentalHistory && <p className="text-error text-sm mt-1">{errors.accidentalHistory.message as string}</p>}
                        </div>
                    </div>
                </section>
            </div>
        )}

        {/* Step 2: Description & Pricing */}
        {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                <section className="bg-surface rounded-lg border border-outline-variant/30 p-md shadow-sm">
                    <h3 className="font-headline-md text-headline-md mb-6 pb-2 border-b border-outline-variant/30 text-on-surface">Description</h3>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                        <RichTextEditor value={field.value || ''} onChange={field.onChange} />
                        )}
                    />
                </section>
                <section className="bg-surface rounded-lg border border-outline-variant/30 p-md shadow-sm mb-32">
                    <h3 className="font-headline-md text-headline-md mb-6 pb-2 border-b border-outline-variant/30 text-on-surface">Pricing & Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-label-md text-label-md text-on-surface-variant block">Price (INR)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">₹</span>
                                <input
                                    className="w-full pl-8 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm text-lg font-bold text-primary"
                                    placeholder="0"
                                    type="number"
                                    {...register('price')}
                                />
                            </div>
                            {errors.price && <p className="text-error text-sm mt-1">{errors.price.message as string}</p>}
                        </div>

                        <div>
                        <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-outline-variant bg-surface-container-lowest hover:border-primary transition-colors shadow-sm">
                            <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5" {...register('isCertified')} />
                            <span className="font-label-md text-label-md text-on-surface">Tribe Certified</span>
                        </label>
                        </div>
                    </div>
                </section>
            </div>
        )}

        {/* Step 3: Media & Upload */}
        {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                <section className="bg-surface rounded-lg border border-outline-variant/30 p-md shadow-sm mb-32">
                    <h3 className="font-headline-md text-headline-md mb-6 pb-2 border-b border-outline-variant/30 text-on-surface">Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface-variant block">Vehicle Image</label>
                                {watch('imageUrl') && (
                                <div className="mb-4 aspect-[3/2] rounded-lg overflow-hidden bg-surface-variant relative shadow-sm border border-outline-variant/30">
                                    <img src={watch('imageUrl')} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                    className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:opacity-90"
                                />
                                {isUploading && <p className="text-primary text-sm mt-2 font-label-sm">Uploading...</p>}
                                {errors.imageUrl && <p className="text-error text-sm mt-1">{errors.imageUrl.message as string}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="font-label-md text-label-md text-on-surface-variant block">Image Alt Text</label>
                                <input
                                    className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-body-md text-body-md shadow-sm"
                                    placeholder="Describe the vehicle image"
                                    {...register('imageAlt')}
                                />
                                {errors.imageAlt && <p className="text-error text-sm mt-1">{errors.imageAlt.message as string}</p>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )}
      </div>

      {/* Hidden Fields */}
      <input type="hidden" {...register('imageUrl')} />
      <input type="hidden" {...register('colorHex')} />

      {/* Status & Action Bar */}
      <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-surface border-t border-outline-variant p-4 md:p-6 flex flex-col md:flex-row items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
            {currentStep === 3 && (
                <>
                    <label className="font-label-md text-label-md text-on-surface-variant">Status:</label>
                    <select 
                        className="p-2 bg-surface-container-lowest border border-outline-variant rounded focus:outline-none focus:border-primary font-label-md text-label-md"
                        {...register('status')}
                    >
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Live">Live</option>
                        <option value="Sold">Sold</option>
                    </select>
                    {errors.status && <p className="text-error text-sm mt-1">{errors.status.message as string}</p>}
                </>
            )}
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
            {currentStep > 1 && (
                <button 
                    onClick={prevStep}
                    disabled={isPending}
                    className="flex-1 md:flex-none px-6 py-3 bg-surface-container-highest text-on-surface hover:bg-surface-variant font-label-md text-label-md rounded transition-colors text-center disabled:opacity-50" 
                    type="button"
                >
                    Back
                </button>
            )}
            {currentStep < 3 ? (
                <button 
                    onClick={nextStep}
                    className="flex-1 md:flex-none px-8 py-3 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded transition-colors shadow-sm text-center" 
                    type="button"
                >
                    Next Step
                </button>
            ) : (
                <>
                    <button 
                        onClick={handleSaveDraft}
                        disabled={isPending}
                        className="flex-1 md:flex-none px-6 py-3 border border-inverse-surface text-inverse-surface hover:bg-inverse-surface/5 font-label-md text-label-md rounded transition-colors text-center disabled:opacity-50" 
                        type="button"
                    >
                        Save Draft
                    </button>
                    <button 
                        disabled={isPending}
                        className="flex-1 md:flex-none px-8 py-3 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md rounded transition-colors shadow-sm text-center disabled:opacity-50" 
                        type="submit"
                    >
                        {initialData?.id ? 'Save Changes' : 'Publish Vehicle'}
                    </button>
                </>
            )}
        </div>
      </div>
    </form>
  );
}
