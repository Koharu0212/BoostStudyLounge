import axios from "axios";

export const loginCall = async (user, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const response = await axios.post("http://localhost:3001/api/auth/login", user);
		dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
		return response.data;
	} catch(err) {
		dispatch({ type: "LOGIN_ERROR", payload: err });
		throw err;
	}
};

export const logoutCall = (dispatch) => {
	dispatch({ type: "LOGOUT" });
}