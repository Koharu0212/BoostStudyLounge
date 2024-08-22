import React, {useState} from 'react';
import './Seat.css';

export default function Seat({ seat, user, currentUserId}) {
  const isOccupied = seat.user_id !== 0;
  const isCurrentUser = seat.user_id === currentUserId;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeatClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getModalMessage = () => {
    if (isOccupied) {
      return isCurrentUser ? 'これはあなたの席です。' : `${user.username}さんがこの席を使用中です。`;
    } else {
      return 'この席は空いています。';
    }
  };

  return (
    <>
      <div 
        className={`seat ${isOccupied ? (isCurrentUser ? 'mySeat' : 'occupiedSeat') : 'availableSeat'}`}
        onClick={handleSeatClick}
      >
        {isOccupied ? (isCurrentUser ? 'あなた' : user.username) : seat.id}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>{getModalMessage()}</p>
          </div>
        </div>
      )}
    </>
  );
}