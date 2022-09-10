import http from '../index';

const URL = 'http://localhost:5000/';

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
		const resp = await http.put(url, payload);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

const deletePost = async (id) => {
	console.log('id id ', id);
	try {
		const resp = await http.delete('posts/' + id);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

// posts/631bfb6665efd636dccf7eb9/likePost
const likePost = async (id) => {
	console.log('id id ', id);
	try {
		const resp = await http.patch(`posts/${id}/likePost`);
		return resp.data;
	} catch (error) {
		// handle error
		console.log('error ', error);
	}
};

export { fetchAllPosts, addPost, updatePost, deletePost, likePost };
