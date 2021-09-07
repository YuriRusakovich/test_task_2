import { v4 as uuid } from 'uuid';

export default {
    Query: {
        messages: async (parent, args, { models }) => {
            return await models.Message.findAll();
        },
        message: async (parent, { id }, { models }) => {
            return await models.Message.findByPk(id);
        },
    },

    Mutation: {
        createMessage: async (parent, { text, id }, { me, models }) => {
            return await models.Message.create({
                text,
                userId: me.id,
                sendTo: id,
            });
        },
    },

    Message: {
        user: async (message, args, { models }) => {
            return await models.User.findByPk(message.userId);
        },
    },
};
