import React from 'react';
import './Seat.css';

/**
 * Seat コンポーネント
 * 自習室の個々の座席の状態を表現する
 * 
 * @param {Object} props
 * @param {number} props.seatNumber - 座席番号
 * @param {boolean} props.isOccupied - 座席が占有されているかどうか
 * @param {boolean} props.isMine - ログインユーザーの座席かどうか
 * @param {string} props.occupantName - 座席を占有しているユーザーの名前
 * @param {Function} props.onClick - クリック時のハンドラ関数
 * @returns {JSX.Element} Seat コンポーネントの JSX
 */
export default function Seat({ seatNumber, isOccupied, isMine, occupantName, onClick }) {
  /**
   * 座席の状態に基づいてCSSクラスを決定
   * @type {string}
   */
  const seatClass = isOccupied ? (isMine ? 'mySeat' : 'occupiedSeat') : 'availableSeat';

  /**
   * 座席に表示するテキストを決定
   * @type {string|number}
   */
  const displayText = isOccupied? (isMine ? 'あなた' : occupantName): seatNumber;

  return (
    <div 
      className={`seat ${seatClass}`}
      onClick={onClick}
    >
      {displayText}
    </div>
  );
}