import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog: propsBlog }) => {
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
	};

	return (
		<div style={blogStyle}>
			<p>
				{blog.title} {blog.author}
				<button onClick={() => setView(!view)}>
					<small>{view ? "hide" : "view"}</small>
				</button>
			</p>
			{view && (
				<>
					<p>{blog.url}</p>
					<p>
						likes {blog.likes}{" "}
						<button onClick={handleEdit}>
							<small>like</small>
						</button>
					</p>
					<p>{blog.user?.username}</p>
				</>
			)}
		</div>
	);
};

export default Blog;
