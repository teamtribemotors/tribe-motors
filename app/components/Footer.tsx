import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="full-width bg-primary dark:bg-primary-container mt-stack-lg flex flex-col items-center gap-base py-stack-lg px-margin-desktop w-full">
      <div className="font-headline-md text-headline-md font-bold text-on-primary dark:text-on-primary-container mb-4">
        Tribe Motors
      </div>
      <nav className="flex flex-wrap justify-center gap-6 mb-4">
        <Link className="font-label-sm text-label-sm text-on-primary-container opacity-80 hover:opacity-100 hover:underline decoration-secondary-fixed transition-all duration-300" href="/">Privacy Policy</Link>
        <Link className="font-label-sm text-label-sm text-on-primary-container opacity-80 hover:opacity-100 hover:underline decoration-secondary-fixed transition-all duration-300" href="/">Terms of Service</Link>
      </nav>
      <p className="font-body-md text-body-md text-on-primary dark:text-on-primary-container opacity-60 text-center">
        © 2024 Tribe Motors. Premium Pre-Owned Excellence.
      </p>
    </footer>
  );
}
