import { Sequelize } from 'sequelize';
import User from './user';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    },
);

const models = {
    User: User(sequelize, Sequelize),
};

export { sequelize };

export default models;
