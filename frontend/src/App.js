import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Top from "./pages/top/Top";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Room from "./pages/room/Room";
import MyPage from './pages/mypage/MyPage';
import { AuthContext } from './state/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={user ? <Navigate to="/room" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/room" /> : <Register />} />
        <Route path="/room" element={user ? <Room /> : <Navigate to="/" />} />
        <Route path="/mypage/:username" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;