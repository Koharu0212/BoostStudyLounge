import React from 'react'
import "./Table.css"

export default function Table({records}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    let result = '';
    if (hours > 0) result += `${hours}時間`;
    if (minutes > 0) result += `${minutes}分`;
    if (remainingSeconds > 0 || result === '') result += `${remainingSeconds}秒`;
    
    return result;
  };

  return (
    <>
      <table className="studyRecordTable">
        <thead>
          <tr>
            <th>勉強日</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>勉強時間</th>
            <th>勉強内容</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
          <tr key={record.id}>
            <td>{formatDate(record.start_date)}</td>
            <td>{formatTime(record.start_date)}</td>
            <td>{formatTime(record.end_date)}</td>
            <td>{formatDuration(record.measurement_time)}</td>
            <td>{record.contents}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}