const express = require('express');
const router = express.Router();
const connection = require('../config/database');

//ユーザ情報を取得
router.get('/', (req, res) => {
	connection.query(
	  'SELECT user_id, username FROM users',
	  (error, results) => {
		if (error) {
		  return res.status(500).json({ error: 'クエリに失敗しました' });
		}
		return res.status(200).json(results);
	  }
	)
  })

  module.exports = router;