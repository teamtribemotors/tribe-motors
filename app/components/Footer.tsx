import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#27282C] w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-stack-lg w-full max-w-[1280px] mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img alt="Tribe Motors Logo" className="h-8 object-contain filter grayscale brightness-200 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3rDwTLkuvA3jh_kSzID1gUgAst1MCqnGvmf6ekAv7KfaYDuA-yGlcZFIa19GwoZnhMZZIYi2GL6-VBQqqrQ0WJpPOpEhgKUzuL6z1CxoZWhjC91iLwieQKSkhxjoGiEqRvBPyA3z0DrPe4zrFcdT335AlMBbkZjzwklGOMByM7e1pz9smfp3uoH6skxCE5x8Pm-LIU9b9cFgcmoTxB7ERlRs6kzV9HLvgZFoCjNBALL8Px4dAOoSO1eQRPsOzwRVc6PU" />
          <p className="font-body-md text-body-md text-surface-variant text-center md:text-left max-w-xs">Premium Automotive Concierge. Visakhapatnam, India.</p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary transition-colors" href="/">Privacy Policy</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary transition-colors" href="/">Terms of Service</Link>
          <Link className="font-body-md text-body-md text-surface-variant hover:text-primary transition-colors" href="/">Cookie Policy</Link>
          <a className="font-body-md text-body-md text-surface-variant hover:text-primary transition-colors" href="mailto:support@tribemotors.com">Support</a>
        </nav>
      </div>
      <div className="border-t border-on-secondary-fixed-variant py-6 text-center">
        <p className="font-body-md text-label-sm text-surface-variant">© 2024 Tribe Motors. Premium Automotive Concierge.</p>
      </div>
    </footer>
  );
}
