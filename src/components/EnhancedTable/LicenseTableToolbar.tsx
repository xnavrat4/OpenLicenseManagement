import { Add } from '@mui/icons-material';
import { IconButton, Toolbar, Typography } from '@mui/material';

import AddLicense from '../AddLicense';

const LicenseTableToolbar = () => (
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
			Licenses
		</Typography>

		<AddLicense isNew>
			{open => (
				<IconButton title="Add new license" onClick={open}>
					<Add />
				</IconButton>
			)}
		</AddLicense>
	</Toolbar>
);

export default LicenseTableToolbar;
