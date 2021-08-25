const usersController = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = app => {

    router.get("/", usersController.findAll);

    router.get("/:id", usersController.findOne);

    router.put("/:id", usersController.update);

    router.delete('/:id', usersController.delete);

    app.use('/users', router);
};