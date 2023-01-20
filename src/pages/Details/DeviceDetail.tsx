import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import usePageTitle from '../../hooks/usePageTitle';
import { getById } from '../../utils/api';
import { DeviceDetail } from '../../utils/types/DeviceTypes';
import EditDetailComponent from '../../components/EditDetailComponent';
import DeviceLicenses from '../../components/Device/DeviceLicenses';
import DeviceHardware from '../../components/Device/DeviceHardware';
import DeviceViolations from '../../components/Device/DeviceViolations';
import DeviceLogs from '../../components/Device/DeviceLogs';

const DeviceDetailPage: FC = () => {
	const { id } = useParams();
	const [device, setDevice] = useState<DeviceDetail>();
	usePageTitle(`Device - ${device?.serialNumber}`);
	const [value, setValue] = useState<number>(0);

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
			// get the data from the api
			const data = await getById(id as unknown as number, 'Device', true);
			// set state with the result
			setDevice(data as DeviceDetail);
			//setValue(0);
		};

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const getCurrentTabContent = (id: number) => {
		switch (id) {
			case 0: {
				return <DeviceHardware id={device?.id as number} open />;
			}
			case 1: {
				return <DeviceLicenses id={device?.id as number} open />;
			}
			case 2: {
				return <DeviceViolations deviceId={device?.id as number} open />;
			}
			case 3: {
				return <DeviceLogs id={device?.id as number} />;
			}
			default: {
				return <div />;
			}
		}
	};

	return (
		<Grid container alignContent="top" alignItems="center">
			<Grid item xs={12}>
				<EditDetailComponent type="device" data={device} />
			</Grid>
			<Grid container alignContent="top" alignItems="center" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h2" fontWeight="bold" align="center">
						{device?.serialNumber}
					</Typography>
					<Typography
						color="text.secondary"
						align="center"
						component={Link}
						to={`../../customers/${device?.customer?.id}`}
						sx={{ textDecoration: 'none' }}
					>
						{device?.customer?.name}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: 'divider',
							justifyContent: 'center'
						}}
					>
						<Tabs value={value} onChange={handleChange} centered>
							<Tab label="Hardware information" />
							<Tab label="Licenses" />
							<Tab label="Violation" />
							<Tab label="Logs" />
						</Tabs>
					</Box>
				</Grid>
				<Grid
					container
					justifyContent="center"
					alignContent="center"
					paddingTop={2}
				>
					<Grid item xs={12}>
						{getCurrentTabContent(value)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default DeviceDetailPage;
