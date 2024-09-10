import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザ状態
const initialState = {
	user: false,
	isFetching: false,
	error:  false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => { //
	const [state, dispatch] = useReducer(AuthReducer, initialState);
	return <AuthContext.Provider value={{
		user: state.user,
		isFetching: state.isFetching,
		error: state.error,
		dispatch,
	}}>
		{children} 
	</AuthContext.Provider>;
}; 