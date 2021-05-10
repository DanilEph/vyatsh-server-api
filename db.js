const { Pool } = require("pg/lib");

const pool = new Pool({
    user: 'postgres',
    password: 'vovaganna13',
    database: 'Online-shop',
    host: 'localhost',
    port: '5432'
});

module.exports = pool;