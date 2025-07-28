const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal"); // Sequelize model

// 📨 POST: Submit meal selections
router.post("/", async (req, res) => {
  const { studentId, meals } = req.body;

  if (!studentId || !Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({ message: "Invalid meal data." });
  }

  try {
    const mealEntry = await Meal.create({
      studentId,
      meals,
    });

    console.log("✅ Meal recorded:", mealEntry.toJSON());
    res.status(201).json({ status: "Success", data: mealEntry });
  } catch (err) {
    console.error("❌ Error saving meal:", err);
    res.status(500).json({ message: "Database error." });
  }
});

// 📥 GET: Retrieve all meal selections
router.get("/all", async (req, res) => {
  try {
    const allMeals = await Meal.findAll();
    res.status(200).json(allMeals);
  } catch (err) {
    console.error("❌ Failed to fetch meals:", err);
    res.status(500).json({ message: "Database error." });
  }
});

module.exports = router;