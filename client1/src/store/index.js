import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post-slice/PostSlice';

const store = configureStore({
	reducer: { post: postReducer },
});

export default store;
