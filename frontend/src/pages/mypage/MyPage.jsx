import React from 'react'
import "./MyPage.css"
import Topbar from "../../components/topbar/Topbar"
import Table from "../../components/table/Table"
import { StudyRecord } from '../../dummyData'

export default function myPage() {
	const sortedStudyRecord = StudyRecord.sort((a, b) => Date.parse(b.study_date) - Date.parse(a.study_date));
	const recordNum = StudyRecord.length;
	
  return (
	<>
		<Topbar />
		<div className="myPageContainer">
			<div className="myPageTitle">勉強履歴</div>
			<hr className="sidebarHr" />
			<div className="displayPeriod">
				<div className="displayPeriodMsg">表示期間</div>
				<form className="form">
					<div className="radioButtons">
						<div className="radioButton">
							<label><input type="radio" id="1week" name="period" value="1week" defaultChecked={true}/>1週間</label>
						</div>
						<div className="radioButton">
							<label><input type="radio" id="1month" name="period" value="1month" />1ヶ月</label>
						</div>
						<div className="radioButton">
							<label><input type="radio" id="1year" name="period" value="1year" />1年</label>
						</div>
					</div>
					<button type="submit" className="deceidePeriod">この条件で表示する</button>
				</form>
			</div>
			
			
			<div className="myPageMsg">{recordNum}件の記録があります。</div>
			<Table records={ sortedStudyRecord } />
		</div>
	</>
  )
}
