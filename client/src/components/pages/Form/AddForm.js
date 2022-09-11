import React, { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../../store/post-slice/PostSlice';
import { useHistory, useLocation } from 'react-router-dom';

const initialData = {
	creator: '',
	title: '',
	message: '',
	tags: '',
	selectedFile: '',
};
const AddForm = () => {
	const [filename, setFilename] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);

	const [formData, setFormData] = useState(initialData);
	const { loadingPosts, updatePostsError } = useSelector((state) => state.post);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const ref = useRef();

	useEffect(() => {
		if (location.state) {
			const { data, isUpdate: update } = location.state;
			setFormData(data);
			setIsUpdate(update);
		}
	}, [location]);

	useEffect(() => {
		if (ref.current && !loadingPosts) {
			history.push('/memories');
			clearForm();
		}
		ref.current = loadingPosts;
	}, [loadingPosts, history]);

	const handleInput = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onFileUpload = (event) => {
		setFilename(event.name);
		setFormData({ ...formData, selectedFile: event.base64 });
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
		dispatch(isUpdate ? updatePost(formData) : createPost(formData));
	};
	const clearForm = () => {
		setFormData(initialData);
		setFilename('');
	};
	return (
		<>
			<Box
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					border: '2px solid grey',
					borderRadius: 5,
					maxWidth: 600,
					margin: 'auto',
					'& > :not(style)': {
						m: 1,
						width: { xs: '75%', md: '80%' },
					},
				}}
				noValidate
				autoComplete="off"
				onSubmit={formSubmitHandler}
			>
				{loadingPosts && (
					<Stack
						alignItems="center"
						justifyContent="center"
						sx={{ position: 'absolute', top: '50%' }}
					>
						<CircularProgress sx={{ color: 'text.disabled' }} />
					</Stack>
				)}
				<Typography variant="h5" color="text.primary" textAlign="center">
					{isUpdate ? 'Creating Memory' : 'Creating a Memory'}
				</Typography>
				<TextField
					id="outlined-basic"
					label="Creator"
					variant="outlined"
					onChange={handleInput}
					name="creator"
					value={formData.creator}
				/>
				<TextField
					id="outlined-basic"
					label="Title"
					variant="outlined"
					onChange={handleInput}
					name="title"
					value={formData.title}
				/>
				<TextField
					id="outlined-basic"
					label="Message"
					variant="outlined"
					onChange={handleInput}
					name="message"
					multiline
					rows={4}
					value={formData.message}
				/>
				<TextField
					id="outlined-basic"
					label="Tags(coma separated)"
					variant="outlined"
					onChange={handleInput}
					name="tags"
					value={formData.tags}
				/>
				<Button
					fullWidth
					variant="outlined"
					name="selectedFile"
					size="medium"
					component="label"
					color="success"
					startIcon={<UploadFileIcon />}
				>
					Upload
					<Box sx={{ display: 'none' }}>
						<FileBase type="file" multiple={false} onDone={onFileUpload} />
					</Box>
				</Button>
				<Typography textAlign="center">{filename || ''}</Typography>
				<Button fullWidth variant="contained" size="medium" component="label">
					Submit
					<input type="submit" hidden />
				</Button>
				<Button
					fullWidth
					variant="contained"
					size="medium"
					component="label"
					color="error"
				>
					Clear
					<input type="reset" hidden onClick={clearForm} />
				</Button>
			</Box>
		</>
	);
};

export default AddForm;
