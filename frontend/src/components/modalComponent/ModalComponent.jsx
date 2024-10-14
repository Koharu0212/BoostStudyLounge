import React, { useContext, useState } from 'react'
import { ModalContext } from '../../state/ModalContext';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import StudyRecordModal from '../studyRecordModal/StudyRecordModal';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

/**
 * ModalComponent
 * 座席の状態に応じて異なる内容を表示するモーダルコンポーネント
 * 
 * @param {Object} props
 * @param {number} props.seatId - 座席ID
 * @param {boolean} props.isCurrentUser - 現在のユーザーの座席かどうか
 * @param {boolean} props.isOccupied - 座席が占有されているかどうか
 * @param {string} props.occupantName - 座席を占有しているユーザーの名前
 * @returns {JSX.Element} ModalComponent の JSX
 */
export default function ModalComponent({ seatId, isCurrentUser, isOccupied, occupantName }) {
	const { isModalOpen, closeModal } = useContext(ModalContext);
	const [studyContent, setStudyContent] = useState('');

	/**
     * 学習内容の変更を処理する関数
     * @param {string} newContent - 新しい学習内容
     */
	const handleContentChange = (newContent) => {
        setStudyContent(newContent);
    };

	 /**
     * モーダルの内容をレンダリングする関数
     * @returns {JSX.Element} モーダルの内容
     */
	const renderModalContent = () => {
        if (isCurrentUser || !isOccupied) {
            return (
				<StudyRecordModal 
					seatId={seatId}
					studyContent={studyContent}
					onContentChange={handleContentChange}
				/>
			);
        } else if (isOccupied && !isCurrentUser) {
            return (
                <Typography variant="h6" component="h2">
                    {occupantName}さんが着席しています
                </Typography>
            );
        }
    };

	return (
		<>
			<div>
				<Modal
					open={isModalOpen}
					onClose={closeModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyle}>
					<IconButton
						aria-label="close"
						onClick={closeModal}
						sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
					{renderModalContent()}
					</Box>
				</Modal>
			</div>
		</>
	)
}
