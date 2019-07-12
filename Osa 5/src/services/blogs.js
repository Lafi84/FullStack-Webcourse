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

const createBook = async (newBook) => {
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

const updateBlog = async (likedBook) => {
	const config = {
		headers: { Authorization: token }
	};

	try {
		const _response = await axios.put(baseUrl+'/'+likedBook.id, likedBook, config);
		return _response.data;
	} catch(_err){
		throw( _err.response.data.error ?  _err.response.data.error : _err);
	}
};

const removeBlog = async (likedBook) => {
	const config = {
		headers: { Authorization: token }
	};

	try {
		const _response = await axios.delete(baseUrl+'/'+likedBook.id, config);
		return _response;
	} catch(_err){
		throw( _err.response.data.error ?  _err.response.data.error : _err);
	}
};

export default { getAll, createBook, setToken, updateBlog, removeBlog };