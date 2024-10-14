const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// ログイン
router.post('/login', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [userInfo] = await connection.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
        if (userInfo.length === 0 || !(await bcrypt.compare(req.body.password, userInfo[0].password))) {
            return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
        }

        const token = jwt.sign(
            { user_id: userInfo[0].user_id, username: userInfo[0].username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        const expiresIn = new Date(Date.now() + parseInt(process.env.JWT_EXPIRE) * 1000).toISOString();
        res.status(200).json({ 
            token, 
            expiresIn,
            userInfo: { user_id: userInfo[0].user_id, username: userInfo[0].username } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "ログイン処理中にエラーが発生しました" });
    } finally {
        if (connection) connection.release();
    }
});

// ユーザ登録
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    let connection;
    try {
        // 入力値のバリデーション
        if (!username || !email || !password) {
            return res.status(400).json({ error: "すべての項目を入力してください" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "パスワードは6文字以上である必要があります" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [existingUser] = await connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        if (existingUser.length > 0) {
            await connection.rollback();
            return res.status(409).json({ error: '同じユーザ名またはメールアドレスが既に存在します' });
        }

        await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        await connection.commit();

        return res.status(201).json({ message: 'ユーザ登録が完了しました' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Registration error:', error);
        res.status(500).json({ error: 'ユーザ登録中にエラーが発生しました' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;