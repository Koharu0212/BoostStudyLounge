import React, { useRef, useContext, useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { loginCall } from '../../services/actionCalls';
import { AuthContext } from '../../state/AuthContext';

/**
 * Login ページ
 * ログインフォームを提供するページ
 * 
 * @returns {JSX.Element} Login ページの JSX
 */
export default function Login() {
    const email = useRef();
    const password = useRef();
    const { dispatch, isFetching } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

     /**
     * フォーム送信時の処理を行う関数
     * 
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            await loginCall(
                {
                    email: email.current.value,
                    password: password.current.value,
                },
                dispatch
            );
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setLoginError("メールアドレスが違います。");
                } else if (err.response.status === 400) {
                    setLoginError("パスワードが違います。");
                } else {
                    setLoginError("ログインに失敗しました。");
                }
            } else {
                setLoginError("ネットワークエラーが発生しました。");
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLogo">Boost Study Lounge</div>
                <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                    {loginError && <div className="errorMessage">{loginError}</div>}
                    <input type="email" className="loginInput" placeholder="Eメール" required ref={email}/>
                    <input type="password" className="loginInput" placeholder="パスワード" required ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        {isFetching ? "ログイン中..." : "ログイン"}
                    </button>
                    <button className="loginRegisterButton" type="button" onClick={() => navigate('/register')}>
                        アカウント作成
                    </button>
                </form>
            </div>
        </div>
    )
}