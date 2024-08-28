import React from 'react'
import "./Register.css"
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const navigate = useNavigate();

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLogo">Boost Study Lounge</div>
				<div className="loginBox">
					<input type="text" className="loginInput" placeholder="ユーザ名" />
					<input type="text" className="loginInput" placeholder="Eメール" />
					<input type="text" className="loginInput" placeholder="パスワード" />
					<button className="loginButton">サインアップ</button>
					<button className="loginRegisterButton" onClick={() => navigate('/login')}>ログイン</button>
				</div>
			</div>
		</div>
	)
}
