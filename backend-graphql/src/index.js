import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import createUsers from './services';
import apolloWinstonLoggingPlugin from 'apollo-winston-logging-plugin';
import { logger } from './services/logger';

const port = process.env.PORT;

(async () => {
    const app = express();

    app.use(cors());

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: {
            models,
        },
        plugins: [
            apolloWinstonLoggingPlugin({
                winstonInstance: logger,
            }),
        ],
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
