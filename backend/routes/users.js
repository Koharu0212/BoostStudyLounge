const express = require('express');
const router = express.Router();
const pool = require('../config/database');

/**
 * 全てのユーザ情報を取得
 * @route GET /api/users
 * @returns {Array} 200 - ユーザ情報の配列（user_id, username）
 * @returns {Error} 500 - サーバエラー
 */
router.get('/', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [users] = await connection.query('SELECT user_id, username FROM users');
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error: 'クエリに失敗しました' });
	} finally {
		if (connection) {
			connection.release();
		}
	}
})

module.exports = router;