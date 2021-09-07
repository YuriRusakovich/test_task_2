const message = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        text: {
            type: DataTypes.STRING,
        },
        sendTo: {
            type: DataTypes.INTEGER,
        },
    });

    Message.associate = (models) => {
        Message.belongsTo(models.User);
    };

    return Message;
};

export default message;
