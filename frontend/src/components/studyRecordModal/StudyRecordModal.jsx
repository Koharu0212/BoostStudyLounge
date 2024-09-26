import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';
import { formatDate } from '../../utils/dateUtils';
import { ModalContext } from  '../../state/ModalContext';
import { useTimer } from '../../hooks/useTimer';
import StudyContentDialog  from '../studyContentDialog/StudyContentDialog';
import ErrorDialog from '../errorDialog/ErrorDialog';

export default function StudyRecordModal({ seatId }) {
	const { user } = useContext(AuthContext);
	const [studyContent, setStudyContent] = useState('');
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openErrorDialog, setOpenErrorDialog] = useState(false);

	const { closeModal } = useContext(ModalContext);
	const timer = useTimer(isTimerRunning, startTime);

	//着席した状態でモーダルを閉じ、再表示した場合は途中の結果を表示
	useEffect(() => {
		const fetchSeatStatus = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/api/seats/status/${seatId}`);
				if (response.data.user_id === user[0].user_id && response.data.start_time) {
					setIsTimerRunning(true);
					setStartTime(new Date(response.data.start_time));
				}
			} catch (error) {
				console.error("Error fetching seat status:", error);
			}
		};
		fetchSeatStatus();
	  }, [seatId, user]);

	//勉強内容を取得
	const handleContentChange = (event) => {
		setStudyContent(event.target.value);
	};

	//着席
	const handleStartTimer = async () => {
		try {
			//すでに他の席に着席していないか確認
			const response = await axios.get(`http://localhost:3001/api/seats/${user[0].user_id}`);
			if(response.data.length > 0){
				setOpenErrorDialog(true);
				return;
			}
			const currentTime = new Date();
			setStartTime(currentTime);
			setIsTimerRunning(true);
			await axios.put("http://localhost:3001/api/seats/occupy", {
				userId: user[0].user_id,
				seatId: seatId
			});
		} catch (err) {
			console.error("着席エラー:", err);
		}
	};

	//離席
	const handleStopTimer = async () => {
		const currentTime = new Date();
		setIsTimerRunning(false);
		setEndTime(currentTime);
		if(!studyContent.trim()) {
			console.log('勉強内容が空です')
			setOpenDialog(true);
		} else {
			try {
				console.log(currentTime);
				await axios.put("http://localhost:3001/api/seats/vacate", {
					userId: user[0].user_id,
					seatId: seatId
				});
				await finishStudy(currentTime);
			} catch (err) {
				  console.error("離席エラー:", err);
			}
		}
 	};

	const finishStudy = async (currentTime) => {
		try {
			//勉強記録をデータベースに記録
			console.log(studyContent);
			const studyTime = Math.floor((currentTime - startTime) / 1000);
			await axios.post(`http://localhost:3001/api/records/${user[0].user_id}`,{
				userId: user[0].user_id,
				startDate: formatDate(startTime),
        		endDate: formatDate(currentTime),
				measurementTime: studyTime,
				contents: studyContent
			});
			closeModal();
		} catch (err) {
			console.error("離席エラー:", err);
		}
	};
	
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleCloseErrorDialog = () => {
		setOpenErrorDialog(false);
	}
 
	const handleConfirmDialog = async () => {
		if (studyContent.trim()) {
			setOpenDialog(false);
			console.log(endTime);
			await finishStudy(endTime);
		} else {
			setOpenDialog(true);
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
		<TextField
			label="勉強内容 (必須)"
			variant="outlined"
			value={studyContent}
			onChange={handleContentChange}
			helperText={studyContent !== undefined && !studyContent ? "入力してください" : ""}
			error={studyContent !== undefined && !studyContent}
			fullWidth
		/>
		<Typography variant="h4" align="center">
			{timer}
		</Typography>
		<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
			<Button
				variant="contained"
				color="primary"
				onClick={handleStartTimer}
				disabled={isTimerRunning}
			>
			開始
			</Button>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleStopTimer}
				disabled={!isTimerRunning}
			>
			終了
			</Button>
		</Box>
		<StudyContentDialog
			open={openDialog}
			onClose={handleCloseDialog}
			studyContent={studyContent}
			onContentChange={handleContentChange}
			onConfirm={handleConfirmDialog}
     	/>
		<ErrorDialog
			open={openErrorDialog}
			onClose={handleCloseErrorDialog}
			title={'座席選択エラー'}
			content={'すでに他の席に着席しているため、着席することができません。あなたが着席している席を選択してください。'}
		/>
		</Box>
	);
};