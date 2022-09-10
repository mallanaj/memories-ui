import Routes from './Router/Routes';
import Layout from './components/layout/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	const [mode, setMode] = useState('dark');

	const onModeChangeHandler = () => {
		setMode((curMode) => (curMode === 'dark' ? 'light' : 'dark'));
	};
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout themeChange={onModeChangeHandler}>
				<Routes />
			</Layout>
		</ThemeProvider>
	);
}

export default App;
