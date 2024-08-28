import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Top.css"

export default function Top() {
  const navigate = useNavigate();

  return (
    <div className="top">
      <div className="topWapper">
        <img className="topImg" alt="" src="images/pexels-lilartsy-1925536.jpg" />
        <div className="topContainer">
          <div className="topText">
            <div className="topLogo">Boost Study Lounge</div>
            <div className="topMsg">オンライン自習室へようこそ</div>
          </div>
          <div className="topButton">
            <button className="topLoginButton" onClick={() => navigate('/login')}>ログイン</button>
            <button className="topRegisterButton" onClick={() => navigate('/register')}>新規登録</button>
          </div>
        </div>
      </div>
    </div>
  )
}