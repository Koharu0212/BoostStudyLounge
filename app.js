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

//セッションの利用設定
app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = 'ゲスト';
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

// サーバを起動
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const connection_users  = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',	
  port: 3306,
  database: 'users'
});

connection_users.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success: users');
});

const connection_record = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',	
  port: 3306,
  database: 'study_record'
});

connection_record.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success: study_record');
});

const seats = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',	
  port: 3306,
  database: 'seats'
});

seats.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success: seats');
});

// ルートパスへのリクエストを処理
app.get('/', (req, res) => {
  res.render('top.ejs', { message: 'Boost Study  Lounge' });
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs', { errors: [] });
});

app.post('/signup', 
  (req, res, next) => {
    //console.log('入力値の空チェック');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    if (username === '') {
      errors.push('ユーザー名が空です');
    }

    if (email === '') {
      errors.push('メールアドレスが空です');
    }

    if (password === '') {
      errors.push('パスワードが空です');
    }

    if (errors.length > 0) {
      res.render('signup.ejs', { errors: errors });
    } else {
      next();
    }
  },
  (req, res, next) => {
    console.log('メールアドレスの重複チェック');
    const email = req.body.email;
    const errors = [];
    connection_users.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        if (results.length > 0) {
          errors.push('ユーザー登録に失敗しました');
          res.render('signup.ejs', { errors: errors });
        } else {
          next();
        }
      }
    );
  },
  (req, res) => {
    console.log('ユーザー登録');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10, (error, hash) => {
      connection_users.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash],
        (error, results) => {
          req.session.userId = results.insertId;
          req.session.username = username;
          res.redirect('/room');
        }
      );
    });
  }
);

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  connection_users.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        const plain = req.body.password;        
        const hash = results[0].password;
    
        // パスワードを比較
        bcrypt.compare(plain, hash, (error, isEqual) => {
          if(isEqual) {
            req.session.userId = results[0].user_id;
            req.session.username = results[0].username;
            res.redirect('/room');
          } else {
            res.redirect('/login');
          }
        });
        
      } else {
        res.redirect('/login');
      }
    }
  );
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/');
  });
});

//計測ページ・DBの勉強記録を表示
app.get('/study', (req, res) => {
  const user_id = req.session.userId;
  connection_record.query(
    'SELECT * FROM study_record where user_id = ?',
    [user_id],
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
  const { study_date, content, measurement_time } = req.body;
  const user_id = req.session.userId;
  connection_record.query(
    'INSERT INTO study_record (user_id, study_date, measurement_time, content) VALUES (?, ?, ?, ?)',
    [user_id, study_date, measurement_time, content],
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

app.get('/mypage', (req, res) => {
  const user_id = req.session.userId;
  connection_record.query(
    'SELECT * FROM study_record where user_id = ?',
    [user_id],
    (error, results) => {
      if (error) throw error;
      res.render('mypage.ejs', { 
        records: results,
        formatDate: formatDate
      });
    }
  );
});

app.get('/room', (req, res) => {
  res.render('room.ejs');
});

// 座席状況の取得
app.get('/api/seats', (req, res) => {
  seats.query('SELECT * FROM seats', (error, results) => {
    if (error) throw error;
    res.json(results.map(row => row.reserved));
  });
});

// 座席の予約
app.post('/api/reserve', (req, res) => {
  const { seatIndex } = req.body;
  seats.query('SELECT user_id FROM seats WHERE id = ?', [seatIndex], (error, results) => {
    if (error) throw error;
    if (results[0].user_id === 0) {
      seats.query('UPDATE seats SET user_id = 1 WHERE id = ?', [seatIndex], (error) => {
        if (error) throw error;
        res.json({ success: true });
      });
    } else {
      res.json({ success: false, message: 'Seat already reserved' });
    }
  });
});

// 座席の解放
app.post('/api/release', (req, res) => {
  const { seatIndex } = req.body;
  seats.query('UPDATE seats SET user_id = 0 WHERE id = ?', [seatIndex], (error) => {
    if (error) throw error;
    res.json({ success: true });
  });
});