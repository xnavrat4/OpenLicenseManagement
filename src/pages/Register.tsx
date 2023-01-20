import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { signUpAsync } from '../utils/api';
import SubmitErrors from '../components/SubmitErrors';

const Register = () => {
	usePageTitle('Register');
	const navigate = useNavigate();

	const [open, setOpen] = useState<boolean>(false);

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);
	const [firstName, firstNameProps] = useField('firstName', true);
	const [lastName, lastNameProps] = useField('lastName', true);
	const [phoneNumber, phoneNumberProps] = useField('phoneNumber', true);

	const [submitErrors, setSubmitErrors] = useState<string[]>();

	const handleClose = () => {
		setOpen(false);
		navigate('/');
	};

	return (
		<>
			<Dialog open={open} keepMounted onClose={handleClose}>
				<DialogTitle>Account was succesfully created</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Your account was successfuly created. Please wait until it is
						approved by an administrator.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>OK</Button>
				</DialogActions>
			</Dialog>
			<Grid container spacing={1} justifyContent="center">
				<Grid item xs={12} sm={6}>
					<Paper
						component="form"
						onSubmit={async (e: FormEvent) => {
							e.preventDefault();
							try {
								await signUpAsync({
									email,
									password,
									firstName,
									lastName,
									phoneNumber
								});
								setOpen(true);
							} catch (err) {
								setSubmitErrors(
									(err as { message?: string })?.message?.split('\n') ??
										(err as string[])
								);
							}
						}}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							p: 4,
							gap: 2
						}}
					>
						<Typography variant="h4" component="h2" textAlign="center" mb={3}>
							Create account
						</Typography>
						<TextField label="Email" {...usernameProps} type="email" />
						<TextField label="Password" {...passwordProps} type="password" />
						<TextField label="FirstName" {...firstNameProps} />
						<TextField label="LastName" {...lastNameProps} />
						<TextField label="PhoneNumber" {...phoneNumberProps} type="tel" />
						<Box
							sx={{
								display: 'contents',
								gap: 2,
								alignItems: 'center',
								alignSelf: 'flex-end',
								mt: 2
							}}
						>
							<SubmitErrors errors={submitErrors} />
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								sx={{
									px: 3,
									alignSelf: 'center'
								}}
							>
								Sign up
							</Button>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Register;
