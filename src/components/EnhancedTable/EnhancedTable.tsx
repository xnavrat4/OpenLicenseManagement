import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
	Divider,
	IconButton,
	TablePagination,
	Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Add, Check, KeyboardDoubleArrowUp } from '@mui/icons-material';

import {
	TableType,
	HeadCell,
	TableData,
	Order,
	UserFull,
	ConnectionLog,
	Violation
} from '../../utils/types/UtilTypes';
import { CustomerTable } from '../../utils/types/CustomerTypes';
import { LicenseTable } from '../../utils/types/LicenseTypes';
import { DeviceTable } from '../../utils/types/DeviceTypes';
import getReadableTime from '../../utils/getReadableTime';
import { updateRole } from '../../utils/api';

import CustomerTableToolbar from './CustomerTableToolbar';
import EnhancedTableHead from './TableHead';
import DeviceTableToolbar from './DeviceTableToolbar';
import LicenseTableToolbar from './LicenseTableToolbar';
import UserTableToolbar from './UserTableToolbar';
import ConnectionLogTableToolbar from './ConnectionLogToolbar';
import ViolationTableToolbar from './ViolationTableToolbar';

type EnhancedTableProps = {
	tableType: TableType;
	headCells: HeadCell[];
	data: TableData;
	order: Order;
	setOrder: React.Dispatch<React.SetStateAction<Order>>;
	orderBy: string;
	setOrderBy: React.Dispatch<React.SetStateAction<string>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	pageSize: number;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	totalItemsCount: number;
};

const EnhancedTable = (props: EnhancedTableProps) => {
	const {
		tableType,
		headCells,
		data,
		order,
		setOrder,
		orderBy,
		setOrderBy,
		page,
		setPage,
		pageSize,
		setPageSize,
		totalItemsCount
	} = props;

	const handleRequestSort = (
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		event: React.MouseEvent<unknown>,
		property: string
	) => {
		console.log('here');
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handlePromoteToAdmin = async (email: string) => {
		try {
			await updateRole(email, `Identity/UpdateAdminRole`, true);
			return true;
		} catch {
			console.log('User could not be updated');
			return false;
		}
	};

	const getToolbar = (tableType: TableType) => {
		switch (tableType) {
			case 'customer': {
				return <CustomerTableToolbar />;
			}
			case 'device': {
				return <DeviceTableToolbar />;
			}
			case 'license': {
				return <LicenseTableToolbar />;
			}
			case 'user': {
				return <UserTableToolbar />;
			}
			case 'connectionLogs': {
				return <ConnectionLogTableToolbar />;
			}
			case 'violation': {
				return <ViolationTableToolbar />;
			}
			default: {
				return <div />;
			}
		}
	};

	const getTableBody = (tableType: TableType) => {
		switch (tableType) {
			case 'customer': {
				const customers = data as CustomerTable[];
				return customers?.map((c, i) => (
					<TableRow
						hover
						role="button"
						tabIndex={-1}
						key={i}
						component={Link}
						to={`${c.id}`}
						sx={{ textDecoration: 'none' }}
					>
						<TableCell align="left">{c.name}</TableCell>
						<TableCell align="left">{c.city}</TableCell>
						<TableCell align="left">{c.country}</TableCell>
						<TableCell align="right">{c.numberOfDevices}</TableCell>
					</TableRow>
				));
			}

			case 'device': {
				const devices = data as DeviceTable[];
				return devices?.map((d, i) => (
					<TableRow
						hover
						role="button"
						tabIndex={-1}
						key={i}
						component={Link}
						to={`${d.id}`}
						sx={{ textDecoration: 'none' }}
					>
						<TableCell align="left">{d.serialNumber} </TableCell>
						<TableCell align="left">{d.customer?.name}</TableCell>
						<TableCell align="left">{d.additionalInfo}</TableCell>
						<TableCell align="left">{`${getReadableTime(
							d.lastOnline
						)} ago`}</TableCell>
						<TableCell align="right">{d.numberOfLicenses}</TableCell>
					</TableRow>
				));
			}

			case 'license': {
				const license = data as LicenseTable[];
				return license?.map((l, i) => (
					<TableRow
						hover
						role="button"
						tabIndex={-1}
						key={i}
						component={Link}
						to={`${l.id}`}
						sx={{ textDecoration: 'none' }}
					>
						<TableCell align="left">{l.productName}</TableCell>
						<TableCell align="left">{l.parameters}</TableCell>
						<TableCell align="left">{l.device?.serialNumber}</TableCell>
						<TableCell align="left">{String(l.revoked)}</TableCell>
						<TableCell align="left">
							{moment(l.validFrom).format('DD-MM-YYYY')}
						</TableCell>
						<TableCell align="left">
							{moment(l.validTo).format('DD-MM-YYYY')}
						</TableCell>
					</TableRow>
				));
			}

			case 'user': {
				const users = data as UserFull[];
				return users?.map((u, i) => (
					<TableRow hover role="checkbox" tabIndex={-1} key={i}>
						<TableCell align="left">{u.firstName}</TableCell>
						<TableCell align="left">{u.lastName}</TableCell>
						<TableCell align="left">{u.isAdmin ? 'Admin' : 'User'}</TableCell>
						<TableCell align="left">{u.email}</TableCell>
						<TableCell align="left">
							{u.addedBy?.lastName} {u.addedBy?.firstName}
						</TableCell>
						<TableCell align="left">
							{moment(u.addedOn).format('DD-MMM-YYYY')}
						</TableCell>
						<TableCell>
							{!u.isAdmin && (
								<IconButton
									title="Promote to admin"
									onClick={async () => {
										u.isAdmin = await handlePromoteToAdmin(u.email);
										window.location.reload();
									}}
								>
									<KeyboardDoubleArrowUp />
								</IconButton>
							)}
						</TableCell>
					</TableRow>
				));
			}

			case 'connectionLogs': {
				const logs = data as ConnectionLog[];
				return logs?.map((l, i) => (
					<TableRow hover role="checkbox" tabIndex={-1} key={i}>
						<TableCell align="left">
							{moment(l.systemTime).format('DD/MM/YYYYTHH:MM:SS')}
						</TableCell>
						<TableCell align="left">{l.type}</TableCell>
						<TableCell align="left">{l.result}</TableCell>
						<TableCell align="left">{l.licenseKey}</TableCell>
					</TableRow>
				));
			}

			case 'violation': {
				const violations = data as Violation[];
				return violations?.map((v, i) => (
					<TableRow hover role="checkbox" tabIndex={-1} key={i}>
						<TableCell align="left">{v.violationType}</TableCell>
						<TableCell align="left">
							{moment(v.dateTime).format('DD/MM/YYYYTHH:MM:SS')}
						</TableCell>
						<TableCell align="left">{v.formerValue}</TableCell>
						<TableCell align="left">{v.currentValue}</TableCell>
						<TableCell align="center">
							{v.resolved ? (
								<Check color="success" />
							) : (
								<IconButton title="Resolve">
									<Add />
								</IconButton>
							)}
						</TableCell>
					</TableRow>
				));
			}
			default: {
				return <Typography>Invalid table</Typography>;
			}
		}
	};

	return data ? (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				{getToolbar(tableType)}
				<TableContainer>
					<Table sx={{ minWidth: 750 }} size="medium" stickyHeader>
						<EnhancedTableHead
							headCells={headCells}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>{getTableBody(tableType)}</TableBody>
					</Table>
				</TableContainer>
				<Divider />
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={totalItemsCount}
					rowsPerPage={pageSize}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	) : (
		<Typography>No data</Typography>
	);
};
export default EnhancedTable;
