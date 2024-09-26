const express = require('express');
const router = express.Router();
const connection = require('../config/database');

//座席情報を取得
router.get('/', (req, res) => {
	connection.query(
	  'SELECT * FROM seats ORDER BY seat_id',
	  (error, results) => {
		if (error) {
			console.log(error);
			return res.status(500).json({ error: 'クエリに失敗しました' });
		}
		return res.status(200).json(results);
	  }
	)
  })

  //ユーザが着席している席を取得
  router.get('/:userId', (req, res) => {
	connection.query(
		'SELECT seat_id FROM seats WHERE user_id = ?',
		[req.params.userId],
		(error, results) => {
			if(error) {
				return res.status(500).json({ error: 'クエリに失敗しました' });
			}
			return res.status(200).json(results);
		}
	)
  })

  //着席
  router.put('/occupy', (req, res) => {
	const { userId, seatId } = req.body;
	connection.beginTransaction((err) => {
	  if (err) {
		return res.status(500).json({ error: 'トランザクションの開始に失敗しました' });
	  }
  
	  //席が空いているか確認
	  connection.query(
		'SELECT user_id FROM seats WHERE seat_id = ? FOR UPDATE', //他のユーザが着席できないよう排他制御
		[seatId],
		(error, results) => {
		  if (error) {
			return connection.rollback(() => {
			  res.status(500).json({ error: 'クエリに失敗しました' });
			});
		  }
  
		  if (results.length === 0) {
			return connection.rollback(() => {
			  res.status(404).json({ error: '指定された席が見つかりません' });
			});
		  }
  
		  if (results[0].user_id !== null) {
			return connection.rollback(() => {
			  res.status(400).json({ error: 'この席は既に占有されています' });
			});
		  }
  
		  //ユーザーが既に他の席に座っていないか確認
		  connection.query(
			'SELECT seat_id FROM seats WHERE user_id = ?',
			[userId],
			(error, results) => {
			  if (error) {
				return connection.rollback(() => {
				  res.status(500).json({ error: 'クエリに失敗しました' });
				});
			  }
  
			  if (results.length > 0) {
				return connection.rollback(() => {
				  res.status(400).json({ error: 'ユーザーは既に別の席に座っています' });
				});
			  }
  
			  //席を更新
			  connection.query(
				'UPDATE seats SET user_id = ?, start_time = CURRENT_TIMESTAMP WHERE seat_id = ?',
				[userId, seatId],
				(error, results) => {
				  if (error) {
					return connection.rollback(() => {
					  res.status(500).json({ error: 'クエリに失敗しました' });
					});
				  }
  
				  connection.commit((err) => {
					if (err) {
					  return connection.rollback(() => {
						res.status(500).json({ error: 'コミットに失敗しました' });
					  });
					}
					res.status(200).json({ message: '席の占有に成功しました' });
				  });
				}
			  );
			}
		  );
		}
	  );
	});
  });

  //離席
  router.put('/vacate', (req, res) => {
	const { userId, seatId } = req.body;
  
	// 指定された席にユーザが座っているか確認
	connection.query(
	  'SELECT user_id FROM seats WHERE seat_id = ?',
	  [seatId],
	  (error, results) => {
		if (error) {
		  return res.status(500).json({ error: 'クエリに失敗しました' });
		}
  
		// 存在しない場合
		if (results.length === 0) {
		  return res.status(404).json({ error: '指定された席が見つかりません' });
		}
  
		const seat = results[0];
  
		// 座っているのが別のユーザ、または誰も座っていない場合
		if (seat.user_id !== userId) {
		  return res.status(400).json({ error: 'この席に指定したユーザが着席していません' });
		}
  
		// 席の開放
		connection.query(
			'UPDATE seats SET user_id = NULL, start_time = NULL WHERE seat_id = ?',
			[seatId],
			(error, results) => {
			  if (error) {
				  res.status(500).json({ error: 'クエリに失敗しました' });
			  }
			  res.status(200).json({ message: '席の開放に成功しました' });
			}
		  );
		}
	  );
	});

	router.get('/status/:seatId', (req, res) => {
		const seatId = req.params.seatId;
		connection.query(
		  'SELECT user_id, start_time FROM seats WHERE seat_id = ?',
		  [seatId],
		  (error, results) => {
			if (error) {
			  return res.status(500).json({ error: 'クエリに失敗しました' });
			}
			if (results.length === 0) {
			  return res.status(404).json({ error: '指定された席が見つかりません' });
			}
			return res.status(200).json(results[0]);
		  }
		);
	  });

  module.exports = router;