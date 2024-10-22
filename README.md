# Boost Study Lounge
オンライン自習室をテーマとしたWebアプリケーションです。ユーザに勉強の記録と管理ができるプラットフォームを提供します。
## 目次
* [技術スタック](#技術スタック)
* [機能](#機能)
* [セットアップ方法](#セットアップ方法)
* [使い方](#使い方)
* [今後の展望](#今後の展望)
## 技術スタック
* React.js 18.3.1
* Node.js 22.3.0
* Express 4.19.2
* MySQL 8.0.21 
* JWT 9.0.2

## 機能
- ユーザー認証（ログイン、新規登録、JWT認証）
<img width="1765" alt="image" src="https://github.com/user-attachments/assets/39b2f0d2-844c-457f-a041-b51a3238a17c">

- 自習室機能（座席選択、リアルタイム座席状況表示）
<img width="1441" alt="image" src="https://github.com/user-attachments/assets/c1ea40dc-2957-4c77-8ed4-1f18c1aeb8b4">

- 学習管理（勉強時間の計測、勉強内容の記録、自動離席機能）
  <img width="1629" alt="image" src="https://github.com/user-attachments/assets/6079c905-f63c-43c9-9066-d10c6ef048b4">
  
- マイページ（勉強履歴の表示）
  <img width="1441" alt="image" src="https://github.com/user-attachments/assets/8bb71581-c566-470e-af97-a1892f29fb33">

## セットアップ方法
### 1. リポジトリをクローン
  
```sh
git clone https://github.com/Koharu0212/BoostStudyLounge
cd BoostStudyLounge
```
### 2. フロントエンド側とバックエンド側のセットアップ
   
CUI（ターミナルまたはコマンドプロンプト）を2つ開き、それぞれで以下のコマンドを実行します。

フロントエンド側：
```sh
cd frontend
```
バックエンド側：
```sh
cd backend
```
### 3. データベースの初期化
バックエンド側のCUIで以下のコマンドを実行し、MySQLデータベースを初期化します。
```sh
mysql -u root -p < initialize.sql
```
プロンプトが表示されたら、MySQLのrootパスワードを入力してください。
### 4. 依存関係のインストール
フロントエンド側・バックエンド側の両方のCUIで以下のコマンドを実行し、必要なnpmパッケージをインストールします。
```sh
npm install
```
### 5. 環境変数の設定
frontendとbackendディレクトリにそれぞれにある.env.sampleファイルを.envにリネームし、必要に応じて値を変更してください。

バックエンド側：backend/.env
```sh
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_PORT=3306
JWT_SECRET=jwt_secret_key
JWT_EXPIRE=1h
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:3001
SERVER_PORT=3001
```
フロントエンド側：frontend/.env
```sh
REACT_APP_API_URL=http://localhost:3001
```

### 6. アプリケーションの起動
フロントエンド側・バックエンド側の両方のCUIで以下のコマンドを実行してください。
```sh
npm start
```

## 使い方
1. トップページから新規登録をクリックしてユーザ作成
2. 作成したユーザ情報を用いてログイン
3. 座席画面にて、空席を選択
4. 勉強内容を入力し、開始をクリックして計測を開始
5. 終了をクリックして計測を終了
6. 画面上部のPersonalアイコンをクリックして、記録した勉強を閲覧

## 今後の展望
このアプリケーションは継続的に改善を行っています。以下は今後実装予定の項目です。
1. Dockerの使用
   - サンプルデータを含むDockerイメージの提供
  
2. セキュリティの強化
   - 入力値バリデーションの厳密化（メールアドレス形式、パスワード複雑性など）
   - セキュリティヘッダーの追加
   - JWTトークン管理の改善
   - パラメータ化クエリの使用によるSQLインジェクション対策の強化
   - ユーザー情報の最小限の返却

3. データベース操作の最適化
   - トランザクション管理の改善と抽象化
   - クエリのパフォーマンス最適化
   - ページネーションの実装

4. エラーハンドリングとログ機能の強化
   - 統一されたログライブラリの使用
   - 詳細なエラーログの記録
   - クライアントへの適切なエラーメッセージの返却

5. エラー監視システムの導入

6. 新機能の追加
    - ログインなしでアプリケーションの使用を許可
    - パスワード再発行
    - 勉強履歴の編集・削除
    - ポモドーロタイマーの導入
    - 外部サービス連携
