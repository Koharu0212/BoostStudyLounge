import React, {useRef} from 'react'
import "./Register.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordConfirmation = useRef();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		console.log(password.current.value);
		console.log(passwordConfirmation.current.value);
	
		//パスワードと確認用パスワードが合っているかどうか確認
		if (password.current.value !== passwordConfirmation.current.value) {
			passwordConfirmation.current.setCustomValidity("パスワードが違います");
		} else {
		  try {
			const user = {
			  username: username.current.value,
			  email: email.current.value,
			  password: password.current.value,
			};
			
			const response = await axios.post("http://localhost:3001/api/auth/register", user);
			console.log(response);
			navigate("/login");
		  } catch (err) {
			console.log(err);
		  }
		}
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLogo">Boost Study Lounge</div>
				<form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
					<input type="text" className="loginInput" placeholder="ユーザ名" required ref={username}/>
					<input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
					<input type="password" className="loginInput" placeholder="パスワード" required minLength={6} ref={password}/>
					<input type="password" className="loginInput" placeholder="確認用パスワード" required minLength={6} ref={passwordConfirmation}/>
					<button className="loginButton">サインアップ</button>
					<button className="loginRegisterButton" onClick={() => navigate('/login')}>ログイン</button>
				</form>
			</div>
		</div>
	)
}
