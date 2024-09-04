const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3001;

// テンプレートエンジンとしてEJSを設定
app.set('view engine', 'ejs');

// cssなど静的ファイルの配置場所を設定
app.use(express.static(path.join(__dirname, 'public')));

//Body-Parserの使用 (クライアントから送信されたデータをreq.body経由で会得、操作できる)
app.use(express.json());

//POSTパラメータの受け取りに必要
app.use(express.urlencoded({extended: false}));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200 
}));

// サーバを起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const connection  = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',	
  port: 3306,
  database: 'boost_study_lounge'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('connection success');
});

app.get('/', (req, res) => {
  try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.status(201).send('ok')
  } catch (error) {
      console.error(error)
  }
})

//ユーザ情報を取得
app.get('/api/users', (req, res) => {
  connection.query(
    'SELECT user_id, username FROM users',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query failed' });
      }
      return res.status(200).json(results);
    }
  )
})

//座席情報を取得
app.get('/api/seats', (req, res) => {
  connection.query(
    'SELECT * FROM seats',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query failed' });
      }
      return res.status(200).json(results);
    }
  )
})

//勉強記録を取得
app.get('/api/records/:username', (req, res) => {
  const username = req.params.username;
  //usernameを使用してuser_idを取得後、user_idを使用して勉強記録を取得
  connection.query(
    'SELECT * from users where username = ?',
    [username],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database query failed' });
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
            return res.status(500).json({ error: 'Database query failed' });
          }
          return res.status(200).json(results);
        }
      );
    }
  )
})
