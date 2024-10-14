const mysql = require('mysql2/promise');
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_PORT) {
  console.error('データベース接続に必要な環境変数が設定されていません');
  process.exit(1);
}

/**
 * MySQL接続プールの作成
 * 
 * @type {import('mysql2/promise').Pool}
 */
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

/**
 * 接続テスト
 * サーバ起動時にデータベース接続を確認
 */
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('データベースに正常に接続されました');
    connection.release();
  } catch (error) {
    console.error('データベース接続エラー:', error);
    process.exit(1);
  }
})();

module.exports = pool;