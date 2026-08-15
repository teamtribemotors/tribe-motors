import { pgTable, text, timestamp, integer, boolean, uuid, index, jsonb } from 'drizzle-orm/pg-core';

export const vehicles = pgTable('vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  price: integer('price').notNull(),
  mileage: integer('mileage').notNull(),
  distanceDriven: integer('distance_driven').notNull().default(0),
  fuelType: text('fuel_type').notNull(), // Petrol, Diesel, EV, Hybrid
  transmission: text('transmission').notNull(), // Automatic, Manual, DCT
  bodyType: text('body_type').notNull(), // SUV, Sedan, Hatchback
  owners: text('owners').notNull().default('1st Owner'),
  color: text('color').notNull().default('Unknown'),
  colorHex: text('color_hex').notNull(),
  accidentalHistory: boolean('accidental_history').notNull().default(false),
  isCertified: boolean('is_certified').notNull().default(false),
  status: text('status').notNull().default('Draft'), // Draft, Live, Pending, Sold
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  imageAlt: text('image_alt').notNull(),
  images: jsonb('images').default('[]'),
  customerId: uuid('customer_id'),
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
  status: text('status').notNull().default('New'), // New, Contacted, Test Drive, Negotiation, Closed
  assignedTo: uuid('assigned_to').references(() => staff.id),
  notes: text('notes'),
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

// Note: inspections table removed per user request

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone').notNull(),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sales = pgTable('sales', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  salePrice: integer('sale_price').notNull(),
  saleDate: timestamp('sale_date').defaultNow().notNull(),
  notes: text('notes'),
});

export const serviceRecords = pgTable('service_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  type: text('type'), // Keep to avoid push conflicts
  fileUrl: text('file_url'), // URL to the uploaded PDF
  cost: integer('cost').notNull(),
  originalCost: integer('original_cost'),
  status: text('status').notNull().default('Pending'), // Pending, In Progress, Completed
  date: timestamp('date').defaultNow().notNull(),
});

export const reportUnlocks = pgTable('report_unlocks', {
  id: uuid('id').defaultRandom().primaryKey(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  customerId: uuid('customer_id').references(() => customers.id), // Could be null if guest
  amount: integer('amount').notNull(),
  unlockedAt: timestamp('unlocked_at').defaultNow().notNull(),
});

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id).notNull(),
  vehicleId: uuid('vehicle_id').references(() => vehicles.id).notNull(),
  staffId: uuid('staff_id').references(() => staff.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: text('status').notNull().default('Pending'), // Pending, Confirmed, Completed, Cancelled
  type: text('type').notNull().default('Visit'), // Visit, Test Drive
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull().default('Pending'), // Pending, In Progress, Completed
  assignedTo: uuid('assigned_to').references(() => staff.id),
  priority: text('priority').default('Normal'), // Urgent, High, Normal, Low
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const activityLogs = pgTable('activity_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(), // Enquiry, Booking, Unlock, System
  description: text('description').notNull(),
  userId: uuid('user_id'), // User or staff who performed action
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
