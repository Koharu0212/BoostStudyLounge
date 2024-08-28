import React, { useState } from 'react';
import './Measurement.css';
import Topbar from "../../components/topbar/Topbar"

export default function Measurement() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [studyContent, setStudyContent] = useState('');

  const handleStart = () => {
    setIsRunning(true);
    // ここにタイマー開始のロジックを追加
  };

  const handleStop = () => {
    setIsRunning(false);
    // ここにタイマー停止のロジックを追加
  };

  const handleEnd = () => {
    setIsRunning(false);
    // ここにタイマーリセットと計測終了のロジックを追加
  };

  return (
	<>
		<Topbar />
		<div className="measurement">
		<div className="measurementWrapper">
			<div className="measurementMsg">計測</div>
			<div className="measurementBox">
			<input
				type="text"
				className="measurementInput"
				placeholder="勉強内容"
				value={studyContent}
				onChange={(e) => setStudyContent(e.target.value)}
			/>
			<div className="stopwatch">
				<span className="stopwatchTime">{time}</span>
			</div>
			<div className="stopwatchButtons">
				{!isRunning ? (
				<button className="stopwatchButtonStart" onClick={handleStart}>
					開始
				</button>
				) : (
				<button className="stopwatchButtonStop" onClick={handleStop}>
					停止
				</button>
				)}
				<button
				className={`stopwatchButtonEnd ${!isRunning ? 'disabled' : ''}`}
				onClick={handleEnd}
				disabled={!isRunning}
				>
				終了
				</button>
			</div>
			</div>
		</div>
    </div>
	</>
  );
};