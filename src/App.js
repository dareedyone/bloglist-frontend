import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";
import { setNotification } from "./reducers/notificationReducer";
import { useSelector, useDispatch } from "react-redux";
import {
	initializeBlogs,
	createBlog,
	deleteBlog,
} from "./reducers/blogReducer";

const Notification = ({ message }) => {
	return message ? (
		<div className={`message ${message.type}`}>{message.text}</div>
	) : null;
};

const App = () => {
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const message = useSelector((state) => state.notification);
	const blogs = useSelector((state) =>
		state.blogs.sort((a, b) => b.likes - a.likes)
	);
	const dispatch = useDispatch();
	const blogFormToggableRef = useRef();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
		}
	}, []);

	const handleDelete = (blog) => {
		const confirm = window.confirm(
			`Remove Blog ${blog.title} by ${blog.author}`
		);
		if (!confirm) return;
		dispatch(deleteBlog(blog.id));
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await login({ username, password });
			window.localStorage.setItem("loggedUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			dispatch(
				setNotification({ type: "error", text: "Wrong username or password !" })
			);

			setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);
		}
	};

	const addBlog = async (newBlog) => {
		dispatch(createBlog(newBlog));
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser(null);
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

	const blogForm = () => (
		<Toggable ref={blogFormToggableRef} buttonText="new note">
			<BlogForm createBlog={addBlog} />
		</Toggable>
	);

	return (
		<div>
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

					{blogForm()}

					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							handleDelete={handleDelete}
							username={user.username}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
