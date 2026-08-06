export default function Page() {
  return (
    <div className="text-on-background antialiased min-h-screen flex flex-col font-body-md">


<nav className="bg-surface shadow-sm sticky top-0 z-50">
<div className="flex justify-between items-center px-margin-desktop h-20 w-full max-w-container-max mx-auto">
<div className="flex items-center gap-gutter">
<a className="font-headline-md text-headline-md font-bold text-primary" href="#">Tribe Motors</a>
<div className="hidden md:flex gap-gutter items-center">
<a className="font-label-bold text-label-bold text-primary border-b-2 border-primary pb-1" href="#">Browse Cars</a>
<a className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary hover:opacity-80 transition-opacity" href="#">How it Works</a>

</div>
</div>
<div className="flex items-center gap-stack-sm">
<button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full">
<span className="material-symbols-outlined" data-icon="search">search</span>
</button>
<a className="font-label-bold text-label-bold text-primary hover:opacity-80 transition-opacity" href="#">Sign In</a>
</div>
</div>
</nav>
<main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-64 flex-shrink-0">
<div className="bg-surface p-stack-md rounded-xl ambient-shadow sticky top-28">
<div className="flex items-center justify-between mb-stack-md border-b border-outline-variant pb-stack-sm">
<h2 className="font-headline-md text-headline-md text-on-background">Filters</h2>
<button className="font-label-sm text-label-sm text-primary hover:underline">Reset</button>
</div>

<div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
<h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Price Range</h3>
<div className="flex items-center gap-2">
<input className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2" placeholder="Min" type="text" />
<span className="text-on-surface-variant">-</span>
<input className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2" placeholder="Max" type="text" />
</div>
</div>

<div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
<h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Year</h3>
<select className="w-full bg-surface-container-low border border-outline-variant rounded focus:border-primary focus:ring-0 font-body-sm text-body-md p-2">
<option>Any Year</option>
<option>2024</option>
<option>2023</option>
<option>2022</option>
<option>2021</option>
</select>
</div>

<div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
<h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Fuel Type</h3>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2 cursor-pointer">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<span className="font-body-md text-body-md">Petrol</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<span className="font-body-md text-body-md">Diesel</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<span className="font-body-md text-body-md">EV</span>
</label>
</div>
</div>

<div className="mb-stack-md">
<h3 className="font-label-bold text-label-bold text-on-surface-variant mb-stack-sm">Body Type</h3>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2 cursor-pointer">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<span className="font-body-md text-body-md">SUV</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<span className="font-body-md text-body-md">Sedan</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<span className="font-body-md text-body-md">Hatchback</span>
</label>
</div>
</div>
<button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:opacity-90 transition-opacity">Apply Filters</button>
</div>
</aside>

<section className="flex-grow">
<div className="flex justify-between items-end mb-stack-md">
<div>
<h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Available Vehicles</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Showing 124 premium pre-owned cars</p>
</div>
<div className="flex items-center gap-stack-sm">
<select className="bg-surface border border-outline-variant rounded-md py-1.5 px-3 font-label-sm text-label-sm text-on-background focus:outline-none focus:border-primary">
<option>Sort: Recommended</option>
<option>Price: Low to High</option>
<option>Price: High to Low</option>
<option>Year: Newest</option>
</select>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
<div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="A pristine white luxury SUV parked in a modern, well-lit showroom. The lighting highlights the elegant curves and robust stance of the vehicle, emphasizing its premium build quality. The showroom features warm wood accents and polished concrete floors, creating a sophisticated and trustworthy atmosphere consistent with a high-end automotive marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnPOujfzRfiiI2prFqhlQEl7Y12scJxQtLxkQgf9x4W5zZ8338aALym74ic8oXEGv524XwCnBLVu4CMnSlUaQkDue8UgmAI6ZN3jcFyxsbXJ8DwOq_nzfY-275lp6tSW1qVDv8EgXlYWItOGqDkh6D6A-cDobERFRT_rCRe6TCgSOnt4ynbjnmlFJ60tf3CHtdYmIRwjk8LHU3TZcmpOPu_VhTWhf6E2AsPYbXB6CNN-yiuMg1FC4" />
<div className="absolute top-3 left-3 bg-[#228B22] text-on-primary font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1 shadow-md">
<span className="material-symbols-outlined text-[14px]" style={{"color":"#D4AF37"}}>workspace_premium</span>
                            Tribe Certified
                        </div>
</div>
<div className="p-stack-md flex flex-col gap-stack-sm">
<div className="flex justify-between items-start">
<h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">2022 Volvo XC90</h2>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">$54,900</p>
<div className="flex flex-wrap gap-2 mt-2">
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">24,500 km</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Petrol</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
</div>
</article>

<article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
<div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="A sleek, dark grey sports sedan positioned against a minimalist concrete backdrop. The image captures the aggressive yet refined front grille and sharp headlights. The scene is illuminated by soft, diffused studio lighting that accentuates the metallic paint finish, conveying a sense of performance and luxury suitable for a premium car listing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqJzYmSIDIX-AHl5sgP69q6YpcATj7fv99vuXtX27ZEcye8IecgGhZiVSL88b09TPiQHJgi30Ntw9f4xNwjWgM8XT6Zt6IsyaXKM3ZlYFtpZ4FrdVgzUzhEIk69HBhYnTR9Rtz4NmGx3ckVt8kS-arX3SZMrCLsQm0gpGAbpZwOSK-fDE3oE008Tu3dW2NURwYrqn0wbdu5dmBo9B7-p-0t2F6FkgXmtYRMYDJGs1bkv6ytXPKqaE" />
</div>
<div className="p-stack-md flex flex-col gap-stack-sm">
<div className="flex justify-between items-start">
<h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">2021 BMW 3 Series</h2>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">$42,500</p>
<div className="flex flex-wrap gap-2 mt-2">
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">38,200 km</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Diesel</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
</div>
</article>

<article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
<div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="An electric blue hatchback charging at a sleek, modern charging station. The setting suggests an urban environment at dusk, with warm streetlights reflecting off the car's glossy finish. The overall aesthetic is forward-thinking and eco-conscious, fitting perfectly into a high-end marketplace that values modern mobility solutions." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-VXemk5wqugd5IcLRtRffGGBLfzyaBVzgFKHbXPXB4EOnkKlKD3UHFd5gdOSTNeuWLC0PbpmcBWpmkmi8G9zBJNav9zNKIv-gSXvbKxBV9WDE6cSs1h28vjF2LTiyfgFd7ox02vX0UXg9MjwtzbtUxaNvNBKzgSIAzshASWVcwnzboDR4vP9Xs05JIXGMH6JOev5ueatgPEq3PW7KkCNzGBxfTo7va3B0w4PNELELK-wyFNOqp_A" />
<div className="absolute top-3 left-3 bg-[#228B22] text-on-primary font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1 shadow-md">
<span className="material-symbols-outlined text-[14px]" style={{"color":"#D4AF37"}}>workspace_premium</span>
                            Tribe Certified
                        </div>
</div>
<div className="p-stack-md flex flex-col gap-stack-sm">
<div className="flex justify-between items-start">
<h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">2023 Tesla Model 3</h2>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">$48,900</p>
<div className="flex flex-wrap gap-2 mt-2">
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">12,000 km</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">EV</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
</div>
</article>

<article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
<div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="A classic black luxury SUV parked near a modern architectural building with large glass windows. The lighting is bright and clear, indicative of a sunny afternoon, casting sharp yet elegant shadows. The vehicle exudes power, heritage, and premium quality, aligning with a sophisticated automotive marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu5RzC4nFmfcnytOwwTPKWj9UrDGkdRo1LBCj1_kM-z9AyFXHdgMvpy1iLmj0dumYKm5pdOPP1eszU6gB_CQpDc1ap9Q119Y-4OpslgeiL92j802Oo_rt-9dtituJYmkcglbAywUHIvbszhP-jQxG0RhGVXRM_dZJIau6QD3WPtXlQrhqMBIPn2KpY2EIlpVervdmcyltrl0rDkcSi3fQELsz6iIwjUTnqjZipNHMYNGUl9pJpw7Y" />
</div>
<div className="p-stack-md flex flex-col gap-stack-sm">
<div className="flex justify-between items-start">
<h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">2020 Audi Q7</h2>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">$49,000</p>
<div className="flex flex-wrap gap-2 mt-2">
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">55,100 km</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Petrol</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
</div>
</article>

<article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
<div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="A silver premium sedan parked on a quiet, leafy suburban street during golden hour. The warm sunlight highlights the smooth, aerodynamic lines of the car. The setting conveys reliability, comfort, and a subtle luxury, matching the premium community-centric vibe of the platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx9-LI9RJV34hSljrEL6on-R0a8hpiMZuKztAR-aNBMGKp-9L2N2nT4KH5XY7ufA_qhn9E74QHXfvO0Ha0Fnq2bTn10PAeC9NkkEfg8lqIlNsXiXEMQM4m77UpgcNcScu2XIIim3hw8L7MVAWuq6Zwvr__ACR0a02FtvikuCGDLWK7yrVYw4sPdjukzblbnbSWm3ONYcXokSkrCJu-HZT96hpMHjVfmtVLzRZkbW-KGRvUOO4dIEM" />
<div className="absolute top-3 left-3 bg-[#228B22] text-on-primary font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1 shadow-md">
<span className="material-symbols-outlined text-[14px]" style={{"color":"#D4AF37"}}>workspace_premium</span>
                            Tribe Certified
                        </div>
</div>
<div className="p-stack-md flex flex-col gap-stack-sm">
<div className="flex justify-between items-start">
<h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">2022 Mercedes-Benz C-Class</h2>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">$51,200</p>
<div className="flex flex-wrap gap-2 mt-2">
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">18,500 km</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Petrol</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
</div>
</article>

<article className="bg-surface rounded-xl vehicle-card-shadow overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
<div className="relative aspect-[3/2] overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="A vibrant red compact hatchback parked in front of a trendy urban cafe with exposed brick walls. The scene is lively but focused on the car, which stands out with its dynamic styling. The lighting is natural and bright, emphasizing the car's practical yet stylish appeal for a modern driver." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhsZaXvfz8s0-mYzRjgv8lrEUb4gwfoLxWwIEqI1CYMd2q8xcXL9qteR2ZDOcREXxAbeEnYLo0sNR8O6HlYcCypKGKONAvtPIsztBRohOER_Riv7B4Hvojr6x0HFJA8mqO0ViwdzI_ZVkf9SfSKbpCrkpromrac_695We1U2_l0sSo62tTHgNX15GQ0fqzFiRpuTEm8RS3_h8YDzNG_9SxB3h3FtQmP8vrpJ86L_U3VRq2K0gtIEM" />
</div>
<div className="p-stack-md flex flex-col gap-stack-sm">
<div className="flex justify-between items-start">
<h2 className="font-headline-md text-headline-md text-on-background line-clamp-1 group-hover:text-primary transition-colors">2021 Volkswagen Golf</h2>
</div>
<p className="font-headline-md text-headline-md text-primary font-bold font-display-lg">$28,500</p>
<div className="flex flex-wrap gap-2 mt-2">
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">42,000 km</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Petrol</span>
<span className="bg-surface-container text-on-background font-label-sm text-label-sm px-2 py-1 rounded">Automatic</span>
</div>
</div>
</article>
</div>

<div className="flex justify-center mt-stack-lg gap-2">
<button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">Prev</button>
<button className="px-4 py-2 bg-primary text-on-primary rounded font-label-bold text-label-bold">1</button>
<button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">2</button>
<button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">3</button>
<button className="px-4 py-2 border border-outline-variant rounded font-label-bold text-label-bold text-on-surface-variant hover:bg-surface-container">Next</button>
</div>
</section>
</main>

<footer className="bg-primary text-on-primary w-full py-stack-lg px-margin-desktop flex flex-col items-center gap-base mt-stack-lg flat no shadows">
<a className="font-headline-md text-headline-md font-bold text-on-primary" href="#">Tribe Motors</a>
<div className="flex gap-gutter mt-stack-sm flex-wrap justify-center">
<a className="font-label-sm text-label-sm text-on-primary-container opacity-80 hover:opacity-100 hover:underline decoration-secondary-fixed transition-all duration-300" href="#">Privacy Policy</a>
<a className="font-label-sm text-label-sm text-on-primary-container opacity-80 hover:opacity-100 hover:underline decoration-secondary-fixed transition-all duration-300" href="#">Terms of Service</a>
<a className="font-label-sm text-label-sm text-on-primary-container opacity-80 hover:opacity-100 hover:underline decoration-secondary-fixed transition-all duration-300" href="#">Contact Us</a>
<a className="font-label-sm text-label-sm text-on-primary-container opacity-80 hover:opacity-100 hover:underline decoration-secondary-fixed transition-all duration-300" href="#">Dealer License</a>
</div>
<p className="font-body-md text-body-md text-on-primary-container mt-stack-md opacity-70">© 2024 Tribe Motors. Premium Pre-Owned Excellence.</p>
</footer>



    </div>
  );
}