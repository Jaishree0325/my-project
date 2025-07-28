const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
  studentId: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING },
  room: { type: DataTypes.INTEGER },
});

module.exports = Student;