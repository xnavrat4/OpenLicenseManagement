import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
	errors: string[] | undefined;
};

const SubmitErrors: FC<Props> = ({ errors }) => (
	<Box
		sx={{
			display: 'contents'
		}}
	>
		{errors &&
			errors.length > 0 &&
			errors.map((e, i) => (
				<Box
					key={i}
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1
					}}
				>
					<ErrorOutlineIcon color="error" />
					<Typography variant="caption" sx={{ color: 'error.main' }}>
						{e}
					</Typography>
				</Box>
			))}
	</Box>
);

export default SubmitErrors;
