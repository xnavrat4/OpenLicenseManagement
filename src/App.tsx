import { Box, CssBaseline, ThemeProvider } from '@mui/material';
// eslint-disable-next-line import/order
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import { ProSidebarProvider } from 'react-pro-sidebar';

import theme from './utils/theme';
import Layout from './components/Layout';
import AppRoutes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';

const App = () => (
	<Box className="App">
		<UserProvider>
			<ThemeProvider theme={theme}>
				<ProSidebarProvider>
					<BrowserRouter>
						<CssBaseline />
						<Layout>
							<AppRoutes />
						</Layout>
					</BrowserRouter>
				</ProSidebarProvider>
			</ThemeProvider>
		</UserProvider>
	</Box>
);

export default App;
