import dotenv from 'dotenv';
dotenv.config();
import db from './models';
import express from 'express';
import cors from 'cors';
import logger from './logger';
import routes from './routes/user.routes';

const app = express()
const port = process.env.PORT;
const corsOptions = {
    origin: ['http://localhost:9000', 'http://localhost']
};

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