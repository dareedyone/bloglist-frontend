import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({});
	const handleChange = ({ target }) => {
		setNewBlog((oldBlog) => ({
			...oldBlog,
			[target.name]: target.value,
		}));
	};

	const addBlog = (event) => {
		event.preventDefault();
		createBlog(newBlog);
	};

	return (
		<div>
			<form onSubmit={addBlog}>
				<h2>Create new</h2>
				<div>
					Title:
					<input name="title" type="text" onChange={handleChange} />
				</div>
				<div>
					Author:
					<input name="author" type="text" onChange={handleChange} />
				</div>
				<div>
					Url:
					<input name="url" type="text" onChange={handleChange} />
				</div>
				<div>
					<button type="submit">create</button>
				</div>
			</form>
		</div>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
