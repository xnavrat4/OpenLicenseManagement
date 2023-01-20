import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

import useField from '../hooks/useField';
import { get, update } from '../utils/api';
import { CustomerName } from '../utils/types/CustomerTypes';
import { DeviceTable, DeviceUpdate, HWInfo } from '../utils/types/DeviceTypes';

type Props = {
	children: (open: () => void) => ReactNode;
	setSuccessInfo: (info: string) => void;
	device: DeviceTable;
	isEdit: boolean;
};

const AddDevice = ({
	children,
	device,
	setSuccessInfo: setSuccess,
	isEdit
}: Props) => {
	// Open state
	const [open, setOpen] = useState(false);
	const timeUnits = ['hours', 'days', 'months', 'years'];

	const [deviceTmp, setDeviceTmp] = useState<DeviceTable>();

	// Fields
	const [customer, setCustomer] = useState<string>('');
	const [timeUnit, setTimeUnit] = useState<string>('hours');
	const [hwInfo, setHWInfo] = useState<HWInfo>();
	const [id, setId] = useState<number>();
	const [submitError, setSubmitError] = useState<string>();

	const [serialNumber, serialNumberProps, setSerialNumber] =
		useField('serialNumber');
	const [additionalInfo, additionalProps, setAdditionalInfo] =
		useField('addInfo');
	const [time, timeProps, setTime] = useField('time');

	const [customers, setCustomers] = useState<CustomerName[]>(
		undefined as never
	);

	const parseTime = (hours: number) => {
		if (hours < 24) {
			setTime(hours.toString());
			setTimeUnit('hours');
			return;
		}
		const days = Math.floor(hours / 24);
		if (days < 30) {
			setTime(days.toString());
			setTimeUnit('days');
			return;
		}
		const months = Math.floor(days / 30);
		if (months < 12) {
			setTime(months.toString());
			setTimeUnit('months');
			return;
		}
		const years = Math.floor(months / 12);
		setTime(years.toString());
		setTimeUnit('years');
	};

	useEffect(() => {
		setDeviceTmp(device);
		setId(device.id);
		setHWInfo(device.hwInfo);
		setCustomer(device.customer ? device.customer.name : '');
		setAdditionalInfo(device.additionalInfo ? device.additionalInfo : '');
		setSerialNumber(device.serialNumber ? device.serialNumber : '');
		parseTime(device.heartbeatFrequency);
	}, [device]);

	// Close and reset handler
	const closeDialog = () => {
		setOpen(false);
		setId(device.id);
		setHWInfo(device.hwInfo);
		setCustomer(device.customer ? device.customer.name : '');
		setAdditionalInfo(device.additionalInfo ? device.additionalInfo : '');
		setSerialNumber(device.serialNumber ? device.serialNumber : '');
		parseTime(device.heartbeatFrequency);
		setSubmitError(undefined);
	};

	useEffect(() => {
		const fetchLicenses = async () => {
			// get the data from the api
			const data = await get('Customer/Simple', false);
			// set state with the result
			setCustomers(data as CustomerName[]);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, []);

	const calculateTime = (): number => {
		if (time === '-1') {
			return -1;
		}
		const timeTmp = Number(time);
		switch (timeUnit) {
			case 'days': {
				return timeTmp * 24;
			}
			case 'months': {
				return timeTmp * 24 * 30;
			}
			case 'years': {
				return timeTmp * 24 * 365;
			}
			default: {
				return timeTmp;
			}
		}
	};

	// Submit handler
	const handleSubmit = async () => {
		try {
			const d = {
				id,
				serialNumber,
				additionalInfo,
				heartbeatFrequency: calculateTime(),
				validity: true,
				hwInfo,
				customer: customers.find(c => c.name === customer) as CustomerName
			} as DeviceUpdate;
			await update('Device/Validate', true, d);
			// set state with the result
			setSuccess('Device added sucessfully');
			closeDialog();
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'unknownError');
		}
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle textAlign="center">
					{isEdit ? 'Edit device' : 'Validate device'}
				</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						minWidth: 500
					}}
				>
					<FormControl fullWidth sx={{ mt: 2 }}>
						<Grid
							container
							justifyContent="center"
							alignContent="center"
							spacing={2}
						>
							<Grid item xs={12}>
								<TextField
									select
									value={customer}
									label="Customer"
									onChange={e => {
										setCustomer(e.target.value);
									}}
									sx={{ display: 'flex' }}
								>
									{customers?.map((c, i) => (
										<MenuItem key={i} value={c.name}>
											{c.name}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Serial number"
									fullWidth
									{...serialNumberProps}
								/>
							</Grid>

							<Grid item xs={12}>
								<Box sx={{ display: 'flex' }}>
									<TextField
										fullWidth
										type="number"
										label="Offline mode period lenght"
										{...timeProps}
										InputProps={{ inputProps: { min: '1', max: '100' } }}
									/>
									<TextField
										select
										fullWidth
										label="Unit"
										value={timeUnit}
										onChange={e => {
											setTimeUnit(e.target.value);
										}}
										sx={{ display: 'flex' }}
									>
										{timeUnits.map((u, i) => (
											<MenuItem key={i} value={u}>
												{u}
											</MenuItem>
										))}
									</TextField>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Additional info"
									multiline
									rows={5}
									fullWidth
									{...additionalProps}
								/>
							</Grid>
						</Grid>
					</FormControl>
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

export default AddDevice;
