const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Leave = sequelize.define("Leave", {
  studentId: { type: DataTypes.STRING },
  fromDate: { type: DataTypes.DATE },
  toDate: { type: DataTypes.DATE },
  reason: { type: DataTypes.STRING },
  room: { type: DataTypes.INTEGER },
});

module.exports = Leave;