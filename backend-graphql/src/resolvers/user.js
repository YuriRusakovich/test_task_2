export default {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll({
                order: [['id', args.orderBy.id]],
            });
        },
        leaders: async (parent, args, { models }) => {
            return await models.User.findAll({
                order: [
                    ['rating', args.orderBy.rating],
                    ['name', 'asc'],
                ],
                limit: args.limit,
            });
        },
        user: async (parent, { id }, { models }) => {
            return await models.User.findByPk(id);
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
    },
};
