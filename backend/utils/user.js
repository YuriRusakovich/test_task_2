const prepareUser = (item) => {
    return {
        name: `${item.name.first} ${item.name.last}`,
        photo: item.picture.thumbnail,
        login: item.login.username,
        email: item.email,
        phone: item.phone,
        rating: 0
    };
};

module.exports = {
    prepareUser,
};