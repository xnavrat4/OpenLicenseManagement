import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { ProfileData } from '../utils/types/UtilTypes';
import { changePassword, get, updateProfile } from '../utils/api';
import theme from '../utils/theme';
import AlertSuccess from '../components/AlertSuccess';

const Profile = () => {
	usePageTitle('Profile');

	useEffect(() => {
		const fetchData = async () => {
			const profileData = await get('Identity/Profile', true);
			setProfile(profileData as ProfileData);
		};

		fetchData();
	}, []);

	const [userId, setUserId] = useState<number | undefined>();
	const [email, usernameProps, setEmail] = useField('email', true, true);
	const [firstName, firstNameProps, setFirstName] = useField('firstName', true);
	const [lastName, lastNameProps, setLastName] = useField('lastName', true);
	const [phoneNumber, phoneNumberProps, setPhoneNumber] = useField(
		'phoneNumber',
		true
	);

	const [oldPassword, oldPasswordProps, setOldPassword] = useField(
		'oldPassword',
		true
	);
	const [newPassword, newPasswordProps, setNewPassword] = useField(
		'newPassword',
		true
	);

	const setProfile = (profileData: ProfileData) => {
		setUserId(profileData.id);
		setEmail(profileData.email);
		setFirstName(profileData.firstName);
		setLastName(profileData.lastName);
		setPhoneNumber(profileData.phoneNumber);
	};

	const [submitProfileErrors, setSubmitProfileErrors] = useState<string>();
	const [submitPasswordErrors, setSubmitPasswordErrors] = useState<string>();
	const [successInfo, setSuccessInfo] = useState<string>();

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				{successInfo && <AlertSuccess>{successInfo}</AlertSuccess>}
			</Grid>
			<Grid item xs={12}>
				<Paper
					title="Profile data"
					component="form"
					onSubmit={async (e: FormEvent) => {
						e.preventDefault();
						try {
							const updated = (await updateProfile({
								id: userId as number,
								email,
								firstName,
								lastName,
								phoneNumber
							})) as unknown as ProfileData | null;
							if (updated) {
								setProfile(updated);
								setSubmitProfileErrors('');
								setSuccessInfo('Profile data has been updated');
								setOldPassword('');
								setNewPassword('');
								window.scrollTo(0, 0);
							}
						} catch (err) {
							setSuccessInfo(undefined);
							setSubmitPasswordErrors('');
							setSubmitProfileErrors(
								(err as { message?: string })?.message ?? 'unknownError'
							);
						}
					}}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						backgroundColor: theme.palette.secondary.main,
						p: 4,
						gap: 2
					}}
				>
					<Typography variant="h4" component="h2" textAlign="center" mb={3}>
						Profile data
					</Typography>
					<TextField label="Email" {...usernameProps} type="email" />
					<TextField label="FirstName" {...firstNameProps} />
					<TextField label="LastName" {...lastNameProps} />
					<TextField label="PhoneNumber" {...phoneNumberProps} type="tel" />
					{submitProfileErrors && (
						<Typography color={`${theme.palette.alert}`}>
							{submitProfileErrors}
						</Typography>
					)}
					<Box
						sx={{
							display: 'contents',
							gap: 2,
							alignItems: 'center',
							alignSelf: 'flex-end',
							mt: 2
						}}
					>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{
								px: 3,
								alignSelf: 'center'
							}}
						>
							Update profile
						</Button>
					</Box>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper
					title="Change password"
					component="form"
					onSubmit={async (e: FormEvent) => {
						e.preventDefault();
						try {
							const updated = await changePassword({
								userId: userId as number,
								oldPassword,
								newPassword
							});
							if (updated?.status === 200) {
								setSubmitPasswordErrors('');
								setSubmitProfileErrors('');
								setOldPassword('');
								setNewPassword('');
								setSuccessInfo('Password has been updated');
								window.scrollTo(0, 0);
							}
						} catch (err) {
							setSubmitProfileErrors('');
							setSuccessInfo(undefined);
							setSubmitPasswordErrors(
								(err as { message?: string })?.message ?? 'unknownError'
							);
						}
					}}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						backgroundColor: theme.palette.secondary.main,
						p: 4,
						gap: 2
					}}
				>
					<Typography variant="h4" component="h2" textAlign="center" mb={3}>
						Change password
					</Typography>
					<TextField
						label="OldPassword"
						{...oldPasswordProps}
						type="password"
					/>
					<TextField
						label="NewPassword"
						{...newPasswordProps}
						type="password"
					/>
					{submitPasswordErrors && (
						<Typography color={`${theme.palette.alert}`}>
							{submitPasswordErrors}
						</Typography>
					)}
					<Box
						sx={{
							display: 'contents',
							gap: 2,
							alignItems: 'center',
							alignSelf: 'flex-end',
							mt: 2
						}}
					>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{
								px: 3,
								alignSelf: 'center'
							}}
						>
							Change password
						</Button>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Profile;
