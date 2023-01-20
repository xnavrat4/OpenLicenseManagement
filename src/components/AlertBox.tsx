import { Alert, AlertColor } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = {
	severity: AlertColor;
	color?: string;
	backgroundColor?: string;
	iconMapping?: Partial<Record<AlertColor, React.ReactNode>>;
} & PropsWithChildren;

const AlertBox: FC<Props> = ({
	severity,
	color,
	backgroundColor,
	iconMapping,
	children
}) => (
	<Alert
		iconMapping={iconMapping}
		variant="standard"
		severity={severity}
		sx={{
			backgroundColor,
			color,
			py: 0,
			my: 0
		}}
	>
		{children}
	</Alert>
);

export default AlertBox;
