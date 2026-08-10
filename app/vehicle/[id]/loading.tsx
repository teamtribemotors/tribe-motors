import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Loading() {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col font-body-md animate-pulse">
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
        <section className="flex flex-col gap-stack-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-sm">
            <div>
              <div className="flex gap-2 mb-2">
                <div className="h-6 w-24 bg-surface rounded"></div>
                <div className="h-6 w-24 bg-surface rounded"></div>
              </div>
              <div className="h-12 w-64 md:w-96 bg-surface rounded"></div>
            </div>
            <div className="h-12 w-48 bg-surface rounded"></div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            <div className="w-full aspect-[16/9] bg-surface rounded-xl"></div>
          </div>
          <div className="flex flex-col gap-gutter">
            <div className="bg-surface rounded-xl h-64 w-full"></div>
            <div className="bg-surface rounded-xl h-64 w-full"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
