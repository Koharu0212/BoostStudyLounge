import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';

export default function StudyContentDialog({ open, onClose, studyContent, onContentChange, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>勉強内容が未入力です</DialogTitle>
      <DialogContent>
        <DialogContentText>
        	勉強内容を入力してください。入力せずに終了することはできません。
        </DialogContentText>
        <TextField
			autoFocus
			margin="dense"
			label="勉強内容"
			type="text"
			fullWidth
			variant="outlined"
			value={studyContent}
			onChange={onContentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={onConfirm} disabled={!studyContent.trim()}>
        	確認
        </Button>
      </DialogActions>
    </Dialog>
  );
}