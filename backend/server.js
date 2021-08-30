import dotenv from 'dotenv';
dotenv.config();
import db from './models';
import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from './logger';
import routes from './routes/user.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT;
const corsOptions = {
    origin: ['http://localhost:9000', 'http://localhost', 'http://0.0.0.0:9000']
};

const swaggerDefinition = {
    info: {
        title: 'Test_task_2',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/'
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/user.routes.js'],
};

const swaggerOptions = {
    customCss: '.swagger-ui .scheme-container { display: none }'
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.use(cors(corsOptions));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

db.sequelize.sync();

routes(app);

app.use((err,req,res,next,) => {
    res.status(500).send('Internal server error');
    logger.internalError(err, res, req);
});

app.use((req,res) => {
    res.status(404).send('Page not found');
    logger.notFound(res, req);
});

const server = app.listen(port, () => {
    logger.connect(port);
});

module.exports = server;