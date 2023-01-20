import { Add } from '@mui/icons-material';
import { IconButton, Toolbar, Typography } from '@mui/material';

import CustomerForm from '../Forms/CustomerForm';

const CustomerTableToolbar = () => (
	<Toolbar
		sx={{
			pl: { sm: 2 },
			pr: { xs: 1, sm: 1 }
		}}
	>
		<Typography
			sx={{ flex: '1 1 100%' }}
			variant="h5"
			id="tableTitle"
			component="div"
		>
			Customers
		</Typography>

		<CustomerForm
			setSuccessInfo={(s: string) => {
				console.log(s);
			}}
		>
			{open => (
				<IconButton title="Add new customer" onClick={open}>
					<Add />
				</IconButton>
			)}
		</CustomerForm>
	</Toolbar>
);

export default CustomerTableToolbar;
