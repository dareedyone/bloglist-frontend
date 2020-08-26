import React, { useEffect, useRef } from "react";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import Toggable from "../components/Toggable";
import { useSelector, useDispatch } from "react-redux";
import {
	initializeBlogs,
	createBlog,
	deleteBlog,
} from "../reducers/blogReducer";

const BlogPage = ({ user }) => {
	const dispatch = useDispatch();
	const blogFormToggableRef = useRef();
	const blogs = useSelector((state) =>
		state.blogs.sort((a, b) => b.likes - a.likes)
	);

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	const addBlog = async (newBlog) => {
		dispatch(createBlog(newBlog));
	};
	const handleDelete = (blog) => {
		const confirm = window.confirm(
			`Remove Blog ${blog.title} by ${blog.author}`
		);
		if (!confirm) return;
		dispatch(deleteBlog(blog.id));
	};

	return (
		<div>
			<Toggable ref={blogFormToggableRef} buttonText="new note">
				<BlogForm createBlog={addBlog} />
			</Toggable>

			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					handleDelete={handleDelete}
					username={user.username}
				/>
			))}
		</div>
	);
};

export default BlogPage;
