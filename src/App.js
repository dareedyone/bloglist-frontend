import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";

const Notification = ({ message }) => {
	return message ? (
		<div className={`message ${message.type}`}>{message.text}</div>
	) : null;
};

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);

	const blogFormToggableRef = useRef();

	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
	}, []);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
		}
	}, []);

	const handleDelete = async (blog) => {
		const confirm = window.confirm(
			`Remove Blog ${blog.title} by ${blog.author}`
		);
		if (!confirm) return;
		try {
			await blogService.destroy(blog.id);
			setBlogs(blogs.filter((b) => b.id !== blog.id));
		} catch (exception) {
			setMessage({ type: "error", text: "You are not authorized !" });

			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
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
			setMessage({ type: "error", text: "Wrong username or password !" });

			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const addBlog = async (newBlog) => {
		try {
			const newblog = await blogService.create(newBlog);
			setBlogs(blogs.concat(newblog));

			setMessage({
				type: "success",
				text: `A new blog - ${newBlog.title} by ${newBlog.author} added !`,
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			blogFormToggableRef.current.toggleVisibility();
		} catch (exception) {
			setMessage({
				type: "error",
				text: "oops!, something went wrong !.",
			});

			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
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
