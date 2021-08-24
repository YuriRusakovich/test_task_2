module.exports = app => {
    const usersController = require("../controllers/user.controller");
    const router = require("express").Router();

    router.get("/", usersController.findAll);

    app.use('/users', router);
};