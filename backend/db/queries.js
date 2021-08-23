const { allUsers, setUser } = require("../utils/queryStrings");
const { prepareUser } = require("../utils/user");
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'yrusakovich',
    host: 'localhost',
    database: 'api',
    password: '1970a',
    port: 5432,
});

const createUsers = async (response, body) => {
    const parsedBody = JSON.parse(body);
    return await parsedBody.results.map((item) => {
        const user = prepareUser(item);
        const { queryString, values } = setUser(user);
        pool.query(queryString, values);
        return user;
    });
};

const getUsers = (req, res) => {
    pool.query(allUsers, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const checkExistsUsers = async () => {
    const result = await pool.query(allUsers);
    if (!result || !result.rows || !result.rows.length) return 0;
    return result.rows.length;
}

module.exports = {
    getUsers,
    createUsers,
    checkExistsUsers,
};