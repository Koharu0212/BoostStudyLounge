import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function StudyRecordModal() {
  const [studyContent, setStudyContent] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState('00:00:00');

  const handleContentChange = (event) => {
    setStudyContent(event.target.value);
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    // ここにタイマー開始のロジックを追加
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    // ここにタイマー停止のロジックを追加
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="勉強内容"
        variant="outlined"
        value={studyContent}
        onChange={handleContentChange}
        fullWidth
      />
      <Typography variant="h4" align="center">
        {time}
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
    </Box>
  );
};