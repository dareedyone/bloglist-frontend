import React from "react";
const UserBlogPage = ({ user }) => {
	if (!user) return <div>Loading...</div>;
	return (
		<div>
			<h2>{user?.name}</h2>

			<ul>
				{user?.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default UserBlogPage;
