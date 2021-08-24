require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./logger');

const app = express()
const port = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:9000',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const db = require("./models");

db.sequelize.sync();

require("./routes/user.routes")(app);

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
        `Server started listening http://localhost:${port}`,
        { port: port } );
});