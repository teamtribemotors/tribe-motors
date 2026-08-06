import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="docked full-width top-0 z-50 sticky shadow-sm dark:shadow-none bg-surface dark:bg-on-background">
      <div className="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto">
        <Link className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim" href="/">
          Tribe Motors
        </Link>
        <nav className="hidden md:flex gap-gutter">
          <Link className="font-label-bold text-label-bold text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim hover:opacity-80 transition-opacity scale-95 duration-150 ease-in-out" href="/browse">Browse Cars</Link>
          <Link className="font-label-bold text-label-bold text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim hover:opacity-80 transition-opacity scale-95 duration-150 ease-in-out" href="/">How it Works</Link>
        </nav>
        <div className="flex items-center gap-base">
          <button className="md:hidden text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <button className="hidden md:inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-6 py-2 rounded font-bold hover:opacity-80 transition-opacity">
            <Link href="/staff">Sign In</Link>
          </button>
        </div>
      </div>
    </header>
  );
}
