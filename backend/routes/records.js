const express = require('express');
const router = express.Router();
const pool = require('../config/database');

/**
 * 特定のユーザの勉強記録を取得
 * @route GET /api/records/user/:username
 * @param {string} req.params.username - ユーザ名
 * @returns {Array} 200 - 勉強記録の配列
 * @returns {Error} 404 - ユーザが見つからない場合のエラー
 * @returns {Error} 500 - サーバエラー
 */
router.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    let connection;
    try {
        connection = await pool.getConnection();
        const [users] = await connection.query('SELECT user_id FROM users WHERE username = ?', [username]);
        
        if (users.length === 0) {
            return res.status(404).json({ error: '指定されたユーザーが見つかりません' });
        }
        
        const userId = users[0].user_id;
        const [records] = await connection.query('SELECT * FROM study_records WHERE user_id = ?', [userId]);
        return res.status(200).json(records);
    } catch (error) {
        console.error('勉強記録取得エラー:', error);
        return res.status(500).json({ error: '勉強記録の取得に失敗しました' });
    } finally {
        if (connection) connection.release();
    }
});

/**
 * 新しい勉強記録を作成
 * @route POST /api/records
 * @param {number} req.body.userId - ユーザID
 * @param {string} req.body.startDate - 勉強開始日時
 * @param {string} req.body.endDate - 勉強終了日時
 * @param {string} req.body.content - 勉強内容
 * @returns {Object} 201 - 成功メッセージ
 * @returns {Error} 500 - サーバエラー
 */
router.post('/', async (req, res) => {
    const { userId, startDate, endDate, content } = req.body;
    const measurementTime = Math.floor((new Date(endDate) - new Date(startDate)) / 1000);
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            'INSERT INTO study_records (user_id, start_date, end_date, measurement_time, content) VALUES (?, ?, ?, ?, ?)', 
            [userId, startDate, endDate, measurementTime, content]
        );
        return res.status(201).json({ message: '勉強記録が正常に作成されました' });
    } catch (error) {
        console.error('勉強記録作成エラー:', error);
        return res.status(500).json({ error: '勉強記録の作成に失敗しました' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;