import React, { useContext } from 'react'
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

export default function ModalComponent({ seatId, isCurrentUser, isOccupied, occupantName }) {
	const { isModalOpen, closeModal } = useContext(ModalContext);

	const renderModalContent = () => {
        if (isCurrentUser || !isOccupied) {
            return <StudyRecordModal seatId={seatId}/>;
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
