// Seat.jsx
import React from 'react';
import './Seat.css';

export default function Seat({ seatNumber, isOccupied, isMine, occupantName, onClick }) {
  const seatClass = isOccupied ? (isMine ? 'mySeat' : 'occupiedSeat') : 'availableSeat';
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