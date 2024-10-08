import React, { useRef, useState } from 'react'
import "./Register.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();
    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError("");

        //パスワードと確認用パスワードが合っているかどうか確認
        if (password.current.value !== passwordConfirmation.current.value) {
            setRegisterError("パスワードが一致しません");
            return;
        }

        try {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            await axios.post("http://localhost:3001/api/auth/register", user);
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.data) {
                setRegisterError(err.response.data.message || "登録に失敗しました");
            } else {
                setRegisterError("登録中にエラーが発生しました");
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLogo">Boost Study Lounge</div>
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    {registerError && <div className="errorMessage">{registerError}</div>}
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