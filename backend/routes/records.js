const express = require('express');
const router = express.Router();
const connection = require('../config/database');

//勉強記録を取得
router.get('/:username', (req, res) => {
	const username = req.params.username;
	//usernameを使用してuser_idを取得後、user_idを使用して勉強記録を取得
	connection.query(
	  'SELECT * from users where username = ?',
	  [username],
	  (error, results) => {
		if (error) {
		  return res.status(500).json({ error: 'クエリに失敗しました' });
		}
		if (results.length === 0) {
		  return res.status(404).json({ error: 'User not found' });
		}
  
		const userId = results[0].user_id;
		connection.query(
		  'SELECT * FROM study_record WHERE user_id = ?',
		  [userId],
		  (error, results) => {
			if (error) {
			  return res.status(500).json({ error: 'クエリに失敗しました' });
			}
			return res.status(200).json(results);
		  }
		);
	  }
	)
  })

  module.exports = router;