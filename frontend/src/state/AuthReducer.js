/**
 * 認証状態を管理するリデューサー
 * 
 * @param {Object} state - 現在の認証状態
 * @param {Object} action - ディスパッチされたアクション
 * @param {string} action.type - アクションのタイプ
 * @param {*} [action.payload] - アクションに付随するデータ
 * @returns {Object} 新しい認証状態
 */
const AuthReducer = (state, action) => {
	switch(action.type) {
		case "LOGIN_START":
			return {
				user: null,
				token: null,
				isFetching: true,
				error: false,
			};
		case "LOGIN_SUCCESS":
			return {
				user: action.payload,
				token: action.payload.token,
				isFetching: false,
				error: false,
			};
		case "LOGIN_ERROR":
			return {
				user: null,
				token: null,
				isFetching: false, 
				error: action.payload,
			};
		case "LOGOUT":
			return {
				user: false,
				token: null,
				isFetching: false,
				error: false,
			}
		default:
			return state;
	}
}

export default AuthReducer;