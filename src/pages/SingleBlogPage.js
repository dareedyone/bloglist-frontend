import React from "react";
import { useEffect } from "react";
import { initializeBlogs, addLike } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const SingleBlogPage = ({ blog }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);
	if (!blog) {
		return <div>loading...</div>;
	}

	const handleLike = () => {
		dispatch(addLike(blog));
	};
	return (
		<div>
			<h3>{blog.title}</h3>
			<a href={blog.url}>{blog.url}</a>
			<p>
				{blog.likes} likes <button onClick={handleLike}>like</button>
			</p>
			<p> added by {blog.user.name}</p>

			<h4>comments</h4>
			<ul>
				{blog.comments.map((c, i) => (
					<li key={i}>{c}</li>
				))}
			</ul>
		</div>
	);
};

export default SingleBlogPage;
