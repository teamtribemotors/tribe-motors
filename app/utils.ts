export function formatIndianCurrency(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;
  
  if (isNaN(numPrice)) return String(price);

  if (numPrice >= 10000000) {
    return `₹${(numPrice / 10000000).toFixed(2).replace(/\.00$/, '')} Crore`;
  } else if (numPrice >= 100000) {
    return `₹${(numPrice / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(numPrice);
}
