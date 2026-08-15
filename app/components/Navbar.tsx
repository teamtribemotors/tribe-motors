import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-inverse-surface shadow-sm w-full">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img alt="Tribe Motors Logo" className="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu9LY84Ic1lzl-mMXLslWeJDWmrvoULEwL6cDwt6OFSUNJXKX0hmcQQGZR_Ajh-KmNSS350HAiaIFmAXE0amPO47tAhSN5iziu5DvWx_sl5Wr3KXYg8ybDiSITI-C46xuvmolUIW30qfu5QrxuawrPo3FyrKAZvL000_VhBp3Azm6fl3b5tbb6iTxfwddHA8FfYtNVaENnuP7dPQAUr7g0FpI14zbdDLOw-rclsj07Db4UWwSdEt8iUTOcKUvDnOFgnRc" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="/browse">Inventory</Link>
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="#">About</Link>
          <Link className="text-surface-variant font-label-md text-label-md hover:text-primary transition-colors duration-200" href="#">Contact</Link>
        </nav>
        <button className="bg-primary hover:bg-surface-tint text-on-primary font-label-md text-label-md px-6 py-3 rounded active:scale-95 transition-transform hidden md:block">
          Sign In
        </button>
        <button className="md:hidden text-surface-variant p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
