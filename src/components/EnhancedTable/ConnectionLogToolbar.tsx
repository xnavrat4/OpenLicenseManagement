import { Toolbar, Typography } from '@mui/material';

const ConnectionLogTableToolbar = () => (
	<Toolbar
		sx={{
			pl: { sm: 2 },
			pr: { xs: 1, sm: 1 }
		}}
	>
		<Typography
			sx={{ flex: '1 1 100%' }}
			variant="h5"
			id="tableTitle"
			component="div"
		>
			Connection logs
		</Typography>
	</Toolbar>
);

export default ConnectionLogTableToolbar;
