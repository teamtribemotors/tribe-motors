import StaffSidebar from '../../components/StaffSidebar';

export default function SettingsPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex selection:bg-primary-fixed selection:text-on-primary-fixed">
      <StaffSidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Settings</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage portal settings and configurations.</p>
          </div>
        </header>

        <section className="bg-surface-container rounded-2xl shadow-sm border border-outline-variant p-8">
          <p className="text-on-surface-variant">Settings configuration coming soon...</p>
        </section>
      </main>
    </div>
  );
}
