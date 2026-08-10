import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Loading() {
  return (
    <div className="text-on-background antialiased min-h-screen flex flex-col font-body-md animate-pulse">
      <Navbar />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface p-stack-md rounded-xl h-[600px] w-full"></div>
        </aside>

        <section className="flex-grow">
          <div className="flex justify-between items-end mb-stack-md">
            <div>
              <div className="h-10 bg-surface rounded w-64 mb-2"></div>
              <div className="h-5 bg-surface rounded w-48"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl h-80 w-full"></div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
