import { useState, useEffect } from 'react';

/**
 * useTimer カスタムフック
 * 指定された開始時間からの経過時間を計算し、表示用の文字列を返す
 * 
 * @param {boolean} isRunning - タイマーが実行中かどうかを示すフラグ
 * @param {Date|null} startTime - タイマーの開始時間
 * @returns {string} 経過時間を "HH:MM:SS" 形式で表す文字列
 */
export function useTimer(isRunning, startTime) {
	const [time, setTime] = useState('00:00:00');

	/**
	* タイマーを更新する関数
	* 現在時刻と開始時間の差分を計算し、時間文字列を更新する
	*/
	useEffect(() => {
		let interval;
		if (isRunning && startTime) {
			const updateTimer = () => {
				const now = new Date();
				const diff = now - startTime;
				const hours = Math.floor(diff / 3600000).toString().padStart(2, '0');
				const minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
				const seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
				setTime(`${hours}:${minutes}:${seconds}`);
			};
			updateTimer(); 
			interval = setInterval(updateTimer, 1000); // 1秒ごとに更新
		}
		return () => clearInterval(interval);
	}, [isRunning, startTime]);

	return time;
}