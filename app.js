const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');

// テンプレートエンジンとしてEJSを設定
app.set('view engine', 'ejs');

// cssなど静的ファイルの配置場所を設定
app.use(express.static(path.join(__dirname, 'public')));

//Body-Parserの使用 (クライアントから送信されたデータをreq.body経由で会得、操作できる)
app.use(express.json());

//POSTパラメータの受け取りに必要
app.use(express.urlencoded({extended: false}));

// サーバを起動
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',	
  port: 3306,
  database: 'study_record'
});

//MySQLへの接続が失敗した際に、エラーを出力
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

// ルートパスへのリクエストを処理
app.get('/', (req, res) => {
  res.render('top.ejs', { message: 'Boost Study  Lounge' });
});

//計測ページ・DBの勉強記録を表示
app.get('/study', (req, res) => {
  connection.query(
    'SELECT * FROM study_record',
    (error, results) => {
      if (error) throw error;
      res.render('study.ejs', { 
        records: results,
        formatDate: formatDate
      });
    }
  );
});

//計測終了時にDBに挿入
app.post('/save', (req, res) => {
  console.log(req.body);
  const { study_date, content, measurement_time } = req.body;

  connection.query(
    'INSERT INTO study_record (study_date, measurement_time, content) VALUES (?, ?, ?)',
    [study_date, measurement_time, content],
    (error, results) => {
      if (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// 日付フォーマット関数
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}