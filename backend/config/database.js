const mysql = require('mysql2/promise');
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: 'boost_study_lounge',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

module.exports = pool;