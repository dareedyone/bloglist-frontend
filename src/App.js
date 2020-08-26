import React, { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "./reducers/userReducer";
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import UserBlogPage from "./pages/UserBlogPage";
import { initializeUsers } from "./reducers/usersReducer";
import SingleBlogPage from "./pages/SingleBlogPage";

const Notification = ({ message }) => {
	return message ? (
		<div className={`message ${message.type}`}>{message.text}</div>
	) : null;
};

const App = () => {
	const user = useSelector((state) => state.user);
	const blogs = useSelector((state) =>
		state.blogs.sort((a, b) => b.likes - a.likes)
	);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const message = useSelector((state) => state.notification);
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const userMatch = useRouteMatch("/users/:id");
	const blogMatch = useRouteMatch("/blogs/:id");
	const routedBlog = blogMatch
		? blogs.find((blog) => blog.id === blogMatch.params.id)
		: null;
	const userWithBlogs = userMatch
		? users.find((user) => user.id === userMatch.params.id)
		: null;

	useEffect(() => {
		dispatch(initializeUsers());
	}, [dispatch]);
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
		<div>
			{!user ? (
				loginForm()
			) : (
				<div>
					<h2>Blogs</h2>

					<Notification message={message} />

					<ul className="home_nav">
						<li>
							<Link to="/blogs">blogs</Link>
						</li>
						<li>
							<Link to="/users">users</Link>
						</li>
						<li>{user.name} logged in </li>
						<li>
							<button onClick={handleLogout}>
								<small>logout</small>{" "}
							</button>
						</li>
					</ul>
					<Switch>
						<Route exact path="/users">
							<UserPage users={users} />
						</Route>
						<Route path="/users/:id">
							<UserBlogPage user={userWithBlogs} />
						</Route>
						<Route path="/blogs/:id">
							<SingleBlogPage blog={routedBlog} />
						</Route>
						<Route path="/">
							<BlogPage user={user} />
						</Route>
					</Switch>
				</div>
			)}
		</div>
	);
};

export default App;
