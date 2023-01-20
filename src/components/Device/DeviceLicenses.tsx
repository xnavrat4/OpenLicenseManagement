import { Grid, Card, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getById } from '../../utils/api';
import theme from '../../utils/theme';
import { LicenseDetail } from '../../utils/types/LicenseTypes';

type Props = {
	id: number;
	open: boolean;
};

const DeviceLicenses = ({ id, open }: Props) => {
	const [licenses, setLicenses] = useState<LicenseDetail[]>();
	const [firstOpen, setFirstOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!firstOpen) {
			setFirstOpen(open);
		}
	}, [open]);

	useEffect(() => {
		const fetchLicenses = async () => {
			// get the data from the api
			const data = await getById(id, 'Device/Licenses', true);
			// set state with the result
			setLicenses(data as LicenseDetail[]);
		};

		// call the function
		if (firstOpen) {
			fetchLicenses().catch(console.error);
		}
	}, [firstOpen, id]);

	const getColor = (revoked: boolean, validFrom: Date, validTo: Date) => {
		if (revoked) {
			return `${theme.palette.licenseInvalid}`;
		}
		const dateNow = moment();
		if (dateNow.isBetween(validFrom, validTo, 'days', '[]')) {
			return `${theme.palette.licenseValid}`;
		} else {
			return `${theme.palette.divider}`;
		}
	};

	return licenses?.length ? (
		<Grid item xs={12}>
			{licenses?.map((l, i) => (
				<Grid
					item
					xs={12}
					key={i}
					component={Link}
					to={`../../licenses/${l.id}`}
					sx={{
						textDecoration: 'none',
						m: 1
					}}
				>
					<Card
						sx={{
							backgroundColor: `${getColor(l.revoked, l.validFrom, l.validTo)}`,
							border: 1,
							borderColor: `${theme.palette.divider}`,
							padding: 3
						}}
						variant="outlined"
					>
						<Grid container justifyItems="center">
							<Grid item xs={3}>
								<Typography fontWeight="bold" align="center">
									{l.productName} - {l.parameters}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography fontWeight="bold" align="center">
									{l.licenseKey.toString()}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography align="center">
									{moment(l.validFrom).format('DD/MM/YYYY')} -{' '}
									{moment(l.validTo).format('DD/MM/YYYY')}
								</Typography>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			))}
		</Grid>
	) : (
		<Grid item xs={12}>
			<Typography>No licenses</Typography>
		</Grid>
	);
};

export default DeviceLicenses;
