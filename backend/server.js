const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

require('dotenv').config();

/**
 * CORSの設定
 * クライアントのURLからのリクエストのみを許可し、
 * クレデンシャルを含むリクエストを許可する
 */
app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,
  optionsSuccessStatus: 200 
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/**
 * ルーティングの設定
 * 各APIエンドポイントに対応するルーターを設定
 */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/seats', require('./routes/seats'));
app.use('/api/records', require('./routes/records'));

/**
 * サーバの起動
 * 環境変数で指定されたポートでサーバーを起動
 */
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at ${process.env.SERVER_URL}`);
});

/**
 * ルートパスへのGETリクエストのハンドラ
 * CORSヘッダーを設定し、簡単な応答を返す
 */
app.get('/', (req, res) => {
  try {
      res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
      res.status(201).send('ok')
  } catch (error) {
      console.error(error)
  }
})