import React from 'react';
import './Room.css';
import Topbar from '../../components/topbar/Topbar';
import Seat from '../../components/seat/Seat';
import SeatLegend from '../../components/seatLegend/SeatLegend';
import { Seats, Users } from '../../dummyData';

export default function Room() {
  const currentUserId = 1;

  return (
    <>
      <Topbar />
      <div className="roomContainer">
        <div className="roomLeft">
         <div className="seatContainer">
            {Seats.map((seat) => {
              const user = Users.find((user)=>user.id===seat.user_id);
              return <Seat seat={seat} user={user} currentUserId={currentUserId} key={seat.id} />
            })}
          </div>
        </div>
        <div className="roomRight">
          <SeatLegend />
        </div>
      </div>
    </>
  );
}