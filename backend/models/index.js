import dotenv from 'dotenv';
dotenv.config();
import dbConfig from '../config/config';
import {Sequelize} from 'sequelize';
import Users from './user.model';

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(dbConfig[env].database,
    dbConfig[env].username, dbConfig[env].password, {
        host: dbConfig[env].host,
        dialect: dbConfig[env].dialect,
        logging: env !== 'test'
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = Users(sequelize, Sequelize);

export default db;