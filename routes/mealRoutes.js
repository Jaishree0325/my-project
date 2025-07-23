const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "mealData.csv"); // saves to root folder
const headers = "Student ID,Meals\n";

// Write headers if file doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, headers);
  console.log("Created mealData.csv with headers");
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

module.exports = router;