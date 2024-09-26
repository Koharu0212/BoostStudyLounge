import { useState, useEffect } from 'react';

export function useTimer(isRunning, startTime) {
	const [time, setTime] = useState('00:00:00');

	useEffect(() => {
		let interval;
		if (isRunning) {
			interval = setInterval(() => {
				const now = new Date();
				const diff = now - startTime;
				const hours = Math.floor(diff / 3600000).toString().padStart(2, '0');
				const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
				const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
				setTime(`${hours}:${minutes}:${seconds}`);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isRunning, startTime]);

  	return time;
}