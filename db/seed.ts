import { db } from './index';
import { vehicles, enquiries, staff } from './schema';

const seed = async () => {
  console.log('Seeding database...');
  
  // Clear existing data
  await db.delete(enquiries);
  await db.delete(vehicles);
  await db.delete(staff);

  console.log('Inserting vehicles...');
  await db.insert(vehicles).values([
    {
      title: "2022 Volvo XC90",
      make: "Volvo",
      model: "XC90",
      year: 2022,
      price: 4600000,
      mileage: 24500,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      isCertified: true,
      status: "Live",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnPOujfzRfiiI2prFqhlQEl7Y12scJxQtLxkQgf9x4W5zZ8338aALym74ic8oXEGv524XwCnBLVu4CMnSlUaQkDue8UgmAI6ZN3jcFyxsbXJ8DwOq_nzfY-275lp6tSW1qVDv8EgXlYWItOGqDkh6D6A-cDobERFRT_rCRe6TCgSOnt4ynbjnmlFJ60tf3CHtdYmIRwjk8LHU3TZcmpOPu_VhTWhf6E2AsPYbXB6CNN-yiuMg1FC4",
      imageAlt: "A pristine white luxury SUV parked in a modern, well-lit showroom.",
    },
    {
      title: "2021 BMW 3 Series",
      make: "BMW",
      model: "3 Series",
      year: 2021,
      price: 3570000,
      mileage: 38200,
      fuelType: "Diesel",
      transmission: "Automatic",
      bodyType: "Sedan",
      isCertified: false,
      status: "Draft",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqJzYmSIDIX-AHl5sgP69q6YpcATj7fv99vuXtX27ZEcye8IecgGhZiVSL88b09TPiQHJgi30Ntw9f4xNwjWgM8XT6Zt6IsyaXKM3ZlYFtpZ4FrdVgzUzhEIk69HBhYnTR9Rtz4NmGx3ckVt8kS-arX3SZMrCLsQm0gpGAbpZwOSK-fDE3oE008Tu3dW2NURwYrqn0wbdu5dmBo9B7-p-0t2F6FkgXmtYRMYDJGs1bkv6ytXPKqaE",
      imageAlt: "A sleek, dark grey sports sedan positioned against a minimalist concrete backdrop.",
    },
    {
      title: "2023 Tesla Model Y",
      make: "Tesla",
      model: "Model Y",
      year: 2023,
      price: 4100000,
      mileage: 12000,
      fuelType: "EV",
      transmission: "Automatic",
      bodyType: "SUV",
      isCertified: false,
      status: "Sold",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-VXemk5wqugd5IcLRtRffGGBLfzyaBVzgFKHbXPXB4EOnkKlKD3UHFd5gdOSTNeuWLC0PbpmcBWpmkmi8G9zBJNav9zNKIv-gSXvbKxBV9WDE6cSs1h28vjF2LTiyfgFd7ox02vX0UXg9MjwtzbtUxaNvNBKzgSIAzshASWVcwnzboDR4vP9Xs05JIXGMH6JOev5ueatgPEq3PW7KkCNzGBxfTo7va3B0w4PNELELK-wyFNOqp_A",
      imageAlt: "An electric blue hatchback charging at a sleek, modern charging station.",
    },
    {
      title: "2020 Audi Q5",
      make: "Audi",
      model: "Q5",
      year: 2020,
      price: 3310000,
      mileage: 55000,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "SUV",
      isCertified: true,
      status: "Live",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEEwTB0R2jrUs0Td1GoqGFjWP5QP0himxrHHOHCCE4njS050l-sg0G-0tg8ww25bP20tFGpW_NZbchVRwqb6pWYujV_Xl9ACi1CkhrNW1ACx1tIQyNoZe1aH-tkUCrlahSJtZkgZifZucsc01VTDerm8NVoFJOcAj0ly5YDORs1zrdHIBeBeKldXeAZSodnRFFf4hsK-pK4hxCd4v5NGso93-0nvYtV6vj1nYOchoe9_hauHsPT0k",
      imageAlt: "A side-profile high-resolution photograph of a pristine 2020 Audi Q5 in a sleek metallic silver finish.",
    }
  ]);

  console.log('Inserting staff...');
  await db.insert(staff).values([
    {
      name: "Admin User",
      email: "admin@tribemotors.com",
      role: "Admin",
    },
    {
      name: "Sales Rep",
      email: "sales@tribemotors.com",
      role: "Staff",
    }
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
