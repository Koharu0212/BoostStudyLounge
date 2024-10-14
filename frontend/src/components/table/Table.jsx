import React from 'react'
import "./Table.css"
import { formatDate, formatTime, formatDuration } from '../../utils/dateUtils';

/**
 * Table コンポーネント
 * MyPage内に表示される勉強履歴テーブル
 * 
 * @returns {JSX.Element} Table コンポーネントの JSX
 */
export default function Table({records}) {
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
            <td>{record.content}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}