import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

/**
 * MessageDialog コンポーネント
 * メッセージを表示するためのダイアログボックス
 * 
 * @param {Object} props
 * @param {boolean} props.open - ダイアログの表示状態
 * @param {Function} props.onClose - ダイアログを閉じる際のコールバック関数
 * @param {string} props.title - ダイアログのタイトル
 * @param {string} props.content - ダイアログの本文
 * @returns {JSX.Element} MessageDialog コンポーネントの JSX
 */
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
