import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="docked w-full top-0 z-50 sticky shadow-sm bg-surface">
      <div className="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto">
        <Link className="font-headline-md text-headline-md font-bold text-primary" href="/">
          Tribe Motors
        </Link>
        <nav className="hidden md:flex gap-gutter">
          <Link className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary hover:opacity-80 transition-opacity scale-95 duration-150 ease-in-out" href="/browse">Browse Cars</Link>
          <Link className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary hover:opacity-80 transition-opacity scale-95 duration-150 ease-in-out" href="/how-it-works">How it Works</Link>
        </nav>
        <div className="flex items-center gap-base">
          <button className="md:hidden text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
