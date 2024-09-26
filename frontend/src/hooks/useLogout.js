// hooks/useLogout.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../state/AuthContext';
import { logoutCall } from '../actionCalls';

export default function useLogout ()  {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
    navigate("/");
  };

  return logout;
};