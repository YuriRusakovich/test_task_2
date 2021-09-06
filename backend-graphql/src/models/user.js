const user = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        name: {
            type: Sequelize.STRING,
        },
        photo: {
            type: Sequelize.STRING,
        },
        large_photo: {
            type: Sequelize.STRING,
        },
        login: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        rating: {
            type: Sequelize.INTEGER,
        },
    });

    User.findByLogin = async (login) => {
        return await User.findOne({
            where: { login: login },
        });
    };

    return User;
};

export default user;
