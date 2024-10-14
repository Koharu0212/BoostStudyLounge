const express = require('express');
const router = express.Router();
const pool = require('../config/database');

//ユーザ情報を取得
router.get('/', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query('SELECT user_id, username FROM users');
		return res.status(200).json(rows);
	} catch (error) {
		return res.status(500).json({ error: 'クエリに失敗しました' });
	} finally {
		if (connection) {
			connection.release();
		}
	}
})

module.exports = router;