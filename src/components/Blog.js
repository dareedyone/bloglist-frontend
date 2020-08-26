import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addLike } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleDelete, username }) => {
	const [view, setView] = useState(false);
	// const dispatch = useDispatch();

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 10,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};
	// const handleLike = () => {
	// 	dispatch(addLike(blog));
	// };

	// const deleteBlog = () => {
	// 	handleDelete(blog);
	// };
	return (
		<div style={blogStyle}>
			<p className="title-author">
				<Link to={`/blogs/${blog.id}`}>
					{blog.title} - {blog.author}
				</Link>
				<button className="view_btn" onClick={() => setView(!view)}>
					<small>{view ? "hide" : "view"}</small>
				</button>
			</p>
			{/* {view && (
				<div className="url-likes">
					<p>{blog.url}</p>
					<p>
						likes <span className="num_of_like">{blog.likes}</span>
						<button className="like_btn" onClick={handleLike}>
							<small>like</small>
						</button>
					</p>
					<p>{blog.user?.username}</p>
					{username === blog?.user?.username && (
						<button onClick={deleteBlog} style={{ backgroundColor: "blue" }}>
							Delete
						</button>
					)}
				</div>
			)} */}
		</div>
	);
};

export default Blog;
