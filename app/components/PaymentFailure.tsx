import Link from 'next/link';
import { type InferSelectModel } from 'drizzle-orm';
import { vehicles } from '../../db/schema';

type Vehicle = InferSelectModel<typeof vehicles>;

interface PaymentFailureProps {
  vehicle: Vehicle;
  transactionId?: string;
  date?: string;
}

export default function PaymentFailure({ vehicle, transactionId, date }: PaymentFailureProps) {
  const displayDate = date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const displayTxId = transactionId || `#TM-${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased w-full">
      {/* Minimal Header */}
      <header className="w-full py-stack-md px-margin-mobile md:px-margin-desktop flex justify-center items-center border-b border-surface-variant/30">
        <Link href="/" className="w-48 h-12 relative flex items-center justify-center">
          <img alt="Tribe Motors Logo" className="h-full w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaK8QXe-Z6CD4gwWPg7P784-qjITkebsO_YL0CRim4H7nZvFw7kAU4J3WVfeY9zbtvTIS9oRs7NfZUWPUNKHXc_b0nzm-7gRYNQMbIAVhmEOOrvykyavl5i916dhhpRhOVo_yz_3FG7qbFAXAFRaUplAaAq_r50I2GWwFuRKpu0ilJ_VD6ZYIqlZju_fT4pFMB0Bj-xCK9vlYvCn9GPYQYePz7nmbpCcNzgyDuuTvd7b3EFLzJ7VBfFhAgCYPefcAgtFQ"/>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-stack-xl">
        <div className="max-w-[600px] w-full flex flex-col items-center text-center space-y-stack-lg">
          
          {/* Failure State */}
          <div className="flex flex-col items-center space-y-stack-md animate-[fadeIn_0.5s_ease-out]">
            <div className="w-20 h-20 bg-error-container/30 rounded-full flex items-center justify-center mb-stack-sm">
              <span className="material-symbols-outlined text-[48px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Payment Failed</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[400px]">
              We couldn't process your payment. No charges were made to your account.
            </p>
          </div>

          {/* Transaction Summary Card */}
          <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md shadow-[0_4px_24px_rgba(41,23,19,0.03)] text-left flex flex-col gap-stack-sm">
            <div className="flex justify-between items-center py-stack-sm border-b border-surface-variant/50">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Vehicle</span>
              <span className="font-body-md text-body-md font-semibold text-on-background">{vehicle.year} {vehicle.make} {vehicle.model}</span>
            </div>
            <div className="flex justify-between items-center py-stack-sm border-b border-surface-variant/50">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Amount Due</span>
              <span className="font-body-md text-body-md font-semibold text-on-background">₹2,499</span>
            </div>
            <div className="flex justify-between items-center py-stack-sm border-b border-surface-variant/50">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Transaction ID</span>
              <span className="font-body-md text-body-md font-mono text-on-background">{displayTxId}</span>
            </div>
            <div className="flex justify-between items-center py-stack-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date</span>
              <span className="font-body-md text-body-md text-on-background">{displayDate}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-surface-container-low rounded-lg p-stack-md border border-surface-variant/50 max-w-[500px]">
            <div className="flex items-start gap-stack-sm">
              <span className="material-symbols-outlined text-primary mt-1" data-icon="info">info</span>
              <p className="font-body-md text-body-md text-on-surface text-left leading-relaxed">
                Please check your payment details and try again, or use a different payment method. If the problem persists, contact our support team.
              </p>
            </div>
          </div>

          {/* Primary Action */}
          <div className="pt-stack-sm w-full sm:w-auto">
            <Link href={`/vehicle/${vehicle.id}/unlock-report`} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md h-[48px] px-stack-xl rounded transition-colors duration-200 flex items-center justify-center gap-1 shadow-[0_4px_12px_rgba(176,38,0,0.15)]">
              <span className="material-symbols-outlined text-[20px]" data-icon="refresh">refresh</span>
              Try Again
            </Link>
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center gap-stack-md border-t border-surface-variant/30">
        <div className="w-32 h-8 relative opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <img alt="Tribe Motors Logo Faded" className="h-full w-auto object-contain mx-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu1YE2QiCA9ajGbRCgF5i70fKl2-QgpdB6EEzK_wzSw40wnHO73mcfXQ-e0ngh0ct4a0US4smeKyjxTg8qSjG-TyXKsBJcDm7i_9Z6M77TBsJAVQLyTcwH3qTg7FY8RrQOa2eIdjdyLFTurVRE05Z7wkelJAwrtXcxt0CgQqMwWObSLTFiibTxWTOPdz0muxIyqBDRpBNzOYCEz5HePYjQNSAkE7NPkT17_m3sYz0NP0ttbU081qX-3ZRt2c_JGtGG91I"/>
        </div>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors underline decoration-surface-variant/50 underline-offset-4" href="#">Need help? Contact support</a>
      </footer>
    </div>
  );
}
