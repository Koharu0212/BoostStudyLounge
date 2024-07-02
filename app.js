const express = require('express');
const path = require('path');

const app = express();

// テンプレートエンジンとしてEJSを設定
app.set('view engine', 'ejs');

// viewsディレクトリのパスを設定
app.set('views', path.join(__dirname, 'views'));

// ルートパスへのリクエストを処理
app.get('/', (req, res) => {
  res.render('top', { message: 'Hello World' });
});

// サーバーを起動
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});