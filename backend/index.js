require('module-alias/register');
const express = require('express');
const request = require('request');
const cors = require('cors');
const db = require('./db/queries');

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
    async (req, res) => {
        const usersLength = await db.checkExistsUsers();
        console.log(usersLength);
        if (usersLength) {
            db.getUsers(req, res);
        } else {
            request(`${baseUrl}/api/?results=25&seed=abc&inc=name,
                login,email,phone,picture`, async (error,
                response, body) => {
                await db.createUsers(res, body);
            });
        }
    });

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});