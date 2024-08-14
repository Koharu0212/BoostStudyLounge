import React from 'react'
import "./Register.css"

export default function Login() {
  return (
	<div className="login">
		<div className="loginWrapper">
			<div className="loginLogo">Boost Study Lounge</div>
			<div className="loginBox">
				<input type="text" className="loginInput" placeholder="ユーザ名" />
				<input type="text" className="loginInput" placeholder="Eメール" />
				<input type="text" className="loginInput" placeholder="パスワード" />
				<button className="loginButton">サインアップ</button>
				<button className="loginRegisterButton">ログイン</button>
			</div>
		</div>
	</div>
  )
}
