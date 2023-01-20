import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { create, update } from '../utils/api';
import useEditLicense from '../hooks/useEditLicense';
import { DeviceName } from '../utils/types/DeviceTypes';
import { LicenseDetail } from '../utils/types/LicenseTypes';

import LicenseForm from './Forms/LicenseForm';

type Props = {
	children: (open: () => void) => ReactNode;
	setSuccessInfo?: (info: string) => void;
	license?: LicenseDetail;
	device?: DeviceName;
	isNew: boolean;
};

const AddLicense = ({ children, device, license, isNew }: Props) => {
	// Open state
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);

	const [props, parseLicense, returnLicense, parseDevice, clearProps] =
		useEditLicense(isNew, false, device);
	const [successInfo, setSuccessInfo] = useState<string>();
	const [submitError, setSubmitError] = useState<string>();

	// Close and reset handler
	const closeDialog = () => {
		setOpenSuccess(false);
		setSubmitError(undefined);
		setSuccessInfo(undefined);
		clearProps(isNew);
		setOpen(false);
	};

	useEffect(() => {
		if (license !== undefined) {
			parseLicense(license);
		}
	}, [license]);

	// Submit handler
	const handleSubmit = async () => {
		//to do
		const license = returnLicense();
		console.log(license);
		try {
			if (isNew) {
				const res = await create('License', true, license);
				// set state with the result
				console.log('License res:', res);
				const l = res?.data as LicenseDetail;
				setSuccessInfo(l.licenseKey.toString());
				setOpen(false);
				setOpenSuccess(true);
			} else {
				await update('License', true, license);
				setOpen(false);
				window.location.reload();
			}
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'unknownError');
		}
	};

	useEffect(() => {
		if (device) {
			parseDevice(device);
		}
	});

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle textAlign="center">
					{license === undefined ? 'Create license' : 'Edit license'}
				</DialogTitle>
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
						new={license === undefined}
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
			{!license && (
				<Dialog open={openSuccess}>
					<DialogTitle align="center">Success</DialogTitle>
					<DialogContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							minWidth: 500
						}}
					>
						<Typography textAlign="center">
							License with license key {successInfo} has been created.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								navigator.clipboard.writeText(successInfo as string);
							}}
						>
							Copy key to clipboard
						</Button>
						<Button onClick={closeDialog}>Ok</Button>
					</DialogActions>
				</Dialog>
			)}
		</LocalizationProvider>
	);
};

export default AddLicense;
