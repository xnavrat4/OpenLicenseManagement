import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import theme from '../../utils/theme';
import { HeadCell } from '../../utils/types/UtilTypes';

type Order = 'asc' | 'desc';

type EnhancedTableProps = {
	headCells: HeadCell[];
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	order: Order;
	orderBy: string;
};

const EnhancedTableHead = (props: EnhancedTableProps) => {
	const { headCells, order, orderBy, onRequestSort } = props;
	const createSortHandler =
		(property: string, enabled: boolean) =>
		(event: React.MouseEvent<unknown>) => {
			if (enabled) {
				onRequestSort(event, property);
			}
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.type}
						align={headCell.numeric ? 'right' : 'left'}
						padding="normal"
						sortDirection={orderBy === headCell.label ? order : false}
						sx={{ backgroundColor: `${theme.palette.secondary.main}` }}
					>
						<TableSortLabel
							active={orderBy === headCell.type}
							direction={orderBy === headCell.type ? order : 'asc'}
							onClick={createSortHandler(headCell.type, headCell.enabled)}
						>
							{headCell.label}
							{orderBy === headCell.type ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;
