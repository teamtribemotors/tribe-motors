import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="docked w-full top-0 z-50 sticky shadow-md bg-[#0A0A0A]">
      <div className="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto relative">
        <div className="w-1/3 flex justify-start">
          <Link className="font-headline-md text-headline-md font-bold text-[#8b3e2f] hover:text-[#6d281a] transition-colors" href="/">
            Tribe Motors
          </Link>
        </div>
        
        <nav className="hidden md:flex justify-center w-1/3 gap-8">
          <Link className="font-label-bold text-label-bold text-gray-400 hover:text-white transition-colors duration-150 ease-in-out uppercase tracking-wider text-sm" href="/browse">Browse Cars</Link>
          <Link className="font-label-bold text-label-bold text-gray-400 hover:text-white transition-colors duration-150 ease-in-out uppercase tracking-wider text-sm" href="/how-it-works">How it Works</Link>
        </nav>

        <div className="w-1/3 flex justify-end items-center gap-base">
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
