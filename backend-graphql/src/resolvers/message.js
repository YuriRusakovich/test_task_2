import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';

export default {
    Query: {
        message: async (parent, { id }, { models }) => {
            return await models.Message.findByPk(id);
        },
    },

    Mutation: {
        createMessage: combineResolvers(
            isAuthenticated,
            async (parent, { text, id }, { me, models }) => {
                return await models.Message.create({
                    text,
                    userId: me.id,
                    sendTo: id,
                });
            },
        ),
        deleteMessage: combineResolvers(
            isAuthenticated,
            isMessageOwner,
            async (parent, { id }, { models }) => {
                return await models.Message.destroy({ where: { id } });
            },
        ),
    },

    Message: {
        user: async (message, args, { models }) => {
            return await models.User.findByPk(message.userId);
        },
        owner: async (message, args, { models }) => {
            return await models.User.findByPk(message.sendTo);
        },
    },
};
