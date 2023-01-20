import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import AddDevice from '../components/AddDevice';
import AlertSuccess from '../components/AlertSuccess';
import HWInfoComponent from '../components/HWInfoComponent';
import usePageTitle from '../hooks/usePageTitle';
import useSuccessInfo from '../hooks/useSuccesInfo';
import { getAllFilter } from '../utils/api';
import { DeviceQueryResult, DeviceTable } from '../utils/types/DeviceTypes';

const NewDevices = () => {
	usePageTitle('New Devices');
	const [devices, setDevices] = useState<DeviceTable[]>(undefined as never);

	const [successInfo, setSuccessInfo] = useSuccessInfo();

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `Activated=false&SortCriteria=Id&SortDescending=false`;
			// get the data from the api
			const data = await getAllFilter('Device/Validity', true, query);
			// set state with the result
			const res = data as DeviceQueryResult;
			setDevices(res.items);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, [successInfo]);

	return (
		<>
			{successInfo && <AlertSuccess>{successInfo}</AlertSuccess>}
			<Grid container spacing={2} pt={2}>
				<Grid item xs={12}>
					<Typography sx={{ flex: '1 1 100%' }} variant="h5" component="div">
						New devices
					</Typography>
				</Grid>
				{devices?.map((d, i) => (
					<Grid item key={i} xs={12}>
						<Card sx={{ padding: 2 }}>
							<Box
								alignItems="center"
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between'
								}}
							>
								<Typography sx={{ fontSize: 20 }} align="center">
									New Device #{i + 1}
								</Typography>
								<Button>
									<AddDevice
										device={d}
										setSuccessInfo={setSuccessInfo}
										isEdit={false}
									>
										{open => <Button onClick={open}>Validate</Button>}
									</AddDevice>
								</Button>
							</Box>

							<Grid item xs={12}>
								<Box p={2}>
									<HWInfoComponent hwInfo={d.hwInfo} />
								</Box>
							</Grid>
						</Card>
					</Grid>
				))}
				{!devices && (
					<Grid item xs={12}>
						<Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
							No new devices!
						</Typography>
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default NewDevices;
