import React, { useRef, useContext } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';

export default function Login() {
	const email = useRef();
	const password = useRef();
	const { dispatch } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		loginCall(
			{
				email: email.current.value,
				password: password.current.value,
			},
			dispatch
		)
	}

	// console.log(user);
	
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLogo">Boost Study Lounge</div>
				<form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
					<input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
					<input type="password" className="loginInput" placeholder="パスワード" required ref={password}/>
					<button className="loginButton" type="submit">ログイン</button>
					<button className="loginRegisterButton" type="button" onClick={() => navigate('/register')}>
						アカウント作成
					</button>
				</form>
			</div>
		</div>
	)
}
