const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: 40205,
    dialect: "mysql",
    logging: false, // Optional: remove noisy logs
  }
);

module.exports = sequelize;