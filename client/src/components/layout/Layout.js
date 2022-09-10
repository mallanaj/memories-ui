import { Box } from '@mui/system';

import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';
const Layout = ({ children, themeChange }) => {
	return (
		<Box>
			<Header themeChange={themeChange} />
			<Container
				maxWidth="lg"
				sx={{
					minHeight: '83vh',
					marginTop: 5,
					marginBottom: 5,
				}}
			>
				{children}
			</Container>
			<Footer />
		</Box>
	);
};

export default Layout;
