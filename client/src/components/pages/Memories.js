import Memory from './Memory/Memory';
import React, { useEffect } from 'react';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
// import Masonry from 'react-masonry-css';
import Masonry from '@mui/lab/Masonry';

import { useDispatch, useSelector } from 'react-redux';
import {
	postActions,
	fetchAllPosts,
	createPost,
	deletePost,
	likePost,
	updatePost,
} from '../../store/post-slice/PostSlice';
import { Stack } from '@mui/system';

const Memories = () => {
	const { posts, loadingPosts, postsError } = useSelector(
		(state) => state.post
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!posts.length) dispatch(fetchAllPosts());
	}, [dispatch, posts]);

	const delelePostHandler = (id) => {
		console.log('In on delete handler ', id);
		dispatch(deletePost(id));
	};

	const likePostHandler = (id) => {
		console.log('In like post');
		dispatch(likePost(id));
	};

	return (
		// <Grid
		// 	container
		// 	justifyContent="center"
		// 	alignItems="stretch"
		// 	spacing={{ xs: 1, sm: 2, md: 3 }}
		// >
		// {posts?.map((post, index) => (
		// 	<Grid item xs={12} sm={6} md={4} key={index}>
		// 		<Memory key={post.id} post={post} />
		// 	</Grid>
		// ))}
		// </Grid>
		// <Masonry
		// 	breakpointCols={3}
		// 	className="my-masonry-grid"
		// 	columnClassName="my-masonry-grid_column"
		// >
		// 	{/* array of JSX items */}
		// 	{posts?.map((post, index) => (
		// 		<div key={index}>
		// 			<Memory
		// 				post={post}
		// 				onDelete={delelePostHandler}
		// 				onLike={likePostHandler}
		// 			/>
		// 		</div>
		// 	))}
		// </Masonry>

		<>
			{postsError.message && (
				<Alert severity="error">This is an error alert — check it out!</Alert>
			)}
			{loadingPosts && (
				<Stack alignItems="center" justifyContent="center">
					<CircularProgress sx={{ color: 'text.disabled' }} />
				</Stack>
			)}
			{!posts.length && !loadingPosts && (
				<Stack alignItems="center" justifyContent="center">
					<Typography varient="h5">No posts available</Typography>
				</Stack>
			)}
			<Masonry
				columns={{ xs: 1, sm: 2, md: 3 }}
				spacing={{ xs: 1, sm: 2, md: 3 }}
			>
				{posts?.map((post) => (
					<Memory
						key={post._id}
						post={post}
						onDelete={delelePostHandler}
						onLike={likePostHandler}
					/>
				))}
			</Masonry>
		</>
	);
};

export default Memories;
