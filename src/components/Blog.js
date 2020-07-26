import React, { useState } from "react";
const Blog = ({ blog }) => {
	const [view, setView] = useState(false);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 10,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
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
						<button>
							<small>like</small>
						</button>
					</p>
				</>
			)}
		</div>
	);
};

export default Blog;
