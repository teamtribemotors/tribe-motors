import React from 'react';

interface StaffHeaderProps {
  title: string;
  icon?: string;
}

export default function StaffHeader({ title, icon }: StaffHeaderProps) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-outline-variant/30 bg-surface-bright px-8 py-3 z-40 relative">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-on-surface">
          {icon && (
            <div className="size-6 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
            </div>
          )}
          <h2 className="text-on-surface text-xl font-bold font-headline-md tracking-tight">{title}</h2>
        </div>
        <label className="flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-outline flex border-none bg-surface-container-low items-center justify-center pl-4 rounded-l-lg">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 border-none bg-surface-container-low text-on-surface focus:ring-0 rounded-r-lg px-4 font-body-md text-sm placeholder:text-outline outline-none" 
              placeholder="Search" 
            />
          </div>
        </label>
      </div>
      <div className="flex gap-4">
        <button className="flex items-center justify-center rounded-lg size-10 bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        <button className="flex items-center justify-center rounded-lg size-10 bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[20px]">account_circle</span>
        </button>
      </div>
    </header>
  );
}
