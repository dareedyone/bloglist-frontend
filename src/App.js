import React, { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "./reducers/userReducer";
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Notification = ({ message }) => {
	return message ? (
		<div className={`message ${message.type}`}>{message.text}</div>
	) : null;
};
// const Yet = () => <h1>yet anotherr</h1>;
const App = () => {
	const user = useSelector((state) => state.user);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const message = useSelector((state) => state.notification);

	const dispatch = useDispatch();

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			dispatch({
				type: "LOGIN_USER",
				payload: user,
			});
		}
	}, [dispatch]);

	const handleLogin = (event) => {
		event.preventDefault();
		dispatch(loginUser(username, password, setUsername, setPassword));
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		dispatch({
			type: "LOGOUT_USER",
		});
	};

	const loginForm = () => (
		<div>
			<h2>Log in to app</h2>

			<Notification message={message} />

			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						name="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>

				<div>
					password
					<input
						type="password"
						name="password"
						autoComplete="off"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button>login</button>
			</form>
		</div>
	);

	return (
		<Router>
			{!user ? (
				loginForm()
			) : (
				<div>
					<h2>Blogs</h2>

					<Notification message={message} />

					<h5>
						{user.name} logged in{" "}
						<button onClick={handleLogout}>
							<small>logout</small>{" "}
						</button>
					</h5>
					<Switch>
						<Route exact path="/">
							<BlogPage user={user} />
						</Route>
						<Route>
							<UserPage path="/users" />
						</Route>
					</Switch>
				</div>
			)}
		</Router>
	);
};

export default App;
