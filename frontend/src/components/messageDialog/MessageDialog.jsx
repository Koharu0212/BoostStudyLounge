import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function MessagerDialog({ open, onClose, title, content }) {
  return (
	<Dialog open={open} onClose={onClose}>
		<DialogContent>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogContentText>
				{content}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose} autoFocus>
				閉じる
			</Button>
        </DialogActions>
	</Dialog>
  );
}
