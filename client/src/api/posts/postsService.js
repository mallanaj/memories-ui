import http from '../index';

const fetchAllPosts = async (url) => {
	try {
		const resp = await http.get(url);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

const addPost = async (url, payload) => {
	try {
		const resp = await http.post(url, payload);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

const updatePost = async (url, payload) => {
	try {
		const resp = await http.patch(url, payload);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

const deletePost = async (id) => {
	try {
		const resp = await http.delete('posts/' + id);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

const likePost = async (id) => {
	try {
		const resp = await http.patch(`posts/${id}/likePost`);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

export { fetchAllPosts, addPost, updatePost, deletePost, likePost };
