import { Card } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import theme from '../utils/theme';

const OLMCard: FC<PropsWithChildren> = ({ children }) => (
	<Card
		sx={{
			backgroundColor: `${theme.palette.secondary.main}`,
			border: 1,
			borderColor: `${theme.palette.divider}`
		}}
		variant="outlined"
	>
		{children}
	</Card>
);

export default OLMCard;
