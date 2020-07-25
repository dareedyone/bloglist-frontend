import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import "./App.css";
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
	const [newBlog, setNewBlog] = useState({});
	const [message, setMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
		}
	}, []);

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

	const addBlog = async (event) => {
		event.preventDefault();
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

	const handleChange = ({ target }) => {
		setNewBlog((oldBlog) => ({
			...oldBlog,
			[target.name]: target.value,
		}));
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

					<div>
						<form onSubmit={addBlog}>
							<h2>Create new</h2>
							<div>
								Title:
								<input name="title" type="text" onChange={handleChange} />
							</div>
							<div>
								Author:
								<input name="author" type="text" onChange={handleChange} />
							</div>
							<div>
								Url:
								<input name="url" type="text" onChange={handleChange} />
							</div>
							<button>create</button>
						</form>
					</div>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
