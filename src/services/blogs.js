import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};
const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then((response) => response.data);
};

const create = async (blog) => {
	const config = {
		headers: { Authorization: token },
	};
	const res = await axios.post(baseUrl, blog, config);
	return res.data;
};

const edit = async (likes, blogId) => {
	const res = await axios.put(baseUrl + "/" + blogId, { likes });
	return res.data;
};

export default { getAll, setToken, create, edit };
