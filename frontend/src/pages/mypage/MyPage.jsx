import React, { useState, useEffect } from 'react';
import "./MyPage.css";
import Topbar from "../../components/topbar/Topbar";
import Table from "../../components/table/Table";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MyPage() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('all'); //ラジオボタンで現在選択されている期間
    const [appliedPeriod, setAppliedPeriod] = useState('all'); //「この条件で表示する」ボタンが押されたときに適用される期間
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/records/${username}`);
                setRecords(response.data);
                setFilteredRecords(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [username]);

    const filterRecords = () => {
        const currentDate = new Date();
        let filteredData = [];

        switch (appliedPeriod) {
            case '1week':
                filteredData = records.filter(record => {
                    const recordDate = new Date(record.study_date);
                    return (currentDate - recordDate) / (1000 * 60 * 60 * 24) <= 7;
                });
                break;
            case '1month':
                filteredData = records.filter(record => {
                    const recordDate = new Date(record.study_date);
                    return (currentDate - recordDate) / (1000 * 60 * 60 * 24) <= 30;
                });
                break;
            case '1year':
                filteredData = records.filter(record => {
                    const recordDate = new Date(record.study_date);
                    return (currentDate - recordDate) / (1000 * 60 * 60 * 24) <= 365;
                });
                break;
            default:
                filteredData = records;
        }
        setFilteredRecords(filteredData);
    };

    useEffect(() => {
        filterRecords();
    }, [appliedPeriod, records]);

	//ラジオボタンの選択を変更
    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
    };

	//ボタン押下後
    const handleSubmit = (e) => {
        e.preventDefault();
        setAppliedPeriod(selectedPeriod);
    };

	//日付で並び替え(新しい順)
    const sortedStudyRecord = filteredRecords.sort((a, b) => Date.parse(b.study_date) - Date.parse(a.study_date));
    const recordNum = filteredRecords.length;

    return (
        <>
            <Topbar />
            <div className="myPage">
                <div className="myPageContainer">
                    <div className="myPageTitle">勉強履歴</div>
                    <hr className="sidebarHr" />
                    <div className="displayPeriod">
                        <div className="displayPeriodMsg">表示期間</div>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="radioButtons">
                                <div className="radioButton">
                                    <label><input type="radio" id="all" name="period" value="all" checked={selectedPeriod === 'all'} onChange={handlePeriodChange} />すべて</label>
                                </div>
                                <div className="radioButton">
                                    <label><input type="radio" id="1week" name="period" value="1week" checked={selectedPeriod === '1week'} onChange={handlePeriodChange} />1週間</label>
                                </div>
                                <div className="radioButton">
                                    <label><input type="radio" id="1month" name="period" value="1month" checked={selectedPeriod === '1month'} onChange={handlePeriodChange} />1ヶ月</label>
                                </div>
                                <div className="radioButton">
                                    <label><input type="radio" id="1year" name="period" value="1year" checked={selectedPeriod === '1year'} onChange={handlePeriodChange} />1年</label>
                                </div>
                            </div>
                            <button type="submit" className="deceidePeriod">この条件で表示する</button>
                        </form>
                    </div>
                    <div className="myPageMsg">{recordNum}件の記録があります。</div>
                    <Table records={sortedStudyRecord} />
                </div>
            </div>
        </>
    )
}