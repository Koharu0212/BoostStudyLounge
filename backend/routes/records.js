const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const moment = require('moment');

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

  //勉強時間・内容を記録
  router.post('/:userId', (req, res) => {
	const user_id = req.params.userId;
	const start_date = req.body.start_date;
	const end_date = req.body.end_date;
	const contents = req.body.contents;

	//計測時間(s)の算出
	const measurement_time = moment(end_date).diff(moment(start_date), 'second');

	connection.query(
		'INSERT INTO study_records (user_id, start_date, end_date, measurement_time, contents) VALUES (?, ?, ?, ?, ?)',
		[user_id, start_date, end_date, measurement_time, contents],
		(error, results) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ error: 'クエリに失敗しました' });
			}
			return res.status(200).json(results);
		}
	);
  })

  module.exports = router;