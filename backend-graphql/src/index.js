import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import createUsers from './services';
import apolloWinstonLoggingPlugin from 'apollo-winston-logging-plugin';
import { logger } from './services/logger';
import jwt from 'jsonwebtoken';

const port = process.env.PORT;

(async () => {
    const app = express();

    app.use(cors());

    const getMe = async (req) => {
        const token = req.headers['x-token'];

        if (token) {
            try {
                return await jwt.verify(JSON.parse(token), process.env.SECRET);
            } catch (e) {
                throw new AuthenticationError(
                    'Your session expired. Sign in again.',
                );
            }
        }
    };

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req }) => {
            const me = await getMe(req);
            return {
                models,
                me,
                secret: process.env.SECRET,
            };
        },
    });

    await server.start();

    server.applyMiddleware({ app, path: '/graphql' });

    sequelize.sync().then(async () => {
        const users = await models.User.findAll();
        if (!users.length) {
            await createUsers();
        }

        app.listen({ port: port }, () => {
            console.log(`Apollo Server on http://localhost:${port}/graphql`);
        });
    });
})();
