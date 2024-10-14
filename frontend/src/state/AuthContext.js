import {createContext, useReducer, useEffect} from "react";
import AuthReducer from "./AuthReducer";

/**
 * 認証情報の初期状態
 * ローカルストレージから既存のユーザー情報とトークンを取得
 * @type {Object}
 */
const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	isFetching: false,
	error:  false,
};

/**
 * 認証情報を管理するためのコンテキスト
 * @type {React.Context}
 */
export const AuthContext = createContext(initialState);

/**
 * AuthContextProvider コンポーネント
 * 認証状態を管理し、子コンポーネントにコンテキストを提供する
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子コンポーネント
 * @returns {JSX.Element} AuthContextProvider コンポーネントの JSX
 */
export const AuthContextProvider = ({ children }) => { //
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	/**
     * 認証状態が変更されたときにローカルストレージを更新
     */
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
		localStorage.setItem("token", state.token);
	}, [state.user, state.token])

	return <AuthContext.Provider value={{
		user: state.user,
		token: state.token,
		isFetching: state.isFetching,
		error: state.error,
		dispatch,
	}}>
		{children} 
	</AuthContext.Provider>;
}; 