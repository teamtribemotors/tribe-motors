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
}

export const dummyInventory: Vehicle[] = [
  {
    id: "1",
    title: "2022 Volvo XC90",
    price: "$54,900",
    mileage: "24,500 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    isCertified: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPOujfzRfiiI2prFqhlQEl7Y12scJxQtLxkQgf9x4W5zZ8338aALym74ic8oXEGv524XwCnBLVu4CMnSlUaQkDue8UgmAI6ZN3jcFyxsbXJ8DwOq_nzfY-275lp6tSW1qVDv8EgXlYWItOGqDkh6D6A-cDobERFRT_rCRe6TCgSOnt4ynbjnmlFJ60tf3CHtdYmIRwjk8LHU3TZcmpOPu_VhTWhf6E2AsPYbXB6CNN-yiuMg1FC4",
    imageAlt: "A pristine white luxury SUV parked in a modern, well-lit showroom."
  },
  {
    id: "2",
    title: "2021 BMW 3 Series",
    price: "$42,500",
    mileage: "38,200 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    isCertified: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqJzYmSIDIX-AHl5sgP69q6YpcATj7fv99vuXtX27ZEcye8IecgGhZiVSL88b09TPiQHJgi30Ntw9f4xNwjWgM8XT6Zt6IsyaXKM3ZlYFtpZ4FrdVgzUzhEIk69HBhYnTR9Rtz4NmGx3ckVt8kS-arX3SZMrCLsQm0gpGAbpZwOSK-fDE3oE008Tu3dW2NURwYrqn0wbdu5dmBo9B7-p-0t2F6FkgXmtYRMYDJGs1bkv6ytXPKqaE",
    imageAlt: "A sleek, dark grey sports sedan positioned against a minimalist concrete backdrop."
  },
  {
    id: "3",
    title: "2023 Tesla Model Y",
    price: "$48,900",
    mileage: "12,000 km",
    fuelType: "EV",
    transmission: "Automatic",
    isCertified: false,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-VXemk5wqugd5IcLRtRffGGBLfzyaBVzgFKHbXPXB4EOnkKlKD3UHFd5gdOSTNeuWLC0PbpmcBWpmkmi8G9zBJNav9zNKIv-gSXvbKxBV9WDE6cSs1h28vjF2LTiyfgFd7ox02vX0UXg9MjwtzbtUxaNvNBKzgSIAzshASWVcwnzboDR4vP9Xs05JIXGMH6JOev5ueatgPEq3PW7KkCNzGBxfTo7va3B0w4PNELELK-wyFNOqp_A",
    imageAlt: "An electric blue hatchback charging at a sleek, modern charging station."
  },
  {
    id: "4",
    title: "2020 Audi Q5",
    price: "$39,500",
    mileage: "55,000 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    isCertified: true,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEEwTB0R2jrUs0Td1GoqGFjWP5QP0himxrHHOHCCE4njS050l-sg0G-0tg8ww25bP20tFGpW_NZbchVRwqb6pWYujV_Xl9ACi1CkhrNW1ACx1tIQyNoZe1aH-tkUCrlahSJtZkgZifZucsc01VTDerm8NVoFJOcAj0ly5YDORs1zrdHIBeBeKldXeAZSodnRFFf4hsK-pK4hxCd4v5NGso93-0nvYtV6vj1nYOchoe9_hauHsPT0k",
    imageAlt: "A side-profile high-resolution photograph of a pristine 2020 Audi Q5 in a sleek metallic silver finish."
  }
];

export const dummyStaffRecords = [
  { id: "SR-101", vehicle: "2022 Volvo XC90", date: "2026-08-01", status: "Completed", type: "Full Service" },
  { id: "SR-102", vehicle: "2021 BMW 3 Series", date: "2026-08-04", status: "Pending", type: "Inspection" },
  { id: "SR-103", vehicle: "2023 Tesla Model Y", date: "2026-08-05", status: "In Progress", type: "Battery Check" },
];
