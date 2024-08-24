import React from 'react'
import "./Table.css"

export default function Table({records}) {
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
					<td>{record.study_date}</td>
					<td>{record.measurement_time}</td>
					<td>{record.content}</td>
				</tr>
				))}
			</tbody>
		</table>
	</>
  )
}
