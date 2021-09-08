import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';

const createToken = async (user, secret, expiresIn) => {
    const { id, email, name, photo } = user;
    return await jwt.sign({ id, email, name, photo }, secret, {
        expiresIn,
    });
};

export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll({
                order: [['id', args.orderBy.id]],
            });
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id);
        },
        me: async (parent, args, { models, me }) => {
            return await models.User.findByPk(me.id);
        },
    },

    Mutation: {
        deleteUser: async (parent, { id }, { models }) => {
            return await models.User.destroy({ where: { id } });
        },
        updateUser: async (parent, { id, rating }, { models }) => {
            await models.User.update({ rating: rating }, { where: { id } });
            return await models.User.findByPk(id);
        },
        signIn: async (parent, { login }, { models, secret }) => {
            const user = await models.User.findByLogin(login);
            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }
            return { token: await createToken(user, secret, '30m') };
        },
    },

    User: {
        messages: async (user, args, { models }) => {
            return await models.Message.findAll({
                where: {
                    sendTo: user.id,
                },
            });
        },
    },
};
