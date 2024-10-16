const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const cron = require('node-cron');

/** 最大勉強時間（12時間） */
const MAX_STUDY_TIME = 12 * 60 * 60 * 1000;

/**
 * 全ての座席情報を取得
 * @route GET /api/seats
 * @returns {Array} 200 - 座席情報の配列
 * @returns {Error} 500 - サーバエラー
 */
router.get('/', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query('SELECT * FROM seats ORDER BY seat_id');
		return res.status(200).json(rows);
	} catch (error) {
		return res.status(500).json({ error: 'クエリに失敗しました' });
	} finally {
		if (connection) {
			connection.release();
		}
	}
  });

  /**
 * 特定のユーザーが着席している席を取得
 * @route GET /api/seats/user/:userId
 * @param {string} req.params.userId - ユーザID
 * @returns {Array} 200 - 着席している席のID
 * @returns {Error} 500 - サーバエラー
 */
  router.get('/user/:userId', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query('SELECT seat_id FROM seats WHERE user_id = ?', req.params.userId);
		return res.status(200).json(rows);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'クエリに失敗しました' });
	} finally {	
		if (connection) {
			connection.release();
		}
	}
  })

  /**
 * 特定の席に着席
 * @route PUT /api/seats/:seatId/occupy
 * @param {string} req.params.seatId - 座席ID
 * @param {string} req.body.userId - ユーザID
 * @returns {Object} 200 - 成功メッセージ
 * @returns {Error} 400 - バリデーションエラー
 * @returns {Error} 404 - 座席が見つからない
 * @returns {Error} 500 - サーバエラー
 */
  router.put('/:seatId/occupy', async (req, res) => {
	const { userId } = req.body;
	const { seatId } = req.params;
	let connection;
	try {
		connection = await pool.getConnection();
   		await connection.beginTransaction();
		const [rows] = await connection.query('SELECT user_id FROM seats WHERE seat_id = ? FOR UPDATE', [seatId]);
		if (rows.length === 0) {
			await connection.rollback();
			return res.status(404).json({ error: '指定された席が見つかりません' });
			
		}
		if (rows[0].user_id !== null) {
			await connection.rollback();
			return res.status(400).json({ error: 'この席は既に占有されています' });
		}

		const [checkOccupy] = await connection.query('SELECT seat_id FROM seats WHERE user_id = ?', [userId]);
		if (checkOccupy.length > 0) {
			await connection.rollback();
			return res.status(400).json({ error: 'ユーザーは既に別の席に座っています' });
		}

		//席を更新
		await connection.query(
			'UPDATE seats SET user_id = ?, start_time = CURRENT_TIMESTAMP WHERE seat_id = ?', 
			[userId, seatId]
		);
		await connection.commit();
		return res.status(200).json({ message: '着席に成功しました' });
	} catch (error) {
		if (connection) {
			await connection.rollback();
			return  res.status(500).json({error: 'クエリに失敗しました'});
		}
	} finally {
		if (connection) {
			connection.release();
		}
	}
});

/**
 * 特定の席から離席
 * @route PUT /api/seats/:seatId/vacate
 * @param {string} req.params.seatId - 座席ID
 * @param {string} req.body.userId - ユーザID
 * @returns {Object} 200 - 成功メッセージ
 * @returns {Error} 400 - バリデーションエラー
 * @returns {Error} 404 - 座席が見つからない
 * @returns {Error} 500 - サーバエラー
 */
router.put('/:seatId/vacate', async (req, res) => {
	const { userId } = req.body;
	const { seatId } = req.params;
	let connection;
	try {
		connection = await pool.getConnection();
   		await connection.beginTransaction();
		const [rows] = await connection.query('SELECT user_id FROM seats WHERE seat_id = ? FOR UPDATE', [seatId]);
		if (rows.length === 0) {
			return res.status(404).json({ error: '指定された席が見つかりません' });
		}
		if (rows[0].user_id !== userId) {
			return res.status(400).json({ error: 'この席に指定したユーザが着席していません' });
		}
		await connection.query('UPDATE seats SET user_id = NULL, start_time = NULL WHERE seat_id = ?', [seatId]);
		await connection.commit();
		res.status(200).json({ message: '離席に成功しました' });
	} catch (error) {
		if (connection) {
			await connection.rollback();
			return res.status(500).json({error: 'クエリに失敗しました'});
		}
	} finally {
		if (connection) {
			connection.release();
		}
	}
});

/**
 * 特定の席の情報を取得
 * @route GET /api/seats/:seatId
 * @param {string} req.params.seatId - 座席ID
 * @returns {Object} 200 - 座席情報
 * @returns {Error} 404 - 座席が見つからない
 * @returns {Error} 500 - サーバエラー
 */
router.get('/:seatId', async (req, res) => {
	const seatId = req.params.seatId;
	let connection;
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query('SELECT user_id, start_time FROM seats WHERE seat_id = ?', [seatId]);
		if (rows.length === 0) {
			return res.status(404).json({ error: '指定された席が見つかりません' });
		}
		return res.status(200).json(rows[0]);
	} catch (error) {
		if (connection) {
			return  res.status(500).json({error: 'クエリに失敗しました'});
		}
	} finally {
		if (connection) {
			connection.release();
		}
	}
});

/**
 * 定期的に12時間以上着席しているユーザをチェックし、自動で離席させる
 */
cron.schedule('*/1 * * * *', async () => {
	console.log('自動離席処理を開始します');
	let connection;
	try {
		connection = await pool.getConnection();
		const [occupiedSeat] = await connection.query(
			'SELECT seat_id, user_id, start_time FROM seats WHERE user_id IS NOT NULL'
	  	);
		for (const seat of occupiedSeat) {
			const currentTime = new Date();
			const elapsedTime = new Date() - new Date(seat.start_time);
			if (elapsedTime >= MAX_STUDY_TIME) {
				console.log(`離席対象発見：userId=${seat.user_id}`);
				await autoVacateSeat(connection, currentTime, seat.seat_id, seat.user_id, seat.start_time);
			}
	  	}
		console.log('自動離席処理を終了します');
	} catch (error) {
		console.error('Error in cron job:', error);
	} finally {
	  if (connection) {
		connection.release();
	  }
	}
});

/**
 * 自動離席処理を行う関数
 * @param {Object} connection - データベース接続オブジェクト
 * @param {Date} currentTime - ユーザに対して自動離席処理が開始された現在時刻
 * @param {string} seatId - 座席ID
 * @param {string} userId - ユーザID
 * @param {Date} startTime - 着席開始時間
 */
async function autoVacateSeat(connection, currentTime, seatId, userId, startTime) {
	try {
		connection = await pool.getConnection();
		await connection.beginTransaction();
		await connection.query('UPDATE seats SET user_id = NULL, start_time = NULL WHERE seat_id = ?', [seatId]);
	  	const measurementTime = Math.min(Math.floor((currentTime - new Date(startTime)) / 1000), MAX_STUDY_TIME / 1000);
	  	await connection.query(
			'INSERT INTO study_records (user_id, start_date, end_date, measurement_time, contents) VALUES (?, ?, ?, ?, ?)',
			[userId, startTime, currentTime, measurementTime, '着席時間が12時間を超えたため、自動離席しました。']
	  	);
		await connection.commit();
		console.log(`userId${userId}の離席処理が完了しました`);
	} catch (error) {
		if (connection) {
			await connection.rollback();
		}
		console.error('Error in autoVacateSeat:', error);
	} finally {
		if (connection) {
			connection.release();
		}
	}
}

module.exports = router;