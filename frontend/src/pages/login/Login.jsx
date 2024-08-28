import React from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'

export default function Login() {
	const navigate = useNavigate();

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLogo">Boost Study Lounge</div>
				<div className="loginBox">
					<input type="text" className="loginInput" placeholder="Eメール" />
					<input type="text" className="loginInput" placeholder="パスワード" />
					<button className="loginButton">ログイン</button>
					<button className="loginRegisterButton" onClick={() => navigate('/register')}>アカウント作成</button>
				</div>
			</div>
		</div>
	)
}
