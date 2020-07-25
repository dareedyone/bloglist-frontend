import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newBlog, setNewBlog] = useState({});

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
			throw exception;
		}
	};

	const addBlog = async (event) => {
		event.preventDefault();
		try {
			const newblog = await blogService.create(newBlog);
			setBlogs(blogs.concat(newblog));
		} catch (exception) {
			console.error(exception);
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
					<h2>blogs</h2>

					<h5>
						{user.name} logged in{" "}
						<button onClick={handleLogout}>
							<small>logout</small>{" "}
						</button>
					</h5>

					<div>
						<form onSubmit={addBlog}>
							<h2>Blogs</h2>
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
