export interface Vehicle {
  id: string;
  title: string;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  isCertified: boolean;
  imageUrl: string;
  imageAlt: string;
  vin: string;
  status: 'Live' | 'Draft' | 'Sold';
  dateAdded?: string;
}

export const dummyInventory: Vehicle[] = [
  {
    id: "1",
    title: "2022 Volvo XC90",
    price: "₹4,600,000",
    mileage: "24,500 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    isCertified: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPOujfzRfiiI2prFqhlQEl7Y12scJxQtLxkQgf9x4W5zZ8338aALym74ic8oXEGv524XwCnBLVu4CMnSlUaQkDue8UgmAI6ZN3jcFyxsbXJ8DwOq_nzfY-275lp6tSW1qVDv8EgXlYWItOGqDkh6D6A-cDobERFRT_rCRe6TCgSOnt4ynbjnmlFJ60tf3CHtdYmIRwjk8LHU3TZcmpOPu_VhTWhf6E2AsPYbXB6CNN-yiuMg1FC4",
    imageAlt: "A pristine white luxury SUV parked in a modern, well-lit showroom.",
    vin: "YV1LF6104H1XXXXXX",
    status: "Live"
  },
  {
    id: "2",
    title: "2021 BMW 3 Series",
    price: "₹3,570,000",
    mileage: "38,200 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    isCertified: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqJzYmSIDIX-AHl5sgP69q6YpcATj7fv99vuXtX27ZEcye8IecgGhZiVSL88b09TPiQHJgi30Ntw9f4xNwjWgM8XT6Zt6IsyaXKM3ZlYFtpZ4FrdVgzUzhEIk69HBhYnTR9Rtz4NmGx3ckVt8kS-arX3SZMrCLsQm0gpGAbpZwOSK-fDE3oE008Tu3dW2NURwYrqn0wbdu5dmBo9B7-p-0t2F6FkgXmtYRMYDJGs1bkv6ytXPKqaE",
    imageAlt: "A sleek, dark grey sports sedan positioned against a minimalist concrete backdrop.",
    vin: "WBA5U7C50M8XXXXXX",
    status: "Draft"
  },
  {
    id: "3",
    title: "2023 Tesla Model Y",
    price: "₹4,100,000",
    mileage: "12,000 km",
    fuelType: "EV",
    transmission: "Automatic",
    isCertified: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-VXemk5wqugd5IcLRtRffGGBLfzyaBVzgFKHbXPXB4EOnkKlKD3UHFd5gdOSTNeuWLC0PbpmcBWpmkmi8G9zBJNav9zNKIv-gSXvbKxBV9WDE6cSs1h28vjF2LTiyfgFd7ox02vX0UXg9MjwtzbtUxaNvNBKzgSIAzshASWVcwnzboDR4vP9Xs05JIXGMH6JOev5ueatgPEq3PW7KkCNzGBxfTo7va3B0w4PNELELK-wyFNOqp_A",
    imageAlt: "An electric blue hatchback charging at a sleek, modern charging station.",
    vin: "5YJYGDEE8PFXXXXXX",
    status: "Sold"
  },
  {
    id: "4",
    title: "2020 Audi Q5",
    price: "₹3,310,000",
    mileage: "55,000 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    isCertified: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEEwTB0R2jrUs0Td1GoqGFjWP5QP0himxrHHOHCCE4njS050l-sg0G-0tg8ww25bP20tFGpW_NZbchVRwqb6pWYujV_Xl9ACi1CkhrNW1ACx1tIQyNoZe1aH-tkUCrlahSJtZkgZifZucsc01VTDerm8NVoFJOcAj0ly5YDORs1zrdHIBeBeKldXeAZSodnRFFf4hsK-pK4hxCd4v5NGso93-0nvYtV6vj1nYOchoe9_hauHsPT0k",
    imageAlt: "A side-profile high-resolution photograph of a pristine 2020 Audi Q5 in a sleek metallic silver finish.",
    vin: "WA1AAAFY0L2XXXXXX",
    status: "Live"
  }
];

export interface ServiceRecord {
  id: string;
  vehicle: string;
  date: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  type: string;
  cost?: string;
  technician?: string;
}

export const dummyStaffRecords: ServiceRecord[] = [
  { id: "SR-101", vehicle: "2022 Volvo XC90", date: "Aug 01, 2026", status: "Completed", type: "Full Service", cost: "₹1,250", technician: "Mike R." },
  { id: "SR-102", vehicle: "2021 BMW 3 Series", date: "Aug 04, 2026", status: "Pending", type: "Inspection", cost: "₹350", technician: "Unassigned" },
  { id: "SR-103", vehicle: "2023 Tesla Model Y", date: "Aug 05, 2026", status: "In Progress", type: "Battery Check", cost: "₹4,800", technician: "Sarah Connor" },
];

export interface Inspection {
  id: string;
  vehicleTitle: string;
  vin: string;
  inspector: string;
  date: string;
  status: 'Passed' | 'Failed' | 'Pending';
  score: string;
}

export const dummyInspections: Inspection[] = [
  { id: "INS-201", vehicleTitle: "2022 Volvo XC90", vin: "YV1LF6104H1XXXXXX", inspector: "John Smith", date: "Oct 12, 2023", status: "Passed", score: "98/100" },
  { id: "INS-202", vehicleTitle: "2021 BMW 3 Series", vin: "WBA5U7C50M8XXXXXX", inspector: "Alice Wong", date: "Oct 14, 2023", status: "Failed", score: "65/100" },
  { id: "INS-203", vehicleTitle: "2024 Honda Civic", vin: "2HGFC2F51MHXXXXXX", inspector: "Unassigned", date: "Oct 16, 2023", status: "Pending", score: "N/A" },
  { id: "INS-204", vehicleTitle: "2020 Audi Q5", vin: "WA1AAAFY0L2XXXXXX", inspector: "John Smith", date: "Oct 10, 2023", status: "Passed", score: "92/100" },
  { id: "INS-205", vehicleTitle: "2019 Toyota RAV4", vin: "JTMDFREV2KDXXXXXX", inspector: "Sarah Connor", date: "Oct 15, 2023", status: "Pending", score: "N/A" }
];

export interface FulfillmentRequest {
  id: string;
  buyerName: string;
  buyerType: string;
  vehicle: string;
  contact: string;
  requestTime: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export const dummyFulfillment: FulfillmentRequest[] = [
  { id: "FUL-301", buyerName: "James Donovan", buyerType: "Premium Member", vehicle: "2021 Porsche 911 Carrera S", contact: "+1 (555) 019-2834", requestTime: "10 mins ago", status: "Pending" },
  { id: "FUL-302", buyerName: "Sarah Lin", buyerType: "New Buyer", vehicle: "2023 Tesla Model Y", contact: "sarah.lin@example.com", requestTime: "2 hours ago", status: "In Progress" },
  { id: "FUL-303", buyerName: "Marcus West", buyerType: "Standard", vehicle: "2020 Audi Q5", contact: "+1 (555) 832-9912", requestTime: "1 day ago", status: "Completed" }
];
