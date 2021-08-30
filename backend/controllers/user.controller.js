import request from 'request';
import db from '../models';
import logger from '../logger';
import prepareUser from '../utils/user';

const User = db.users;
const baseUrl = 'https://randomuser.me';

const create = async (item, next) => {
    await User.create(item)
        .catch(err => next(err));
};

class UserController {
    findAll(req, res, next) {
        User.findAll()
            .then(data => {
                if (data.length) {
                    res.send(data);
                } else {
                    request(`${baseUrl}/api/?results=25&seed=abc&inc=name,
                login,email,phone,picture`, async (error,
                        response, body) => {
                        const parsedBody = JSON.parse(body);
                        for (const item of parsedBody.results) {
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

    findOne(req, res, next) {
        const id = req.params.id;

        User.findByPk(id)
            .then(data => {
                res.send(data);
                logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            })
            .catch(err => next(err));
    };

    update(req, res, next) {
        const updateValues = req.body;
        const id = req.params.id;

        User.update(updateValues, {
            where: { id: id },
            returning: true,
            plain: true
        })
            .then((self) => {
                res.send({
                    result: self[1].dataValues,
                    message: 'User successfully updated.'
                });
                logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            })
            .catch(err => next(err));
    };

    deleteUser(req, res, next) {
        const id = req.params.id;

        User.findByPk(id)
            .then((data) => {
                User.destroy({ where: { id: id }})
                    .then(() => {
                        res.send({
                            result: data,
                            message: 'User successfully deleted.'
                        });
                        logger.info(`${res.statusCode} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    })
                    .catch(err => next(err));
            })
            .catch(err => next(err));
    };
}

export default new UserController();