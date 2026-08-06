import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export default function Page() {
  return (
    <div className="text-on-background font-body-md antialiased min-h-screen flex flex-col">


<Navbar />
<main className="flex-grow">

<section className="relative pt-stack-lg pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
<div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{"backgroundImage":"radial-gradient(#6d281a 1px, transparent 1px)","backgroundSize":"24px 24px"}}></div>
<div className="relative z-10 max-w-3xl mx-auto text-center mt-12 mb-16">
<h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-stack-md leading-tight">
                     Verified, Transparent Pre-Owned Cars in Visakhapatnam.
                 </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                     Experience a premium concirege approach to buying your next vehicle. Every car meticulously inspected, fully documented, and community-backed.
                 </p>
</div>

<div className="relative z-20 max-w-4xl mx-auto bg-surface-container-lowest rounded-xl ambient-shadow-strong p-2 border border-surface-variant">
<form className="flex flex-col md:flex-row gap-2">
<div className="flex-1 relative group">
<label className="absolute top-2 left-4 text-xs font-label-bold text-outline uppercase tracking-wider" htmlFor="make">Make</label>
<select className="w-full h-16 pt-6 pb-2 pl-4 pr-10 bg-transparent border-none rounded-lg text-on-surface focus:ring-2 focus:ring-primary appearance-none outline-none font-body-md cursor-pointer transition-colors group-hover:bg-surface-container-low" id="make">
<option value="">Any Make</option>
<option value="toyota">Toyota</option>
<option value="honda">Honda</option>
<option value="hyundai">Hyundai</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<div className="w-px bg-surface-variant hidden md:block my-2"></div>
<div className="flex-1 relative group">
<label className="absolute top-2 left-4 text-xs font-label-bold text-outline uppercase tracking-wider" htmlFor="model">Model</label>
<select className="w-full h-16 pt-6 pb-2 pl-4 pr-10 bg-transparent border-none rounded-lg text-on-surface focus:ring-2 focus:ring-primary appearance-none outline-none font-body-md cursor-pointer transition-colors group-hover:bg-surface-container-low" id="model">
<option value="">Any Model</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<div className="w-px bg-surface-variant hidden md:block my-2"></div>
<div className="flex-1 relative group">
<label className="absolute top-2 left-4 text-xs font-label-bold text-outline uppercase tracking-wider" htmlFor="price">Max Price</label>
<select className="w-full h-16 pt-6 pb-2 pl-4 pr-10 bg-transparent border-none rounded-lg text-on-surface focus:ring-2 focus:ring-primary appearance-none outline-none font-body-md cursor-pointer transition-colors group-hover:bg-surface-container-low" id="price">
<option value="">No Limit</option>
<option value="500000">₹5,00,000</option>
<option value="1000000">₹10,00,000</option>
<option value="2000000">₹20,00,000</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<button className="md:w-auto w-full h-16 px-8 bg-primary text-on-primary font-label-bold text-label-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined">search</span>
                         Search Inventory
                     </button>
</form>
</div>
</section>

<section className="border-y border-surface-variant bg-surface-container-low py-8">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4 text-center">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<span className="font-headline-md text-headline-md text-on-surface text-lg">Every car inspected</span>
</div>
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>history</span>
</div>
<span className="font-headline-md text-headline-md text-on-surface text-lg">Full service history</span>
</div>
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>groups</span>
</div>
<span className="font-headline-md text-headline-md text-on-surface text-lg">Community-backed</span>
</div>
</div>
</section>

<section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
<div className="flex justify-between items-end mb-stack-md">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Featured Vehicles</h2>
<Link className="font-label-bold text-label-bold text-primary hover:underline flex items-center gap-1" href="/">
                    View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<article className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
<div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A pristine, deep red premium sedan parked on a sleek, polished concrete showroom floor. The lighting is soft and high-key, creating an elegant glow that highlights the car's curves. The background is a minimalist, warm cream space with subtle architectural lines, embodying a sophisticated, trustworthy, and high-end automotive marketplace aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2eiilkknlCEMEeJb45xRZhtDb3vMHE_iyhgMIYrXEIEdhMGsCLICKq2fVZp8tjV31pSQb7uoXeWeySBvvgN-wS560ptqFMZZxZJzMdMzn3ONGZ7stv9KRNA2uT85fwt4s0sm0pbbBNGHvllcaoLX_i3Isxi_PLdz_FFd1Bc5SAJUh0owWHH6mIBe8aeXtJb17UXJ7BXbzb0v9NjhU-i5dA0zBUyD1rGuJ8hP3h_zA8TT9L1UtbAk" />
<div className="absolute top-4 left-4 bg-[#228B22] text-white font-label-sm text-label-sm px-3 py-1 rounded shadow-md flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"color":"#D4AF37","fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
                            Tribe Certified
                        </div>
</div>
<div className="p-6 flex flex-col flex-grow">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1">2021 Toyota Camry Hybrid</h3>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold mb-4">₹24,50,000</p>
<div className="flex flex-wrap gap-2 mb-6 mt-auto">
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">24,000 km</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">Hybrid</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">1st Owner</span>
</div>
<button className="w-full py-3 bg-transparent border-2 border-primary text-primary font-label-bold text-label-bold rounded hover:bg-primary hover:text-on-primary transition-colors">
                            View Details
                        </button>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
<div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A luxurious forest green SUV showcased in a bright, modern studio setting. The lighting is warm and diffused, reflecting off the metallic paint to suggest high quality and reliability. The environment uses warm cream tones and subtle shadows, fitting a premium, trustworthy pre-owned vehicle brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEMXxw4XyPdv4dolyY1qAs2EKUccIYqaRnfK73SshpKxTpalR_imJnmfr8tg6FoLG7PbZUfTHZ3vmVCfdhLnvrFwsvzQertcySr8UqdYOzewJ0Loq9jX8hXiO5fOWuX44WHx2H0RkDA89bQzWtIYnGfu928ISfp9hSa6NEYQU83tn_awGutXFDY6F88fBPVZol-RO2QrLA1WfAZhQyPnCirEbYwFZNimOvS8JO3tjxaGgeAV_AuMc" />
</div>
<div className="p-6 flex flex-col flex-grow">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1">2019 Honda CR-V</h3>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold mb-4">₹18,75,000</p>
<div className="flex flex-wrap gap-2 mb-6 mt-auto">
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">42,500 km</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">Petrol</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
<button className="w-full py-3 bg-transparent border-2 border-primary text-primary font-label-bold text-label-bold rounded hover:bg-primary hover:text-on-primary transition-colors">
                            View Details
                        </button>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
<div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A sleek, modern silver hatchback gleaming under soft, premium showroom lighting. The background features tactile, warm cream walls and a polished wood floor section, conveying a sense of heritage, trust, and premium concierge service in a high-end automotive marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXFeBws8tN__gUrqcfqmbkUVlgiR2Kxp5X8_MdTuXM8CsKhlnangcU8HMBuoib2uK4R2Xt2JFmtB1RglPw0Z4s2uahZ5WDPw7nX4cJhUY0Y1SZvP7w2y-7oJAw4Owttj0wKe5LM1j-Xywoi9sAvsQnoWJkPhvBSj1xPsas4BXXsV_lkrSHYqR8aMmDLs-0lDbKZapznD9RnB1VXXuStGRuuzty-TlhfVM1_QR6sKOf9_AjvR1KYrs" />
<div className="absolute top-4 left-4 bg-[#228B22] text-white font-label-sm text-label-sm px-3 py-1 rounded shadow-md flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"color":"#D4AF37","fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
                            Tribe Certified
                        </div>
</div>
<div className="p-6 flex flex-col flex-grow">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1">2022 Hyundai i20 N Line</h3>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold mb-4">₹10,50,000</p>
<div className="flex flex-wrap gap-2 mb-6 mt-auto">
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">15,000 km</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">Petrol</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">DCT</span>
<span className="bg-surface text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">1st Owner</span>
</div>
<button className="w-full py-3 bg-transparent border-2 border-primary text-primary font-label-bold text-label-bold rounded hover:bg-primary hover:text-on-primary transition-colors">
                            View Details
                        </button>
</div>
</article>
</div>
</section>
</main>

<Footer />



    </div>
  );
}