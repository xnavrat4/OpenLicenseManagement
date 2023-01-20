import { Toolbar, Typography } from '@mui/material';

const ViolationTableToolbar = () => (
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
			Violations
		</Typography>
	</Toolbar>
);

export default ViolationTableToolbar;
