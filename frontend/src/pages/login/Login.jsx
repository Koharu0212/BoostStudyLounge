import React from 'react'
import "./Login.css"

export default function Login() {
  return (
	<div className="login">
		<div className="loginWrapper">
			<div className="loginLogo">Boost Study Lounge</div>
			<div className="loginBox">
				<input type="text" className="loginInput" placeholder="Eメール" />
				<input type="text" className="loginInput" placeholder="パスワード" />
				<button className="loginButton">ログイン</button>
				<span className="loginForgot">パスワードを忘れた方はこちら</span>
				<button className="loginRegisterButton">アカウント作成</button>
			</div>
		</div>
	</div>
  )
}
