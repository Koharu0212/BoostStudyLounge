import React from 'react';
import { useParams } from 'react-router-dom';
import "./MyPage.css";
import Topbar from "../../components/topbar/Topbar";
import Table from "../../components/table/Table";
import useStudyRecords from "../../hooks/useStudyRecords";
import PeriodSelector from '../../components/periodSelecter/PeriodSelecter';

/**
 * MyPage ページ
 * 勉強履歴を表示するページ
 * 
 * @returns {JSX.Element} MyPage ページの JSX
 */
export default function MyPage() {
    const username = useParams().username;
	const { records, recordNum, handlePeriodChange, handleSubmit } = useStudyRecords(username);
    
    return (
        <>
            <Topbar />
            <div className="myPage">
                <div className="myPageContainer">
                    <div className="myPageTitle">勉強履歴</div>
                    <hr className="sidebarHr" />
                    <PeriodSelector handlePeriodChange={handlePeriodChange} handleSubmit={handleSubmit} />
                    <div className="myPageMsg">{recordNum}件の記録があります。</div>
                    <Table records={records} />
                </div>
            </div>
        </>
    )
}