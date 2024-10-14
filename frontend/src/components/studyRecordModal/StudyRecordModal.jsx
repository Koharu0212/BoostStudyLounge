import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';
import { ModalContext } from  '../../state/ModalContext';
import { formatDatetime } from '../../utils/dateUtils';
import { useTimer } from '../../hooks/useTimer';
import StudyContentDialog  from '../studyContentDialog/StudyContentDialog';
import MessageDialog from '../messageDialog/MessageDialog';

const MAX_STUDY_TIME = 12 * 60 * 60 * 1000; //12h

export default function StudyRecordModal({ seatId, studyContent, onContentChange }) {
	const { user } = useContext(AuthContext);
	const currentUser = user.userInfo;
	const { closeModal } = useContext(ModalContext);

	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openErrorDialog, setOpenErrorDialog] = useState(false);
	const [openAutoVacateDialog, setOpenAutoVacateDialog] = useState(false);

	const timer = useTimer(isTimerRunning, startTime);

	const handleVacate = useCallback(async (currentTime, isAutoVacate) => {
		setIsTimerRunning(false);
		if (isAutoVacate) {
			setOpenAutoVacateDialog(true);
		}
		try {
			await axios.put(`${process.env.REACT_APP_API_URL}/api/seats/${seatId}/vacate`, {
				userId: currentUser.user_id,
			});
			await axios.post(`${process.env.REACT_APP_API_URL}/api/records/`,{
				userId: currentUser.user_id,
				startDate: formatDatetime(startTime),
        		endDate: formatDatetime(currentTime),
				content: isAutoVacate ? '着席時間が制限時間を超えたため、自動離席しました。': studyContent
			});
			if (!isAutoVacate) {
				closeModal();
			}
		} catch (err) {
			console.error(isAutoVacate ? "自動離席エラー:" : "離席エラー:", err);
		}
	}, [closeModal, currentUser.user_id, seatId, startTime, studyContent]);

	useEffect(() => {
		const fetchSeatStatus = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seats/${seatId}`);
				if (response.data.user_id === currentUser.user_id && response.data.start_time) {
					setIsTimerRunning(true);
					setStartTime(new Date(response.data.start_time));
				}
			} catch (error) {
				console.error("Error fetching seat status:", error);
			}
		};
		fetchSeatStatus();
	}, [seatId, currentUser]);

	useEffect(() => {
		let autoVacateTimer;
		if (isTimerRunning) {
			autoVacateTimer = setTimeout(() => {
				handleVacate(new Date(), true);
			}, MAX_STUDY_TIME);
		}
		return () => {
			if (autoVacateTimer) {
				clearTimeout(autoVacateTimer);
			}
		};
	}, [isTimerRunning, handleVacate]);

	const handleContentChange = (event) => {
        onContentChange(event.target.value);
    };

	const handleStartTimer = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seats/user/${currentUser.user_id}`);
			if(response.data.length > 0){
				setOpenErrorDialog(true);
				return;
			}
			const currentTime = new Date();
			setStartTime(currentTime);
			setIsTimerRunning(true);
			await axios.put(`${process.env.REACT_APP_API_URL}/api/seats/${seatId}/occupy`, {
				userId: currentUser.user_id,
			});
		} catch (err) {
			console.error("着席エラー:", err);
			setIsTimerRunning(false);
		}
	};

	const handleStopTimer = async () => {
		const currentTime = new Date();
		setIsTimerRunning(false);
		setEndTime(currentTime);
		if(!studyContent.trim()) {
			setOpenDialog(true);
		} else {
			try {
				await handleVacate(currentTime, false);
			} catch (err) {
				console.error("離席エラー:", err);
				setIsTimerRunning(true);
			}
		}
 	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleCloseErrorDialog = () => {
		setOpenErrorDialog(false);
	}

	const handleCloseAutoVacateDialog = () => {
		setOpenAutoVacateDialog(false);
		closeModal();
	}
 
	const handleConfirmDialog = async () => {
		if (studyContent.trim()) {
			setOpenDialog(false);
			try {
				await handleVacate(endTime, false);
			} catch (err) {
				console.error("離席エラー:", err);
			}
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
		<MessageDialog
			open={openErrorDialog}
			onClose={handleCloseErrorDialog}
			title={'座席選択エラー'}
			content={'すでに他の席に着席しているため、着席することができません。あなたが着席している席を選択してください。'}
		/>
		<MessageDialog
			open={openAutoVacateDialog}
			onClose={handleCloseAutoVacateDialog}
			title={'自動離席'}
			content={'着席時間が制限時間を超えたため、自動で離席しました。'}
		/>
		</Box>
	);
};