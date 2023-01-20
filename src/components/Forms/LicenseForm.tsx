import { Grid, MenuItem, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { EditLicenseProps } from '../../utils/types/UtilTypes';

const LicenseForm = (props: EditLicenseProps) => (
	<LocalizationProvider dateAdapter={AdapterDayjs}>
		<Grid container justifyContent="center" alignContent="center" spacing={2}>
			<Grid item xs={12}>
				<TextField
					sx={{ mt: 2 }}
					label="Product"
					fullWidth
					{...props.productNameProps}
				/>
			</Grid>

			<Grid item xs={12}>
				<TextField label="Parameters" fullWidth {...props.parametersProps} />
			</Grid>
			{!props.new && (
				<Grid item xs={12}>
					<TextField
						value={props.revoked ? 'Revoked' : 'Valid'}
						label="Status"
						select
						fullWidth
						onChange={e => {
							props.setRevoked(e.target.value === 'Revoked');
						}}
					>
						<MenuItem value="Revoked">Revoked</MenuItem>
						<MenuItem value="Valid">Valid</MenuItem>
					</TextField>
				</Grid>
			)}
			<Grid item xs={6}>
				<DesktopDatePicker
					label="Valid from"
					inputFormat="DD/MM/YYYY"
					value={props.validFrom}
					onChange={props.setValidFrom}
					renderInput={params => <TextField {...params} />}
				/>
			</Grid>
			<Grid item xs={6}>
				<DesktopDatePicker
					label="Valid to"
					inputFormat="DD/MM/YYYY"
					value={props.validTo}
					onChange={props.setValidTo}
					renderInput={params => <TextField {...params} />}
				/>
			</Grid>
		</Grid>
	</LocalizationProvider>
);

export default LicenseForm;
