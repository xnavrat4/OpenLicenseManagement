import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useField from '../hooks/useField';
import useLocalStorage from '../hooks/useLocalStorage';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import { UserWithToken } from '../utils/types/UtilTypes';
import { signInAsync } from '../utils/api';
import SubmitErrors from '../components/SubmitErrors';
import theme from '../utils/theme';

const Login = () => {
	usePageTitle('Login');
	const navigate = useNavigate();
	const [authToken, setAuthToken] = useLocalStorage('authToken');
	const [_, setUser] = useLoggedInUser();

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Grid
			container
			spacing={1}
			height="100vh"
			justifyContent="center"
			alignContent="center"
		>
			<Grid item xs={12} sm={6}>
				<>
					<Paper
						component="form"
						onSubmit={async (e: FormEvent) => {
							e.preventDefault();
							try {
								const userWithToken = (await signInAsync(
									email,
									password
								)) as unknown as UserWithToken | null;
								if (userWithToken) {
									const { token, ...user } = userWithToken;
									setAuthToken(token);
									setUser(user);
									navigate('/licenses');
								}
							} catch (err) {
								setSubmitError(
									(err as { message?: string })?.message ?? (err as string)
								);
							}
						}}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: `${theme.palette.secondary.main}`,
							width: '100%',
							p: 4,
							gap: 2
						}}
					>
						<Typography variant="h4" component="h2" textAlign="center" mb={3}>
							Sign in
						</Typography>
						<TextField label="Email" {...usernameProps} type="email" />
						<TextField label="Password" {...passwordProps} type="password" />
						<Box
							sx={{
								display: 'contents',
								gap: 2,
								alignItems: 'center',
								alignSelf: 'flex-end',
								mt: 2
							}}
						>
							<SubmitErrors errors={submitError ? [submitError] : undefined} />
							<Button
								type="submit"
								variant="contained"
								color="primary"
								sx={{
									px: 3,
									alignSelf: 'center'
								}}
							>
								Log in
							</Button>
						</Box>
					</Paper>
					{!authToken && (
						<Box
							sx={{
								alignSelf: 'center',
								mt: 1
							}}
						>
							<Typography> Don&apos;t have an account yet ?</Typography>
							<Button
								variant="outlined"
								component={Link}
								to="/register"
								sx={{
									mt: 1
								}}
							>
								Create account
							</Button>
						</Box>
					)}
				</>
			</Grid>
		</Grid>
	);
};

export default Login;
