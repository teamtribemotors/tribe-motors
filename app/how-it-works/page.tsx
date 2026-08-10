import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HowItWorks() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <Navbar />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-primary mb-stack-md text-center">How It Works</h1>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <section className="bg-surface rounded-xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">1. Browse Inventory</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Explore our wide selection of premium pre-owned vehicles. Each car is carefully vetted and listed with detailed specifications.
            </p>
          </section>

          <section className="bg-surface rounded-xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">2. Unlock Detailed Report</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              For a small fee, you can unlock a comprehensive inspection report and service history for any vehicle to ensure complete transparency before making a decision.
            </p>
          </section>

          <section className="bg-surface rounded-xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">3. Contact Dealer</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Found a car you love? Use our "Contact Dealer" feature to register your interest. Our staff will reach out to you promptly to arrange a viewing or test drive.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
