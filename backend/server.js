const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 3001;
const pool = require('./config/database');

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200 
}));

// テンプレートエンジンとしてEJSを設定
app.set('view engine', 'ejs');

// cssなど静的ファイルの配置場所を設定
app.use(express.static(path.join(__dirname, 'public')));

//Body-Parserの使用 (クライアントから送信されたデータをreq.body経由で会得、操作できる)
app.use(express.json());

//POSTパラメータの受け取りに必要
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/seats', require('./routes/seats'));
app.use('/api/records', require('./routes/records'));

// サーバを起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.get('/', (req, res) => {
  try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.status(201).send('ok')
  } catch (error) {
      console.error(error)
  }
})