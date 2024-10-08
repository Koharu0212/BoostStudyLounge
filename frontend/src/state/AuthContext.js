import {createContext, useReducer, useEffect} from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザ状態
const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	isFetching: false,
	error:  false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => { //
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//ログイン状態をローカルストレージに保管
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