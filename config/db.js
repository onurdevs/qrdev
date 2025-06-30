const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // MySQL varsayılan portu 3306'dır, ancak MAMP gibi araçlarda farklı olabilir
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
