const dbConfig = require("../config/db");
const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize(dbConfig.development.database,
    dbConfig.development.username, dbConfig.development.password, {
        host: dbConfig.development.host,
        dialect: dbConfig.development.dialect
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);

module.exports = db;