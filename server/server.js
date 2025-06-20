const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/orders", orderRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
