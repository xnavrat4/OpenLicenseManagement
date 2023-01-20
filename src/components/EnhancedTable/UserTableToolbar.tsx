import { Add } from '@mui/icons-material';
import { Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllFilter } from '../../utils/api';

const UserTableToolbar = () => {
	const [userCount, setUserCount] = useState<number>(0);

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
			const query = `userStatus=NotValidated&SortCriteria=LastName&SortDescending=true`;
			// get the data from the api
			const data = await getAllFilter('Identity/Validated', false, query);
			// set state with the result
			setUserCount(data.items?.length);
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
				Users
			</Typography>

			<IconButton title="Add new user" component={Link} to="../newusers">
				<Badge badgeContent={userCount} color="error">
					<Add />
				</Badge>
			</IconButton>
		</Toolbar>
	);
};

export default UserTableToolbar;
