import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { create } from '../../utils/api';
import useEditLicense from '../../hooks/useEditLicense';
import { DeviceName } from '../../utils/types/DeviceTypes';
import LicenseForm from '../Forms/LicenseForm';

type Props = {
	children: (open: () => void) => ReactNode;
	device?: DeviceName;
	newLicense: boolean;
};

const AddLicense = ({ children, device, newLicense }: Props) => {
	// Open state
	const [open, setOpen] = useState(false);

	const [props, _, returnLicense] = useEditLicense(true, false, device);

	const [submitError, setSubmitError] = useState<string>();

	// Close and reset handler
	const closeDialog = () => {
		setOpen(false);
		setSubmitError(undefined);
	};

	// Submit handler
	const handleSubmit = async () => {
		const license = returnLicense();
		try {
			// get the data from the api
			const res = await create('License', true, license);
			// set state with the result
			console.log('License res:', res);
			closeDialog();
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'unknownError');
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle textAlign="center">Create license</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: 500
					}}
				>
					<LicenseForm
						productName={props.productName}
						productNameProps={props.productNameProps}
						parameters={props.parameters}
						parametersProps={props.parametersProps}
						validTo={props.validTo}
						setValidTo={props.setValidTo}
						validFrom={props.validFrom}
						setValidFrom={props.setValidFrom}
						deviceName={props.deviceName}
						setDeviceName={props.setDeviceName}
						devices={props.devices}
						revoked={props.revoked}
						setRevoked={props.setRevoked}
						new={newLicense}
					/>
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
		</LocalizationProvider>
	);
};

export default AddLicense;
