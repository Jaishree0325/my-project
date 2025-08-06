const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const sequelize = require("./config/db");

// Load valid student IDs from Excel
const getValidIds = require("./utils/loadValidIds");
const validIds = getValidIds(); // Loaded once at server start

// Import models to sync with DB
const Student = require("./models/Student");
const Leave = require("./models/Leave");
const Meal = require("./models/Meal");

// Import routes
const leaveRoutes = require("./routes/leaveRoutes");
const mealRoutes = require("./routes/mealRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static file access (CSV or frontend assets)
app.use("/files", express.static(path.join(__dirname, "public/files")));

// API routes
app.use("/api/leave", leaveRoutes);
app.use("/api/meals", mealRoutes);

// Validate student ID against Excel list
app.get("/api/valid-ids", (req, res) => {
  res.json({ ids: validIds });
});

// Optional seed route (can be removed later)
app.get("/api/seed", async (req, res) => {
  try {
    await Student.bulkCreate([
      { studentId: "S1001", name: "Arun", room: 101 },
      { studentId: "S1002", name: "Priya", room: 203 },
      { studentId: "S1003", name: "Karthik", room: 305 },
    ]);
    res.json({ message: "Seeded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Seed failed" });
  }
});

// Sync models and start server
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
  });
});