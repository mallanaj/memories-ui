import { createSlice } from '@reduxjs/toolkit';
import * as service from '../../api/posts/postsService';

const initialState = {
	posts: [],
	loadingPosts: true,
	postsError: {},
};

const postSlice = createSlice({
	name: 'Post',
	initialState,
	reducers: {
		setAllPosts(state, actions) {
			state.posts = actions.payload;
		},
		setLoadingPost(state, actions) {
			state.loadingPosts = actions.payload;
		},
		setError(state, actions) {
			state.postsError = actions.payload;
		},
		updateLikes(state, actions) {
			state.posts = state.posts.map((p) =>
				p._id === actions.payload.id ? actions.payload.data : p
			);
		},
		updateDelete(state, actions) {
			state.posts = state.posts.filter((p) => p._id !== actions.payload.id);
		},
	},
});

//Thunk fns
const fetchAllPosts = () => {
	console.log('In fetch All');
	return async (dispatch) => {
		dispatch(postActions.setLoadingPost(true));
		try {
			const resp = await service.fetchAllPosts('posts');
			console.log('resp is ', resp);
			dispatch(postActions.setAllPosts(resp));
		} catch (error) {
			console.log('error');
		} finally {
			dispatch(postActions.setLoadingPost(false));
		}
	};
};
const createPost = (data) => {
	return async (dispatch) => {
		dispatch(postActions.setLoadingPost(true));
		try {
			const resp = await service.addPost(data);
			dispatch(postActions.setAllPosts(resp));
		} catch (error) {
			console.log('error');
		} finally {
			dispatch(postActions.setLoadingPost(true));
		}
	};
};
const deletePost = (id) => {
	console.log('On delete thunk');
	return async (dispatch) => {
		try {
			await service.deletePost(id);
			dispatch(postActions.update(id));
		} catch (error) {
			console.log('error');
		}
	};
};

const likePost = (id) => {
	return async (dispatch) => {
		try {
			const data = await service.likePost(id);
			console.log('data nd id ', id, data);
			dispatch(postActions.updateLikes({ data, id }));
		} catch (error) {
			console.log('error');
		}
	};
};

const updatePost = (data) => {
	return async (dispatch) => {
		dispatch(postActions.setLoadingPost(true));
		try {
			const resp = await service.updatePost(data);
			dispatch(postActions.setAllPosts(resp));
		} catch (error) {
			console.log('error');
		} finally {
			dispatch(postActions.setLoadingPost(true));
		}
	};
};

const postActions = postSlice.actions;

export {
	postActions,
	fetchAllPosts,
	createPost,
	deletePost,
	likePost,
	updatePost,
};
export default postSlice.reducer;
