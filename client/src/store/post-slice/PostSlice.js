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
		updateCreatePost(state, actions) {
			state.posts.push(actions.payload);
		},
		updatePost(state, actions) {
			state.posts = state.posts.map((p) =>
				p._id === actions.payload._id ? actions.payload : p
			);
		},
	},
});

//Thunk fns
const fetchAllPosts = () => {
	return async (dispatch) => {
		dispatch(postActions.setLoadingPost(true));
		try {
			const resp = await service.fetchAllPosts('posts');
			dispatch(postActions.setAllPosts(resp));
		} catch (error) {
		} finally {
			dispatch(postActions.setLoadingPost(false));
		}
	};
};
const createPost = (data) => {
	return async (dispatch) => {
		dispatch(postActions.setLoadingPost(true));
		try {
			const resp = await service.addPost('posts', data);
			dispatch(postActions.updateCreatePost(resp));
		} catch (error) {
			console.log('error');
		} finally {
			dispatch(postActions.setLoadingPost(false));
		}
	};
};
const deletePost = (id) => {
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
			const resp = await service.updatePost(`posts/${data._id}`, data);
			dispatch(postActions.updatePost(resp));
		} catch (error) {
			console.log('error');
		} finally {
			dispatch(postActions.setLoadingPost(false));
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
