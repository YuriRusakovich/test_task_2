const request = require('request');
const db = require("../models");
const User = db.users;
const logger = require("../logger");
const prepareUser = require("../utils/user");

const baseUrl = 'https://randomuser.me';
const create = async (item, next) => {
    await User.create(item)
        .catch(err => next(err));
};

exports.findAll = (req, res, next) => {
        User.findAll()
            .then(data => {
                if (data.length) {
                    res.send(data);
                } else {
                    request(`${baseUrl}/api/?results=25&seed=abc&inc=name,
                    login,email,phone,picture`, async (error,
                        response, body) => {
                        const parsedBody = JSON.parse(body);
                        for (let item of parsedBody.results) {
                            const user = prepareUser(item);
                            await create(user, next);
                        }
                        User.findAll()
                            .then(data => {
                                res.send(data);
                            })
                            .catch(err => next(err));
                    });
                }
                logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            })
            .catch(err => next(err));
};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};