import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const config = {
		headers: { Authorization: token }
	};

	const request = axios.get(baseUrl, config);
	return request.then(response => response.data);
};

const createBlog = async (newBook) => {
	const config = {
		headers: { Authorization: token }
	};

	try {
		const _response = await axios.post(baseUrl, newBook, config);
		return _response.data;
	} catch(_err){
		throw( _err.response.data.error ?  _err.response.data.error : _err);
	}
};

const updateBlog = async (updatedBlog) => {
	const config = {
		headers: { Authorization: token }
	};

	try {
		const _response = await axios.put(baseUrl+'/'+updatedBlog.id, updatedBlog, config);
		return _response.data;
	} catch(_err){
		throw( _err.response.data.error ?  _err.response.data.error : _err);
	}
};

const removeBlog = async (id) => {
	const config = {
		headers: { Authorization: token }
	};

	try {
		const _response = await axios.delete(baseUrl+'/'+id, config);
		return _response;
	} catch(_err){
		throw( _err.response.data.error ?  _err.response.data.error : _err);
	}
};

export default { getAll, createBlog, setToken, updateBlog, removeBlog };