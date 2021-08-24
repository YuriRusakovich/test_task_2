module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        large_photo: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        }
    });
};