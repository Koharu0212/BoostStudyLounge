const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');

//ログイン
router.post('/login', (req, res) => {
	connection.query(
		'SELECT * FROM users where email = ?',
		[req.body.email],
		async (error, results) => {
			if (error) {
				return res.status(500).json({ error: "クエリに失敗しました"});
			}
	
			if(results.length === 0) {
				return res.status(404).json("ユーザが見つかりません");
			}
	
			const validPassword = await bcrypt.compare(req.body.password, results[0].password);      
			if(!validPassword) {
				return res.status(400).json("パスワードが違います");
			}
		  
			const token = jwt.sign(
				{ user_id: results[0].user_id, username: results[0].username },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRE }
			);
	
		  return res.status(200).json({ token, userInfo: { user_id: results[0].user_id, username: results[0].username } });
		}
	  )
  })

  //ユーザ登録
router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	
	try {
	  // パスワードのハッシュ化
	  const saltRounds = 10;
	  const hashedPassword = await bcrypt.hash(password, saltRounds);
	  
	  connection.query(
		'INSERT INTO users (username, email, password) SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = ? OR email = ?)',
		[username, email, hashedPassword, username, email],
		(error, results) => {
		  if (error) {
			return res.status(500).json({ error: 'クエリに失敗しました' });
		  }
	
		  if (results.affectedRows === 0) {
			return res.status(409).json({ message: '同じユーザ名またはメールアドレスが既に存在します。' });
		  }
	
		  return res.status(201).json({ message: 'ユーザ登録が完了しました。' });
		}
	  );
	} catch (err) {
	  return res.status(500).json({ error: 'パスワードのハッシュ化に失敗しました' });
	}
  });

  module.exports = router;