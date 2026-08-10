import StaffSidebar from '../../components/StaffSidebar';

export default function Loading() {
  return (
    <div className="bg-background text-on-background h-screen overflow-hidden flex font-body-md animate-pulse">
      <StaffSidebar />

      <main className="flex-1 overflow-y-auto bg-background relative z-0 ml-64 p-margin-desktop">
        <header className="mb-stack-lg flex justify-between items-end">
          <div>
            <div className="h-10 w-64 bg-surface rounded mb-2"></div>
            <div className="h-5 w-96 bg-surface rounded"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter pb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl h-80 w-full"></div>
          ))}
        </div>
      </main>
    </div>
  );
}
