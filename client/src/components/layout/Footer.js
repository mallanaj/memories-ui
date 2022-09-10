import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const footerText = 'Mallanagouda';
const footer = () => {
	return (
		<Paper
			elevation={0}
			variant="outlined"
			sx={{
				position: 'relative',
				bottom: 0,
				left: 0,
				righ: 0,
			}}
		>
			<Typography textAlign="center" sx={{ my: 2 }}>
				&copy; <em id="date">2022</em> {footerText}
			</Typography>
		</Paper>
	);
};

export default footer;
