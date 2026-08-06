import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center font-body-md text-on-background antialiased relative overflow-hidden">


<div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{"backgroundImage":"radial-gradient(circle at 50% 50%, #6d281a 1px, transparent 1px)","backgroundSize":"32px 32px"}}></div>

<main className="w-full max-w-2xl px-margin-mobile md:px-margin-desktop py-stack-lg relative z-10 flex flex-col items-center">

<div className="bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/30 rounded-xl w-full p-8 md:p-12 flex flex-col items-center text-center ambient-shadow transition-transform duration-500 hover:scale-[1.01]">

<div className="relative mb-stack-md">
<div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center success-pulse">
<span className="material-symbols-outlined text-[48px] text-on-primary-container" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>

<span className="material-symbols-outlined absolute -top-2 -right-2 text-tertiary-container animate-bounce" data-icon="sparkle" style={{"animationDelay":"0.1s"}}>drive_file_rename_outline</span>
<span className="material-symbols-outlined absolute bottom-4 -left-4 text-tertiary-container animate-bounce" data-icon="sparkle" style={{"animationDelay":"0.3s","fontSize":"16px"}}>drive_file_rename_outline</span>
</div>

<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-stack-sm tracking-tight">
                Payment Successful!
            </h1>

<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto mb-stack-lg leading-relaxed">
                Your transaction has been securely processed. Your premium vehicle report will be sent to your WhatsApp shortly.
            </p>

<div className="w-full bg-surface-container-low rounded-lg p-6 mb-stack-lg border border-outline-variant/20 flex flex-col md:flex-row gap-stack-sm justify-between items-start md:items-center text-left">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Receipt ID</span>
<span className="font-label-bold text-label-bold text-on-background">#TM-8492-AX</span>
</div>
<div className="md:text-right">
<span className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Delivery</span>
<span className="font-label-bold text-label-bold text-on-background flex items-center gap-1 md:justify-end">
<span className="material-symbols-outlined text-[16px]" data-icon="chat">chat</span>
                        WhatsApp
                    </span>
</div>
</div>

<div className="flex flex-col sm:flex-row gap-base w-full sm:w-auto mt-auto">
<a className="inline-flex items-center justify-center px-8 py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg hover:bg-on-primary-fixed transition-colors duration-300 shadow-md" href="#">
                    Back to Listing
                </a>
<a className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-primary border-2 border-primary font-label-bold text-label-bold rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors duration-300" href="#">Browse More Cars</a>
</div>

<div className="mt-stack-md pt-stack-sm border-t border-outline-variant/30 w-full flex items-center justify-center gap-2 text-on-surface-variant opacity-80">
<span className="material-symbols-outlined text-[18px]" data-icon="lock">lock</span>
<span className="font-label-sm text-label-sm">Secure 256-bit Encryption</span>
</div>
</div>
</main>



    </div>
  );
}