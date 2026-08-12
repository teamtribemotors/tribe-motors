import { pgTable, text, timestamp, integer, boolean, uuid, index } from 'drizzle-orm/pg-core';

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
  vin: text('vin').notNull().default('PENDING_VIN'),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  imageAlt: text('image_alt').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    statusIdx: index('vehicles_status_idx').on(table.status),
    priceIdx: index('vehicles_price_idx').on(table.price),
    yearIdx: index('vehicles_year_idx').on(table.year),
    makeIdx: index('vehicles_make_idx').on(table.make),
    createdAtIdx: index('vehicles_created_at_idx').on(table.createdAt),
  };
});

export const enquiries = pgTable('enquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  number: text('number').notNull(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  vehicleModel: text('vehicle_model').notNull(),
  status: text('status').notNull().default('New'), // New, Contacted
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => {
  return {
    vehicleIdIdx: index('enquiries_vehicle_id_idx').on(table.vehicleId),
    statusIdx: index('enquiries_status_idx').on(table.status),
    createdAtIdx: index('enquiries_created_at_idx').on(table.createdAt),
  };
});

export const staff = pgTable('staff', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('Staff'), // Admin, Staff
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const inspections = pgTable('inspections', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  inspectorName: text('inspector_name').notNull(),
  date: timestamp('date').defaultNow().notNull(),
  score: integer('score').notNull(), // out of 100
  status: text('status').notNull().default('Pending'), // Pending, Passed, Failed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const fulfillmentRequests = pgTable('fulfillment_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  buyerName: text('buyer_name').notNull(),
  buyerType: text('buyer_type').notNull(), // Individual, Dealer
  contact: text('contact').notNull(), // email or phone
  status: text('status').notNull().default('Pending'), // Pending, In Progress, Completed
  requestTime: timestamp('request_time').defaultNow().notNull(),
});

export const serviceRecords = pgTable('service_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  type: text('type').notNull(), // Oil Change, Repair, etc.
  cost: integer('cost').notNull(),
  status: text('status').notNull().default('Pending'), // Pending, In Progress, Completed
  date: timestamp('date').defaultNow().notNull(),
});
