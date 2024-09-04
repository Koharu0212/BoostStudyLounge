import React from 'react'
import "./Table.css"

export default function Table({records}) {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
		const day = String(date.getDate()).padStart(2, '0'); // 日を2桁にする
	
		return `${year}年${month}月${day}日`;
	  };

	return (
		<>
			<table className="studyRecordTable">
				<thead>
					<tr>
						<th>勉強日</th>
						<th>勉強時間</th>
						<th>勉強内容</th>
					</tr>
				</thead>
				<tbody>
					{records.map((record) => (
					<tr key={record.id}>
						<td>{formatDate(record.study_date)}</td>
						<td>{record.measurement_time}</td>
						<td>{record.content}</td>
					</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
