import { Check } from '@mui/icons-material';
import {
	Grid,
	Typography,
	Box,
	IconButton,
	List,
	ListItem
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { getById, update } from '../../utils/api';
import { Violation } from '../../utils/types/UtilTypes';

type Props = {
	deviceId: number;
	open: boolean;
};

const DeviceViolations = ({ deviceId, open }: Props) => {
	const [violations, setViolations] = useState<Violation[]>();

	const [firstOpen, setFirstOpen] = useState<boolean>(false);
	const [idchange, setIdChange] = useState<number>(-1);

	useEffect(() => {
		if (!firstOpen) {
			setFirstOpen(open);
		}
	}, [open]);

	useEffect(() => {
		const fetchLicenses = async () => {
			// get the data from the api
			const data = await getById(deviceId, 'Device/Violations', false);
			// set state with the result
			setViolations(data as Violation[]);
		};

		// call the function
		if (firstOpen) {
			fetchLicenses().catch(console.error);
		}
	}, [firstOpen, idchange, deviceId]);

	const handleResolve = async (id: number) => {
		const resolveDto = {
			violationId: id,
			deviceId
		};
		try {
			await update('Device/ResolveViolation', true, resolveDto);
			return true;
		} catch {
			console.log('error');
			return false;
		}
	};

	return violations?.length ? (
		<Grid item xs={12}>
			<List>
				<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
					<ListItem sx={{ pl: 3 }}>Type</ListItem>
					<ListItem sx={{ pl: 3 }}>Previous value</ListItem>
					<ListItem sx={{ pl: 3 }}>Current value</ListItem>
					<ListItem sx={{ pl: 3 }}>Commited on</ListItem>
					<ListItem sx={{ pl: 3 }}>Resolved</ListItem>
				</Box>
				{violations.map((v, i) => (
					<Box key={i} sx={{ display: 'flex', gap: 2 }}>
						<ListItem sx={{ pl: 3 }}>{v.violationType}</ListItem>
						<ListItem sx={{ pl: 3 }}>{v.formerValue}</ListItem>
						<ListItem sx={{ pl: 3 }}>{v.currentValue}</ListItem>
						<ListItem sx={{ pl: 3 }}>
							{moment(v.dateTime).format('DD-MMM-YYYYTHH:mm:ss')}
						</ListItem>
						<ListItem sx={{ pl: 3 }}>
							{v.resolved ? (
								<Typography>Resolved</Typography>
							) : (
								<IconButton
									title="Resolve issue"
									onClick={async () => {
										v.resolved = await handleResolve(v.id);
										setIdChange(v.id);
									}}
								>
									<Check />
								</IconButton>
							)}
						</ListItem>
					</Box>
				))}
			</List>
		</Grid>
	) : (
		<Grid item xs={12}>
			<Typography>No violations</Typography>
		</Grid>
	);
};

export default DeviceViolations;
