import { pgTable, text, timestamp, integer, boolean, uuid } from 'drizzle-orm/pg-core';

export const vehicles = pgTable('vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  price: integer('price').notNull(),
  mileage: integer('mileage').notNull(),
  fuelType: text('fuel_type').notNull(), // Petrol, Diesel, EV, Hybrid
  transmission: text('transmission').notNull(), // Automatic, Manual, DCT
  bodyType: text('body_type').notNull(), // SUV, Sedan, Hatchback
  owners: text('owners').notNull().default('1st Owner'),
  color: text('color').notNull().default('Unknown'),
  isCertified: boolean('is_certified').notNull().default(false),
  status: text('status').notNull().default('Draft'), // Draft, Live, Pending, Sold
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  imageAlt: text('image_alt').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const enquiries = pgTable('enquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  number: text('number').notNull(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  vehicleModel: text('vehicle_model').notNull(),
  status: text('status').notNull().default('New'), // New, Contacted
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const staff = pgTable('staff', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull().default('Staff'), // Admin, Staff
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
