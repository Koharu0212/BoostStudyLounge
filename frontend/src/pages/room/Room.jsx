import React, { useContext, useState, useEffect, useCallback } from 'react';
import './Room.css';
import Topbar from '../../components/topbar/Topbar';
import Seat from '../../components/seat/Seat';
import SeatLegend from '../../components/seatLegend/SeatLegend';
import ModalComponent from '../../components/modalComponent/ModalComponent';
import { ModalContext } from '../../state/ModalContext';
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';

/**
 * Room ページ
 * 自習室の座席配置と状態を管理し、表示するページ
 * @returns {JSX.Element} Room ページの JSX
 */
export default function Room() {
  const { user } = useContext(AuthContext);
  const { openModal, setModalCloseCallback } = useContext(ModalContext);
  
  const currentUser = user.userInfo; //ログイン中のuserId, username
  const [seats, setSeats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

   /**
   * 座席情報をサーバーから取得する
   * @returns {Promise<void>}
   */
  const fetchSeats = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/seats`);
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  }, []);

   /**
   * ユーザー情報をサーバーから取得する
   * @returns {Promise<void>}
   */
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  // コンポーネントのマウント時に座席とユーザー情報を取得
  useEffect(() => {
    fetchSeats();
    fetchUsers();
  }, [fetchSeats, fetchUsers]);

  // モーダルが閉じられたとき、座席情報を再取得
  useEffect(() => {
    setModalCloseCallback(fetchSeats);
  }, [setModalCloseCallback, fetchSeats]);

   /**
   * 座席がクリックされたときの処理
   * @param {Object} selectedSeat - クリックされた座席の情報
   */
  const handleSeatClick = (selectedSeat) => {
    const seatId = selectedSeat.seat_id;
    const isOccupied = selectedSeat.user_id !== null;
    const isCurrentUser = selectedSeat.user_id === currentUser.user_id;
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