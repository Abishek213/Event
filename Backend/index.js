import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import seedRoles from './seeders/roleSeeder.js';
import seedPermissions from './seeders/PermissionSeeder.js';
import seedUsers from './seeders/userSeeder.js';
import seedEvents from './seeders/eventSeeder.js';
import seedCategories from './seeders/categorieSeeder.js';
import seedRolePermissions from './seeders/rolePermissionSeeder.js';
import eventRoutes from './routes/Event.routes.js';
import userRoute from './routes/user.route.js';
import roleRoute from './routes/role.route.js';

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.MongoDB_URI) {
  console.error("ERROR: MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDB_URI;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
    // Add clear indication of seeding process
    console.log("Starting database seeding...");
    // Execute seeds in proper order with status logging
    console.log("1. Seeding roles...");
    await seedRoles();
    console.log("2. Seeding permissions...");
    await seedPermissions();
    console.log("3. Seeding users...");
    await seedUsers();
    console.log("4. Seeding Categories ...");
    await seedCategories()
    console.log("5. Seeding events...");
    await seedEvents();
    console.log("6. Seeding role permissions...");
    await seedRolePermissions();
    console.log("✓ Database seeding completed!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("\nShutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Initialize database connection
connectDB();

// API routes
app.use('/api/v1/events', eventRoutes); // Versioned API path
app.use('/api/v1/users', userRoute);
app.use('/api/v1/roles', roleRoute);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
