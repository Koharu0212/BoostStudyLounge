import React, { useContext, useState, useEffect } from 'react';
import './Room.css';
import Topbar from '../../components/topbar/Topbar';
import Seat from '../../components/seat/Seat';
import SeatLegend from '../../components/seatLegend/SeatLegend';
import ModalComponent from '../../components/modalComponent/ModalComponent';
import { ModalContext } from '../../state/ModalProvider';
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';

export default function Room() {
  const { user } = useContext(AuthContext);
  const currentUserId = user[0].user_id; //ログイン中のuser id
  const [seats, setSeats] = useState([]);
  const [users, setUsers] = useState([]);

  const {openModal} = useContext(ModalContext);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/seats`);
            setSeats(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchUser();
  }, []);
  
  const handleSeatClick = (selectedSeat) => {
    const isOccupied = selectedSeat.user_id !== null;
    const isCurrentUser = selectedSeat.user_id === currentUserId;
    const occupantName = users.find(user => user.user_id === selectedSeat.user_id)?.username;

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
            {seats.map((seat) => {
              const isOccupied = seat.user_id !== null;
              const isMine = seat.user_id === currentUserId;
              const occupantName = users.find(user => user.user_id === seat.user_id)?.username;

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