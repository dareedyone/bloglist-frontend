import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
const blogReducer = (state = [], action) => {
	switch (action.type) {
		case "INIT_BLOGS":
			return action.payload;
		case "NEW_BLOG":
			return [...state, action.payload];
		case "REMOVE_BLOG":
			return state.filter((b) => b.id !== action.payload);
		case "ADD_LIKE":
			return state.map((blog) =>
				blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
			);

		default:
			return state;
	}
};

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch({
			type: "INIT_BLOGS",
			payload: blogs,
		});
	};
};

export const deleteBlog = (blogId) => {
	return async (dispatch) => {
		try {
			await blogService.destroy(blogId);
			dispatch({
				type: "REMOVE_BLOG",
				payload: blogId,
			});
		} catch {
			dispatch(
				setNotification({ type: "error", text: "You are not authorized !" })
			);

			setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);
		}
	};
};

export const createBlog = (blog) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(blog);
			dispatch({
				type: "NEW_BLOG",
				payload: newBlog,
			});

			dispatch(
				setNotification({
					type: "success",
					text: `A new blog - ${newBlog.title} by ${newBlog.author} added !`,
				})
			);

			setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);
		} catch {
			dispatch(
				setNotification({
					type: "error",
					text: "oops!, something went wrong !.",
				})
			);

			setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);
		}
	};
};

export const addLike = (blog) => {
	return async (dispatch) => {
		await blogService.edit(blog.likes + 1, blog.id);
		dispatch({
			type: "ADD_LIKE",
			payload: blog.id,
		});
	};
};

export default blogReducer;
