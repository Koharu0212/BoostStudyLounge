import React from 'react'
import './Topbar.css'
import { Create, Logout, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

export default function Topbar() {
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
						<Link to="/measurement/:username" style={{textDecoration: "none", color: "black"}}>
							<Create />
							<span className='topbarIconText'>勉強記録</span>
						</Link>
					</div>
					<div className='topbarIcon'>
						<Link to="/mypage/:username" style={{textDecoration: "none", color: "black"}}>
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
