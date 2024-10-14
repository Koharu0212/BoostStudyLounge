import React from 'react'
import './SeatLegend.css'

/**
 * SeatLegend コンポーネント
 * 座席の状態を示すレジェンドを表現する
 * 
 * @returns {JSX.Element} SeatLegend コンポーネントの JSX
 */
export default function SeatLegend() {
  return (
	<div className="seatLegendContainer">
		<div className="seatLegend">
			<div className="availabeSeatLegend" />
			<div className="seatLegendMsg">空席</div>
		</div>
		<div className="seatLegend">
			<div className="occupiedSeatLegend" />
			<div className="seatLegendMsg">他ユーザが着席中の座席</div>
		</div>
		<div className="seatLegend">
			<div className="mySeatLegend" />
			<div className="seatLegendMsg">あなたが着席中の座席</div>
		</div>
	</div>
  )
}
