// Room.jsx
import React, { useContext } from 'react';
import './Room.css';
import Topbar from '../../components/topbar/Topbar';
import Seat from '../../components/seat/Seat';
import SeatLegend from '../../components/seatLegend/SeatLegend';
import ModalComponent from '../../components/modalComponent/ModalComponent';
import { Seats, Users } from '../../dummyData';
import { ModalContext } from '../../ModalProvider';

export default function Room() {
  const currentUserId = 1;
  const {openModal} = useContext(ModalContext);
  
  const handleSeatClick = (selectedSeat) => {
    const isOccupied = selectedSeat.user_id !== 0;
    const isCurrentUser = selectedSeat.user_id === currentUserId;
    const occupantName = Users.find(user => user.id === selectedSeat.user_id)?.username;

    let message;
    if (isOccupied) {
      message = isCurrentUser ? 'これはあなたの席です。' : `${occupantName}さんがこの席を使用中です。`;
    } else {
      message = 'この席は空いています。';
    }
    openModal(message);
  };

  return (
    <>
      <Topbar />
      <div className="roomContainer">
        <div className="roomLeft">
          <div className="seatContainer">
            {Seats.map((seat) => {
              const isOccupied = seat.user_id !== 0;
              const isMine = seat.user_id === currentUserId;
              const occupantName = Users.find(user => user.id === seat.user_id)?.username;

              return (
                <Seat 
                  key={seat.id}
                  seatNumber={seat.id}
                  isOccupied={isOccupied}
                  isMine={isMine}
                  occupantName={occupantName}
                  onClick={() => handleSeatClick(seat)}
                />
              );
            })}
          </div>
        </div>
        <div className="roomRight">
          <SeatLegend />
        </div>
      </div>
      <ModalComponent />
    </>
  );
}