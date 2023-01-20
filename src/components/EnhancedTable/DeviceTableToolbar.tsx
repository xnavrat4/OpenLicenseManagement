import { Add } from '@mui/icons-material';
import { Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllFilter } from '../../utils/api';

const DeviceTableToolbar = () => {
	const [deviceCount, setDeviceCount] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			const query = `Activated=false&SortCriteria=Id&SortDescending=false`;
			// get the data from the api
			const data = await getAllFilter('Device/Validity', false, query);
			// set state with the result
			setDeviceCount(data.items?.length);
		};

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);
	}, []);

	return (
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
				Devices
			</Typography>

			<IconButton component={Link} to="/newDevices" title="Add new device">
				<Badge badgeContent={deviceCount} color="error">
					<Add />
				</Badge>
			</IconButton>
		</Toolbar>
	);
};

export default DeviceTableToolbar;
