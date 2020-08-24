const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case "SET_MESSAGE":
			return action.payload;
		// case "SET_NULL":
		// 	return null;
		default:
			return state;
	}
};

export const setNotification = (message) => {
	return {
		type: "SET_MESSAGE",
		payload: message,
	};
};

export default notificationReducer;
