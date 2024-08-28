import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Top from "./pages/top/Top";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Room from "./pages/room/Room";
import MyPage from './pages/mypage/MyPage';
import Measurement from './pages/measurement/Measurement'
import ModalProvider from './ModalProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="room" element={<ModalProvider><Room /></ModalProvider>} />
        <Route path="/mypage/:username" element={<MyPage />} />
        <Route path="/measurement/:username" element={<Measurement />} />
      </Routes>
    </Router>
  );
}

export default App;