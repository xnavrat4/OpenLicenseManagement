import { Grid, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { getById } from '../../utils/api';
import { HWInfo } from '../../utils/types/DeviceTypes';
import HWInfoComponent from '../HWInfoComponent';

type Props = {
	id: number;
	open: boolean;
};

const DeviceHardware = ({ id, open }: Props) => {
	const [hwInfo, setHwInfo] = useState<HWInfo>();
	const [firstOpen, setFirstOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!firstOpen) {
			setFirstOpen(open);
		}
	}, [open]);

	useEffect(() => {
		const fetchLicenses = async () => {
			if (id !== undefined) {
				// get the data from the api
				const data = await getById(id, 'Device/HWInfo', true);
				// set state with the result
				setHwInfo(data as HWInfo);
			}
		};

		// call the function
		if (firstOpen) {
			fetchLicenses().catch(console.error);
		}
	}, [firstOpen, id]);

	return hwInfo ? (
		<Grid item xs={12}>
			<Box p={2}>
				<HWInfoComponent hwInfo={hwInfo} />
			</Box>
		</Grid>
	) : (
		<Grid item xs={12}>
			<Typography>No hardware</Typography>
		</Grid>
	);
};

export default DeviceHardware;
