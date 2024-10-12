const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

//ログイン
router.post('/login', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [userInfo] = await connection.query('SELECT * FROM users where email = ?', [req.body.email]);
		if (userInfo.length === 0) {
			return res.status(404).json("ユーザが見つかりません");
		}

		const validPassword = await bcrypt.compare(req.body.password, userInfo[0].password);
		if(!validPassword) {
			return res.status(400).json("パスワードが違います");
		}

		const token = jwt.sign(
			{ user_id: userInfo[0].user_id, username: userInfo[0].username },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		);
		res.status(200).json({ token, userInfo: { user_id: userInfo[0].user_id, username: userInfo[0].username } });
	} catch (error) {
		res.status(500).json({ error: "クエリに失敗しました"});
	} finally {
		if (connection) {
			connection.release();
		}
	}
})

//ユーザ登録
router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	let connection;
	try {
		// パスワードのハッシュ化
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
	  
		connection = await pool.getConnection();
		const [registeredUser] = await connection.query('INSERT INTO users (username, email, password) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = ? OR email = ?)', [username, email, hashedPassword, username, email]);
		
		if (registeredUser.affectedRows === 0) {
			return res.status(409).json({ message: '同じユーザ名またはメールアドレスが既に存在します。' });
		}
		return res.status(201).json({ message: 'ユーザ登録が完了しました。' });
	} catch (error) {
		res.status(500).json({error: 'パスワードのハッシュ化またはクエリに失敗しました'});
	} finally {
		if (connection) {
			connection.release();
		}
	}
});

  module.exports = router;