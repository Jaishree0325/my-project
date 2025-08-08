const Meal = require("../models/Meal");

// POST: Submit meal selections
exports.submitMeal = async (req, res) => {
  const { studentId, meals } = req.body;

  if (!studentId || !Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({ message: "Invalid meal data." });
  }

  try {
    const mealEntry = await Meal.create({ studentId, meals });
    console.log("Meal recorded:", mealEntry.toJSON());
    res.status(201).json({ status: "Success", data: mealEntry });
  } catch (err) {
    console.error("Error saving meal:", err);
    res.status(500).json({ message: "Database error." });
  }
};

// GET: Retrieve all meal selections
exports.getAllMeals = async (req, res) => {
  try {
    const allMeals = await Meal.findAll();
    res.status(200).json(allMeals);
  } catch (err) {
    console.error("Failed to fetch meals:", err);
    res.status(500).json({ message: "Database error." });
  }
};