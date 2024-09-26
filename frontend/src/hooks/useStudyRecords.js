import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useStudyRecords(username) {
    const [records, setRecords] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [appliedPeriod, setAppliedPeriod] = useState('all');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/records/${username}`);
                setRecords(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [username]);

    useEffect(() => {
        const filteredData = () => {
            const currentDate = new Date();
            const filteredRecords = records.filter(record => {
                const recordDate = new Date(record.study_date);
                const daysDiff = (currentDate - recordDate) / (1000 * 60 * 60 * 24);
                switch (appliedPeriod) {
                    case '1week': return daysDiff <= 7;
                    case '1month': return daysDiff <= 30;
                    case '1year': return daysDiff <= 365;
                    default: return true;
                }
            });
            const sortedData = filteredRecords.sort((a, b) => Date.parse(b.study_date) - Date.parse(a.study_date));
            setRecords(sortedData);
        }
        filteredData();
    }, [records, appliedPeriod]);

    const handlePeriodChange = (e) => {
		e.preventDefault();
		setSelectedPeriod(e.target.value);
	}

    const handleSubmit = (e) => {
        e.preventDefault();
        setAppliedPeriod(selectedPeriod);
    };

    return {
        records,
        recordNum: records.length,
        handlePeriodChange,
        handleSubmit
    };
}