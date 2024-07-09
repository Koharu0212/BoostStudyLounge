const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');

// テンプレートエンジンとしてEJSを設定
app.set('view engine', 'ejs');

// cssなど静的ファイルの配置場所を設定
app.use(express.static(path.join(__dirname, 'public')))

// サーバを起動
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',	
  database: 'study_record'
});

// ルートパスへのリクエストを処理
app.get('/', (req, res) => {
  res.render('top.ejs', { message: 'Boost Study  Lounge' });
});

//計測ページ・DBの勉強記録を表示
app.get('/study', (req, res) => {
  connection.query(
    'SELECT * FROM articles',
    (error, results) => {
      res.render('study.ejs');
    }
  );
});

//計測終了時にDBに挿入
app.post('/study', (req, res) => {
  connection.query(
    'INSERT INTO tbl_users (start_time, end_time, measured_time, content) VALUES (?, ?, ?, ?)',
    [req.body.userName, req.body.userAge],
    (error, results) => {
      res.redirect('/');
    }
  );
});

