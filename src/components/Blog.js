import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog: propsBlog, handleDelete, username }) => {
	const [view, setView] = useState(false);
	const [blog, setblog] = useState(propsBlog);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 10,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};
	const handleEdit = async () => {
		const editedBlog = await blogService.edit(blog.likes + 1, blog.id);
		setblog({ ...blog, likes: editedBlog.likes });
		console.log("i logged");
	};

	const deleteBlog = () => {
		handleDelete(blog);
	};
	// console.log(blog?.user?.username, username);
	return (
		<div style={blogStyle}>
			<p className="title-author">
				{blog.title} {blog.author}
				<button className="view_btn" onClick={() => setView(!view)}>
					<small>{view ? "hide" : "view"}</small>
				</button>
			</p>
			{view && (
				<div className="url-likes">
					<p>{blog.url}</p>
					<p>
						likes <span className="num_of_like">{blog.likes}</span>
						<button className="like_btn" onClick={handleEdit}>
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
			)}
		</div>
	);
};

export default Blog;
