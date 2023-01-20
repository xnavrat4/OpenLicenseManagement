import { Card, Divider, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import usePageTitle from '../../hooks/usePageTitle';
import { getById } from '../../utils/api';
import { LicenseDetail } from '../../utils/types/LicenseTypes';
import theme from '../../utils/theme';
import getReadableTime from '../../utils/getReadableTime';
import EditDetailComponent from '../../components/EditDetailComponent';

const LicenseDetailPage: FC = () => {
	const { id } = useParams();
	const [license, setLicense] = useState<LicenseDetail>();
	usePageTitle(`License - ${license?.productName}`);

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
			// get the data from the api
			const data = await getById(id as unknown as number, 'License', true);
			// set state with the result
			setLicense(data as LicenseDetail);
		};

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);
	}, []);

	return (
		<Grid container alignContent="top" alignItems="center">
			<Grid item container xs={12} justifyContent="flex-end">
				<EditDetailComponent type="license" data={license} />
			</Grid>
			<Grid container alignContent="top" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h2" fontWeight="bold" align="center">
						{license?.productName}
					</Typography>
					{license?.device?.serialNumber ? (
						<Typography
							color="text.secondary"
							align="center"
							component={Link}
							to={`../devices/${license?.device.id}`}
							sx={{ textDecoration: 'none' }}
						>
							{license?.device.serialNumber}
						</Typography>
					) : (
						<Typography
							color="text.secondary"
							align="center"
							sx={{ textDecoration: 'none' }}
						>
							Not linked to device yet
						</Typography>
					)}
				</Grid>
				<Grid item xs={12}>
					<Divider flexItem />
				</Grid>
				{license?.device && (
					<>
						<Grid item xs={12}>
							<Typography variant="h5">Device information:</Typography>
						</Grid>
						{license?.device?.serialNumber ? (
							<Grid
								item
								xs={12}
								component={Link}
								to={`../devices/${license?.device.id}`}
								sx={{ textDecoration: 'none' }}
							>
								<Card
									sx={{
										backgroundColor: `${theme.palette.secondary.main}`,
										border: 1,
										borderColor: `${theme.palette.divider}`,
										padding: 3
									}}
									variant="outlined"
								>
									<Grid container justifyItems="center">
										<Grid item xs={4}>
											<Typography sx={{ fontSize: 18 }}>
												{license?.device.serialNumber}
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography align="center">
												{license?.device?.customer?.name}
											</Typography>
										</Grid>

										<Grid item xs={4}>
											<Typography align="center">
												Last online:{' '}
												{getReadableTime(license?.device.lastOnline)} ago
											</Typography>
										</Grid>
									</Grid>
								</Card>
							</Grid>
						) : (
							<Grid item xs={12} sx={{ textDecoration: 'none' }}>
								<Typography align="center"> No device linked yet</Typography>
							</Grid>
						)}
					</>
				)}
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h5">License detail</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={2}>
							<Typography align="right">Product: </Typography>
						</Grid>
						<Grid item xs={10}>
							<Typography align="left">{license?.productName}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="right">Parameters: </Typography>
						</Grid>
						<Grid container item xs={10} justifyItems="left">
							<Typography align="left">{license?.parameters}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="right">License key: </Typography>
						</Grid>
						<Grid item xs={10}>
							<Typography align="left">
								{license?.licenseKey.toString()}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="right">Revoked: </Typography>
						</Grid>
						<Grid item xs={10}>
							<Typography align="left">{String(license?.revoked)}</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="right">Valid from: </Typography>
						</Grid>
						<Grid item xs={10}>
							<Typography align="left">
								{moment(license?.validFrom).format('DD-MM-YYYY')}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography align="right">Valid to: </Typography>
						</Grid>
						<Grid item xs={10}>
							<Typography align="left">
								{moment(license?.validTo).format('DD-MM-YYYY')}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LicenseDetailPage;
