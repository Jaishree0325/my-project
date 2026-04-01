const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const sequelize = require("./config/db");

// Import models to sync with DB
const Student = require("./models/Student");
const Leave = require("./models/Leave");
const Meal = require("./models/Meal");

Student.hasMany(Leave, { foreignKey: "studentId" });
Leave.belongsTo(Student, { foreignKey: "studentId" });

Student.hasMany(Meal, { foreignKey: "studentId" });
Meal.belongsTo(Student, { foreignKey: "studentId" });

// Import routes
const leaveRoutes = require("./routes/leaveRoutes");
const mealRoutes = require("./routes/mealRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Static file access (CSV or frontend assets)
app.use("/files", express.static(path.join(__dirname, "public/files")));

// API routes
app.use("/api/leave", leaveRoutes);
app.use("/api/meals", mealRoutes);


app.post("/api/students", async (req, res) => {
  try {
    const { studentId, name, room } = req.body;

    const student = await Student.create({ studentId, name, room });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error adding student" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Sync models and start server
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
  });
});