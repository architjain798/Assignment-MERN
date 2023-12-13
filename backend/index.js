const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/user");
const connectToMongoDB = require("./db");

require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
connectToMongoDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api", productsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
