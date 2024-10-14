import axios from "axios";

/**
 * ログイン処理を行い、結果に応じてディスパッチを実行する
 * 
 * @param {Object} user - ログイン情報（ユーザー名とパスワードを含む）
 * @param {Function} dispatch - Reduxのディスパッチ関数
 * @returns {Promise<Object>} ログイン成功時のユーザー情報
 * @throws {Error} ログイン失敗時のエラー
 */
export const loginCall = async (user, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, user);
		dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
		return response.data;
	} catch(err) {
		dispatch({ type: "LOGIN_ERROR", payload: err });
		throw err;
	}
};

/**
 * ログアウト処理を行い、ディスパッチを実行する
 * 
 * @param {Function} dispatch - Reduxのディスパッチ関数
 */
export const logoutCall = (dispatch) => {
	dispatch({ type: "LOGOUT" });
}