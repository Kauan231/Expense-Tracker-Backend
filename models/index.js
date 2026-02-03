"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const allConfigs = require(path.join(__dirname, "../config/config.json"));
const config = allConfigs[env] || allConfigs["development"];

const db = {};

const storagePath =
  process.env.SQLITE_PATH ||
  path.join(process.cwd(), "database.sqlite3");

console.log("📌 Sequelize ENV =", env);
console.log("📌 SQLite Storage Path =", storagePath);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: config.logging || false,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
