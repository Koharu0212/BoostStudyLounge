const express = require('express');
const router = express.Router();
const pool = require('../config/database');

//勉強記録を取得
router.get('/user/:username', async (req, res) => {
	const username = req.params.username;
	let connection;
	//usernameを使用してuser_idを取得後、user_idを使用して勉強記録を取得
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query('SELECT * from users where username = ?', [username]);
		if (rows.length === 0) {
			return res.status(404).json({ error: '指定されたユーザが見つかりません' });
		}
		
		const userId = rows[0].user_id;
		const [records] = await connection.query('SELECT * FROM study_records WHERE user_id = ?', [userId]);
		return res.status(200).json(records);
	} catch (error) {
		return res.status(500).json({ error: 'クエリに失敗しました' });
	} finally {
		if (connection) {
			connection.release();
		}
	}
})

  //勉強時間・内容を記録
router.post('/', async (req, res) => {
	const { userId, startDate, endDate, measurementTime, contents } = req.body;
	let connection;
	try {
		connection = await pool.getConnection();
		await connection.query(
			'INSERT INTO study_records (user_id, start_date, end_date, measurement_time, contents) VALUES (?, ?, ?, ?, ?)', 
			[userId, startDate, endDate, measurementTime, contents]
		);
		return res.status(200).json();
	} catch (error) {
		return res.status(500).json({ error: 'クエリに失敗しました' });
	} finally {
		if (connection) {
			connection.release();
		}
	}
})

module.exports = router;