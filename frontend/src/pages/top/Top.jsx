import React from 'react'
import "./Top.css"

export default function Top() {
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
					<button className="loginButton">ログイン</button>
					<button className="registerButton">新規登録</button>
				</div>
			</div>
        </div>
    </div>
  )
}
