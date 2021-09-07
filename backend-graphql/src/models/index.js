import { Sequelize } from 'sequelize';
import User from './user';
import Message from './message';

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
    Message: Message(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;
