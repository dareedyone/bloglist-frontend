import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const user = await login({ username, password });
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			throw exception;
		}
	};

	const loginForm = () => (
		<div>
			<h2>Log in to app</h2>

			<form onSubmit={handleSubmit}>
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
					<h6>{user.name} logged in</h6>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
