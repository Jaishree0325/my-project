const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Meal = sequelize.define("Meal", {
  studentId: { type: DataTypes.STRING },
  meals: { type: DataTypes.JSON },
});

module.exports = Meal;