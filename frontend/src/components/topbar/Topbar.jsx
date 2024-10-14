import React, { useContext } from 'react'
import './Topbar.css'
import { Create, Logout, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { AuthContext } from '../../state/AuthContext';

/**
 * Topbar コンポーネント
 * アプリケーションの上部に表示されるナビゲーションバー
 * Room ページ、MyPage ページ、ログアウトへのリンクを提供する
 * 
 * @returns {JSX.Element} Topbar コンポーネントの JSX
 */
export default function Topbar() {
	const { user } = useContext(AuthContext);
	const username = user.userInfo.username;
	const logout = useLogout();

	return (
		<div  className='topbar'>
			<div className='topbarLeft'>
				<Link to="/room" style={{textDecoration: "none", color: "black"}}>
					<span className='logo'>Boost Study Lounge</span>
				</Link>
			</div>
			<div className='topbarRight'>
				<div className="topbarIcons">
				<div className='topbarIcon'>
						<Link to="/room" style={{textDecoration: "none", color: "black"}}>
							<Create />
							<span className='topbarIconText'>勉強記録</span>
						</Link>
					</div>
					<div className='topbarIcon'>
						<Link to={`/mypage/${username}`} style={{textDecoration: "none", color: "black"}}>
							<Person />
							<span className='topbarIconText'>マイページ</span>
						</Link>
					</div>
					<div className='topbarIcon'>
						<Logout onClick = { logout }/> 
						<span className='topbarIconText'>ログアウト</span>
					</div>
				</div>
			</div>
		</div>
	)
}
