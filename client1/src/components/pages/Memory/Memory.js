import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ThumbUpAlt } from '@mui/icons-material';
import { Stack } from '@mui/system';

export default function RecipeReviewCard({ post, onDelete, onLike }) {
	const [raised, setRaised] = React.useState(false);

	return (
		<Card
			sx={{
				borderRadius: 5,
				border: '1px solid yellow',
			}}
			raised={raised}
			title={post.title}
		>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<EditIcon />
					</IconButton>
				}
				title={post.creator}
				subheader={post.createdAt}
			/>
			<CardMedia component="img" image={post.selectedFile} alt="Paella dish" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{post.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{post.message}
				</Typography>
			</CardContent>
			{/*  Card actions */}
			<Stack direction="row" justifyContent="space-between" p={2}>
				<Button startIcon={<ThumbUpAlt />} onClick={() => onLike(post._id)}>
					Like {post.likeCount}
				</Button>
				<Button startIcon={<DeleteIcon />} onClick={() => onDelete(post._id)}>
					Delete
				</Button>
			</Stack>
		</Card>
	);
}
