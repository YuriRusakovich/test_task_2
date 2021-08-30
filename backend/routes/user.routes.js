import usersController from '../controllers/user.controller';
import { Router } from 'express';
const router = Router();

const routes = (app) => {

    /**
     * @swagger
     * definitions:
     *   User:
     *     properties:
     *       id:
     *         type: integer
     *       name:
     *         type: string
     *       photo:
     *         type: string
     *       large_photo:
     *         type: string
     *       login:
     *         type: string
     *       email:
     *         type: string
     *       phone:
     *         type: string
     *       rating:
     *         type: integer
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *   ChangeRating:
     *      properties:
     *        rating:
     *          type: integer
     */

    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *       - Users
     *     summary: Returns all users.
     *     description: Returns all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of users
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/User'
     */
    router.get('/', usersController.findAll);

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     tags:
     *       - Users
     *     summary: Returns a single user.
     *     description: Returns a single user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single user
     *         schema:
     *           $ref: '#/definitions/User'
     */
    router.get('/:id', usersController.findOne);

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     tags:
     *       - Users
     *     summary: Updates a single user.
     *     description: Updates a single user
     *     produces: application/json
     *     parameters:
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *       - name: rating
     *         description: Object with rating field
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/ChangeRating'
     *     responses:
     *       200:
     *         description: Successfully updated
     *         schema:
     *           properties:
     *             result:
     *               $ref: '#/definitions/User'
     *             message:
     *               type: string
     *               example: 'User successfully updated.'
     */
    router.put('/:id', usersController.update);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     tags:
     *       - Users
     *     summary: Deletes a single user.
     *     description: Deletes a single user
     *     produces: application/json
     *     parameters:
     *       - name: id
     *         description: User's id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted
     *         schema:
     *           properties:
     *             result:
     *               $ref: '#/definitions/User'
     *             message:
     *               type: string
     *               example: 'User successfully deleted.'
     */
    router.delete('/:id', usersController.deleteUser);

    app.use('/users', router);
};

export default routes;