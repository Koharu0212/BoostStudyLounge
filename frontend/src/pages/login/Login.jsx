import React, { useRef, useContext, useState, useEffect } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { loginCall } from '../../actionCalls';
import { AuthContext } from '../../state/AuthContext';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, error, dispatch } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(""); // エラーメッセージをリセット
        try {
            await loginCall(
                {
                    email: email.current.value,
                    password: password.current.value,
                },
                dispatch
            );
        } catch (err) {
            setLoginError("メールアドレスまたはパスワードが一致しません");
        }
    }

    // エラーステートが変更されたときにログインエラーを設定
    useEffect(() => {
        if (error) {
            setLoginError("メールアドレスまたはパスワードが一致しません");
        }
    }, [error]);

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