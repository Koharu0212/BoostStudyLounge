/**
 * 日付オブジェクトを "YYYY-MM-DD HH:mm:ss" 形式の文字列に変換する
 * 
 * @param {Date} date - 変換する日付オブジェクト
 * @returns {string} フォーマットされた日時文字列
 */
export function formatDatetime(date) {
	const pad = (num) => num.toString().padStart(2, '0');
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  /**
 * 日付文字列を "YYYY年MM月DD日" 形式に変換する
 * 
 * @param {string} dateString - 変換する日付文字列
 * @returns {string} フォーマットされた日付文字列
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
};

/**
 * 日付文字列から時刻部分を "HH:mm:ss 形式で抽出する
 * 
 * @param {string} dateString - 変換する時刻文字列
 * @returns {string} フォーマットされた時刻文字列
 */
export function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
};

/**
 * 秒数を時間、分、秒の文字列に変換する
 * 0より大きい場合に表示する
 * 
 * @param {number} seconds - 変換する秒数
 * @returns {string} フォーマットされた期間文字列
 */
export function  formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  let result = '';
  if (hours > 0) result += `${hours}時間`;
  if (minutes > 0) result += `${minutes}分`;
  if (remainingSeconds > 0 || result === '') result += `${remainingSeconds}秒`;
  
  return result;
};