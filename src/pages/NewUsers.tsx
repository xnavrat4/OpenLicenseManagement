import { Check } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import AlertSuccess from '../components/AlertSuccess';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import useSuccessInfo from '../hooks/useSuccesInfo';
import { getAllFilter, update } from '../utils/api';
import { UserFull, UserStatus, UserValidate } from '../utils/types/UtilTypes';

const NewUsers = () => {
	usePageTitle('New users');
	const [user, _] = useLoggedInUser();
	const [users, setUsers] = useState<UserFull[]>(undefined as never);

	const [successInfo, setSuccessInfo] = useSuccessInfo();

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `userStatus=NotValidated&SortCriteria=LastName&SortDescending=true`;
			// get the data from the api
			const data = await getAllFilter('Identity/Validated', true, query);
			// set state with the result
			setUsers(data.items);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, [successInfo]);

	const handleValidate = async (u: UserFull) => {
		try {
			const userValidate = {
				id: u.id,
				userStatus: UserStatus.Validated,
				addedById: user?.id
			} as UserValidate;
			await update('Identity/Validate', true, userValidate);
			setSuccessInfo(`${u.lastName} ${u.firstName} was validated`);
		} catch (err) {
			console.error((err as { message?: string })?.message ?? 'unknownError');
		}
	};

	return (
		<>
			{successInfo && <AlertSuccess>{successInfo}</AlertSuccess>}
			<Grid container justifyContent="center" spacing={2}>
				<Grid item>
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant="h6"
						id="tableTitle"
						component="div"
					>
						Not validated users
					</Typography>
				</Grid>
				{users?.map((u, i) => (
					<Grid
						item
						key={i}
						xs={12}
						sx={{ border: 'none', boxShadow: 'none', display: 'flex' }}
					>
						<Grid container spacing={1} alignItems="center">
							<Grid item xs={3}>
								<Typography>
									Name: {u.lastName} {u.firstName}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography>Email: {u.email}</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography>Phone number: {u.phoneNumber}</Typography>
							</Grid>
							<Grid item xs={1}>
								<IconButton
									title="Validate user"
									onClick={() => {
										handleValidate(u);
									}}
								>
									<Check />
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default NewUsers;
