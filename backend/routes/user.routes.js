import usersController from '../controllers/user.controller';
import { Router } from 'express';
const router = Router();

const routes = (app) => {

    router.get('/', usersController.findAll);

    router.get('/:id', usersController.findOne);

    router.put('/:id', usersController.update);

    router.delete('/:id', usersController.deleteUser);

    app.use('/users', router);
};

export default routes;