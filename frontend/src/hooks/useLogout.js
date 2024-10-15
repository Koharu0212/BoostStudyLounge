import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../state/AuthContext';
import { logoutCall } from '../services/actionCalls';

/**
 * useLogout カスタムフック
 * ユーザーのログアウト処理を行うためのフック
 * 
 * @returns {Function} ログアウト処理を行う関数
 */
export default function useLogout ()  {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * ログアウト処理を行う関数
   * AuthContextのdispatchを使用してログアウト処理を実行し、
   * その後Topページにリダイレクトする
   * 
   * @param {Event} e - イベントオブジェクト
   */
  const logout = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
    navigate("/");
  };

  return logout;
};