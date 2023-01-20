import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

import useField from '../../hooks/useField';
import { create, update } from '../../utils/api';
import {
	CustomerCreate,
	CustomerUpdate
} from '../../utils/types/CustomerTypes';

type Props = {
	children: (open: () => void) => ReactNode;
	customer?: CustomerUpdate;
	setSuccessInfo: (info: string) => void;
};

const CustomerForm = ({ children, customer, setSuccessInfo }: Props) => {
	// Open state
	const [open, setOpen] = useState(false);

	// Fields
	const [name, nameProps, setName] = useField('description');
	const [city, cityProps, setCity] = useField('description');
	const [country, countryProps, setCountry] = useField('description');

	const [submitError, setSubmitError] = useState<string>();

	useEffect(() => {
		if (customer) {
			setName(customer.name);
			setCity(customer.city);
			setCountry(customer.country);
		}
	}, [customer]);

	// Close and reset handler
	const closeDialog = () => {
		setOpen(false);
		if (!customer) {
			nameProps.onChange({ target: { value: '' } } as never);
			countryProps.onChange({ target: { value: '' } } as never);
			cityProps.onChange({ target: { value: '' } } as never);
		}
		setSubmitError(undefined);
	};

	// Submit handler
	const handleSubmit = async () => {
		//to do

		try {
			if (customer) {
				const c = {
					id: customer?.id,
					name,
					city,
					country
				} as CustomerUpdate;
				await update('Customer', true, c);
				setSuccessInfo('Customer updated!');
			} else {
				const c = {
					name,
					city,
					country
				} as CustomerCreate;
				await create('Customer', true, c);
				setSuccessInfo('Customer added!');
			}
			closeDialog();
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'unknownError');
		}
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>
					{customer ? 'Edit customer' : 'Create customer'}
				</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: 500
					}}
				>
					<TextField sx={{ mt: 2 }} label="Name" fullWidth {...nameProps} />
					<TextField label="City" fullWidth {...cityProps} />
					<TextField label="Country" fullWidth {...countryProps} />
				</DialogContent>
				<DialogActions>
					{submitError && (
						<Typography
							variant="subtitle2"
							align="left"
							color="error"
							paragraph
						>
							{submitError}
						</Typography>
					)}
					<Button onClick={closeDialog}>Cancel</Button>
					<Button onClick={handleSubmit} variant="contained">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CustomerForm;
