// src/models/db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Web_store',
    password: 'Kanton731',
    port: 5432,
});

module.exports = pool;
