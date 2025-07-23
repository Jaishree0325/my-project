 const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "mealData.csv");
const headers = "Student ID,Meals\n";
console.log("Writing to:", filePath);
// Ensure header is written once on startup
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, headers);
}

// POST: Submit meal selections
router.post("/", (req, res) => {
  const { studentId, meals } = req.body;

  if (!studentId || !Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({ message: "Invalid meal data." });
  }

  const newRow = `${studentId},${meals.join("|")}\n`;
  fs.appendFileSync(filePath, newRow);
  console.log("Meal row added:", newRow);

  res.status(200).json({ status: "Success", message: "Meal selection recorded!" });
});

// GET: View all meal submissions (memory only)
const mealSelections = [];
router.get("/all", (req, res) => {
  res.status(200).json(mealSelections);
});

module.exports = router;