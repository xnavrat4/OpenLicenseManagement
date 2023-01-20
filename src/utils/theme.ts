import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		divider: string;
		licenseValid: string;
		licenseInvalid: string;
		alert: string;
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		divider?: string;
		licenseValid?: string;
		licenseInvalid?: string;
		alert: string;
	}
}

const theme = createTheme({
	palette: {
		primary: { main: '#06BEE1' },
		secondary: { main: '#FBFBFB' },
		divider: '#EFEFEF',
		alert: '#FF3131',
		licenseInvalid: '#FF3131',
		licenseValid: '#AAF0C1',
		mode: 'light'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				// Css rule that makes sure app is always 100% height of window
				'body, #root': {
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	},
	transitions: {
		duration: {
			enteringScreen: 10,
			leavingScreen: 10
		}
	}
});

export default theme;
