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
import Container from "@material-ui/core/Container";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		marginRight: theme.spacing(6),
		textDecoration: "none",
		color: "inherit",
	},
}));

const Notification = ({ message }) => {
	return message ? (
		<Alert style={{ marginBottom: "15px" }} severity={`${message.type}`}>
			{message.text}
		</Alert>
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
	const classes = useStyles();

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
		<Container>
			<h2>Log in to app</h2>

			<Notification message={message} />

			<form onSubmit={handleLogin}>
				<TextField
					style={{ marginBottom: "15px" }}
					type="text"
					name="username"
					onChange={({ target }) => setUsername(target.value)}
					id="outlined-basic"
					label="username"
					variant="outlined"
				/>

				<br />
				<TextField
					style={{ marginBottom: "15px" }}
					type="password"
					name="password"
					autoComplete="off"
					onChange={({ target }) => setPassword(target.value)}
					label="password"
					variant="outlined"
				/>
				<br />
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
			</form>
		</Container>
	);

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Link className={classes.title} to="/blogs">
						<Typography variant="h6">Blogs</Typography>
					</Link>

					<Link className={classes.title} to="/users">
						<Typography variant="h6">Users</Typography>
					</Link>

					{user && (
						<Button onClick={handleLogout} color="inherit">
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Container maxWidth={false}>
				{!user ? (
					loginForm()
				) : (
					<div>
						<h2>Blogs</h2>

						<Notification message={message} />

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
			</Container>
		</div>
	);
};

export default App;
