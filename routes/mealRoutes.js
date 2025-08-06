const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController");

router.post("/", mealController.submitMeal);
router.get("/all", mealController.getAllMeals);

module.exports = router;