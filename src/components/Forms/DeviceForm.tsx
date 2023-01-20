import { Box, Grid, MenuItem, TextField } from '@mui/material';
import { useEffect } from 'react';

import { EditDeviceProps } from '../../utils/types/UtilTypes';

const DeviceForm = (props: EditDeviceProps) => (
	<Grid
		container
		xs={12}
		justifyContent="center"
		alignContent="center"
		spacing={2}
	>
		<Grid item xs={12}>
			<TextField
				select
				value={props.customer}
				label="Customer"
				onChange={e => {
					props.setCustomerName(e.target.value);
				}}
				sx={{ display: 'flex' }}
			>
				{props.customers?.map((c, i) => (
					<MenuItem key={i} value={c.name}>
						{c.name}
					</MenuItem>
				))}
			</TextField>
		</Grid>
		<Grid item xs={12}>
			<TextField label="Serial number" fullWidth {...props.serialNumberProps} />
		</Grid>

		<Grid item xs={12}>
			<Box sx={{ display: 'flex' }}>
				<TextField
					fullWidth
					type="number"
					label="Offline mode period lenght"
					{...props.timeProps}
					InputProps={{ inputProps: { min: '-1', max: '100' } }}
				/>
				<TextField
					select
					fullWidth
					label="Unit"
					value={props.timeUnit}
					onChange={e => {
						console.log(e.target.value);
						props.setTimeUnit(e.target.value);
					}}
					sx={{ display: 'flex' }}
				>
					{props.timeUnits.map((u, i) => (
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
				{...props.additionalInfoProps}
			/>
		</Grid>
	</Grid>
);

export default DeviceForm;
