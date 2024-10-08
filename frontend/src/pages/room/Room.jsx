import React, { useContext, useState, useEffect, useCallback } from 'react';
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
  const currentUser = user.userInfo; //ログイン中のユーザ情報
  const [seats, setSeats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  //座席情報を取得
  const fetchSeats = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/seats`);
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  }, []);

  //全てのユーザのuser_idの取得
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  //初期ロード
  useEffect(() => {
    fetchSeats();
    fetchUsers();
  }, [fetchSeats, fetchUsers]);

  //モーダルが閉じられた際、座席を再表示
  useEffect(() => {
    setModalCloseCallback(fetchSeats);
  }, [setModalCloseCallback, fetchSeats]);

  
  const handleSeatClick = (selectedSeat) => {
    const seatId = selectedSeat.seat_id;
    const isOccupied = selectedSeat.user_id !== null;
    const isCurrentUser = selectedSeat.user_id === currentUser.user_id;
    const occupantName = users.find(user => currentUser.user_id === selectedSeat.user_id)?.username;

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
              const isMine = seat.user_id === currentUser.user_id;
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