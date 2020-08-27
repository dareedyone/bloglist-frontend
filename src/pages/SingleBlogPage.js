import React from "react";
import { useEffect, useState } from "react";
import { initializeBlogs, addLike, addComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const SingleBlogPage = ({ blog }) => {
	const [comment, setComment] = useState("");
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
	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const handleComment = () => {
		dispatch(addComment(comment, blog.id));
		setComment("");
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
			<div>
				<input value={comment} type="text" onChange={handleChange} />{" "}
				<button onClick={handleComment}>comment</button>
			</div>
			<ul>
				{blog.comments.map((c, i) => (
					<li key={i}>{c}</li>
				))}
			</ul>
		</div>
	);
};

export default SingleBlogPage;
