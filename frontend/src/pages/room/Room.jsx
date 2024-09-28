import React, { useContext, useState, useEffect } from 'react';
import './Room.css';
import Topbar from '../../components/topbar/Topbar';
import Seat from '../../components/seat/Seat';
import SeatLegend from '../../components/seatLegend/SeatLegend';
import ModalComponent from '../../components/modalComponent/ModalComponent';
import { ModalContext } from '../../state/ModalContext';
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';

export default function Room() {
  const { user } = useContext(AuthContext);
  const { openModal, setModalCloseCallback } = useContext(ModalContext);
  const currentUserId = user[0].user_id; //ログイン中のuser id
  const [seats, setSeats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const fetchSeats = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/api/seats`);
        setSeats(response.data);
    } catch (error) {
        console.log(error);
    }
  };

  //user_idを取得
  const fetchUser = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users`);
        setUsers(response.data);
    } catch (error) {
        console.log(error);
    }
  };

  //初期ロード
  useEffect(() => {
    fetchSeats();
    fetchUser();
  }, []);

  //モーダルが閉じられた際、座席を再表示
  useEffect(() => {
    setModalCloseCallback(fetchSeats);
  }, [setModalCloseCallback]);

  
  const handleSeatClick = (selectedSeat) => {
    const seatId = selectedSeat.seat_id;
    const isOccupied = selectedSeat.user_id !== null;
    const isCurrentUser = selectedSeat.user_id === currentUserId;
    const occupantName = users.find(user => user.user_id === selectedSeat.user_id)?.username;

    setSelectedSeat({
      seatId,
      isOccupied,
      isCurrentUser,
      occupantName
    });

    openModal();
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
                  key={seat.seat_id}
                  seatNumber={seat.seat_id}
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
      <ModalComponent 
        seatId={selectedSeat?.seatId}
        isCurrentUser={selectedSeat?.isCurrentUser}
        isOccupied={selectedSeat?.isOccupied}
        occupantName={selectedSeat?.occupantName}
      />
    </>
  );
}