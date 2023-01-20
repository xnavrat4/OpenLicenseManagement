import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import usePageTitle from '../../hooks/usePageTitle';
import {
	CustomerDetail,
	CustomerUpdate
} from '../../utils/types/CustomerTypes';
import theme from '../../utils/theme';
import EditDetailComponent from '../../components/EditDetailComponent';
import { getById } from '../../utils/api';

const CustomerDetailPage: FC = () => {
	const { id } = useParams();
	const [customer, setCustomer] = useState<CustomerDetail>();
	usePageTitle(`Customer - ${customer?.name}`);

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
			// get the data from the api
			const data = await getById(id as unknown as number, 'Customer', true);
			// set state with the result
			setCustomer(data);
		};

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);
	}, []);

	return (
		<Grid container alignContent="top" alignItems="center">
			<Grid item xs={12}>
				<EditDetailComponent
					type="customer"
					data={customer as CustomerUpdate}
				/>
			</Grid>

			<Grid container alignContent="top" alignItems="center" spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h2" fontWeight="bold" align="center">
						{customer?.name}
					</Typography>
					<Typography color="text.secondary" align="center">
						{customer?.city} - {customer?.country}
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider flexItem />
			</Grid>

			<Grid
				container
				spacing={2}
				justifyContent="center"
				alignContent="center"
				paddingTop={2}
			>
				<Grid item xs={12} margin={2}>
					<Typography variant="h5">Devices:</Typography>
				</Grid>
				{customer?.devices?.length ? (
					customer?.devices?.map((d, i) => (
						<Grid
							item
							xs={12}
							key={i}
							margin={2}
							sx={{
								backgroundColor: `${theme.palette.secondary.main}`,
								border: 1,
								borderColor: `${theme.palette.divider}`
							}}
						>
							<Card
								id="card"
								component={Link}
								to={`../../devices/${d.id}`}
								sx={{
									textDecoration: 'none'
								}}
							>
								<CardContent>
									<Grid
										container
										sx={{
											flexWrap: 'wrap',
											flexDirection: 'row',
											columnCount: 3
										}}
										justifyItems="flex-end"
									>
										<Grid
											item
											xs={3}
											justifyContent="center"
											alignItems="center"
										>
											<Typography
												fontWeight="bold"
												align="center"
												alignItems="center"
											>
												{d.serialNumber}
											</Typography>
										</Grid>
										<Grid item xs={3} justifyContent="center">
											<Typography
												fontWeight="bold"
												align="center"
												alignItems="center"
											>
												{d.additionalInfo}
											</Typography>
										</Grid>
										<Grid item xs={3} justifyContent="center">
											<Typography
												fontWeight="bold"
												align="center"
												alignItems="center"
											>
												{`Number of licenses: ${
													d.numberOfLicenses ? d.numberOfLicenses : 0
												}`}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))
				) : (
					<Grid item xs={12}>
						<Typography>No devices</Typography>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default CustomerDetailPage;
