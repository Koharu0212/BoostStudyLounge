import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useStudyRecords カスタムフック
 * 指定されたユーザーの学習記録を取得し、フィルタリングする
 * 
 * @param {string} username - 学習記録を取得するユーザーの名前
 * @returns {Object} 学習記録と関連する操作を含むオブジェクト
 */
export default function useStudyRecords (username) {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [appliedPeriod, setAppliedPeriod] = useState('all');

    // ユーザーの学習記録を取得
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/records/user/${username}`);
                setRecords(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [username]);

    // 選択された表示期間に基づいて勉強記録をフィルタリング
    useEffect(() => {
        const filterData = () => {
            const currentDate = new Date();
            const filtered = records.filter(record => {
                const recordDate = new Date(record.start_date);
                const daysDiff = (currentDate - recordDate) / (1000 * 60 * 60 * 24);
                switch (appliedPeriod) {
                    case '1week': return daysDiff <= 7;
                    case '1month': return daysDiff <= 30;
                    case '1year': return daysDiff <= 365;
                    default: return true;
                }
            });
            const sortedData = filtered.sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date));
            setFilteredRecords(sortedData);
        }
        filterData();
    }, [records, appliedPeriod]);

     /**
     * 表示期間の変更を処理する関数
     * @param {Event} e - 変更イベント
     */
    const handlePeriodChange = (e) => {
        e.preventDefault();
        setSelectedPeriod(e.target.value);
    }

     /**
     * 選択された期間を適用する関数
     * @param {Event} e - フォーム送信イベント
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setAppliedPeriod(selectedPeriod);
    };

    return {
        records: filteredRecords,
        recordNum: filteredRecords.length,
        handlePeriodChange,
        handleSubmit
    };
}