const allUsers = 'SELECT * FROM users ORDER BY id ASC';
const setUser = (user) => {
    const { name, photo, login, email, phone, rating } = user;
    return {
        queryString: `INSERT INTO users
        (name, photo, login, email, phone, rating)
        SELECT CAST($1 AS VARCHAR), $2, $3, $4, $5, $6
        WHERE NOT EXISTS (SELECT name FROM users WHERE name = $1);`,
        values: [name, photo, login, email, phone, rating]
    };
};

module.exports = {
    allUsers,
    setUser,
};