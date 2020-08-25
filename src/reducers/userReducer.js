import login from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
const userReducer = (state = null, action) => {
	switch (action.type) {
		case "LOGIN_USER":
			return action.payload;
		case "LOGOUT_USER":
			return null;
		default:
			return state;
	}
};

export const loginUser = (username, password, setUsername, setPassword) => {
	return async (dispatch) => {
		try {
			const user = await login({ username, password });
			window.localStorage.setItem("loggedUser", JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch({
				type: "LOGIN_USER",
				payload: user,
			});
			setUsername("");
			setPassword("");
		} catch {
			dispatch(
				setNotification({ type: "error", text: "Wrong username or password !" })
			);

			setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);
		}
	};
};

export default userReducer;
