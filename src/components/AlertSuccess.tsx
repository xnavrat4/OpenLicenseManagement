import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { FC, PropsWithChildren } from 'react';

import AlertBox from './AlertBox';

const AlertSuccess: FC<PropsWithChildren> = ({ children }) => (
	<AlertBox
		severity="success"
		color="success.light"
		backgroundColor="success.dark"
		iconMapping={{
			success: (
				<CheckCircleOutline
					fontSize="inherit"
					sx={{
						color: 'success.light'
					}}
				/>
			)
		}}
	>
		{children}
	</AlertBox>
);

export default AlertSuccess;
