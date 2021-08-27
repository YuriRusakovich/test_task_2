require('dotenv').config();

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
    DB_PORT,
    DB_TEST_NAME
} = process.env;

module.exports = {
    'development': {
        'username': DB_USERNAME,
        'password': DB_PASSWORD,
        'database': DB_NAME,
        'host': DB_HOST,
        'dialect': DB_DIALECT,
        'port': DB_PORT
    },
    'test': {
        'username': DB_USERNAME,
        'password': DB_PASSWORD,
        'database': DB_TEST_NAME,
        'host': DB_HOST,
        'dialect': DB_DIALECT,
        'port': DB_PORT
    }
};
