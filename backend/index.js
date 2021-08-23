const express = require('express');
const request = require('request');
const cors = require('cors');
const db = require('./db/queries');
const logger = require('./logger');

const app = express();
const port = 3000;
const baseUrl = 'https://randomuser.me';
const corsOptions = {
    origin: 'http://localhost:9000',
};

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/users', cors(corsOptions),
    async (req, res, next) => {
        try {
            const usersLength = await db.checkExistsUsers();
            if (usersLength === 25) {
                db.getUsers(req, res);
            } else {
                request(`${baseUrl}/api/?results=25&seed=abc&inc=name,
                login,email,phone,picture`, async (error,
                    response, body) => {
                    await db.createUsers(res, body);
                    setTimeout(()=> {
                        db.getUsers(req, res);
                    }, 1000);
                });
            }
            logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        catch (error) {
            next(error);
        }
    });

// Capture 500 errors
app.use((err,req,res,next) => {
    res.status(500).send('Internal server error');
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("Page not found");
    logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

app.listen(port, () => {
    logger.info(
        "Server started listening http://localhost:3000",
        { port: 3000 } );
});