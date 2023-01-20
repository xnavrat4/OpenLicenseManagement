import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { getAllFilter } from '../../utils/api';
import {
	ConnectionLog,
	ConnectionLogQueryResult,
	HeadCell,
	Order
} from '../../utils/types/UtilTypes';
import EnhancedTable from '../EnhancedTable/EnhancedTable';

type Props = {
	id: number;
};

const DeviceLogs = ({ id }: Props) => {
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<string>('id');
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalCount, setTotalCount] = useState(0);
	const [logs, setLogs] = useState<ConnectionLog[]>(undefined as never);

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `DeviceId=${id}&PageSize=${pageSize}&PageNumber=${
				page + 1
			}&SortCriteria=${
				orderBy.charAt(0).toUpperCase() + orderBy.slice(1)
			}&SortDescending=${order === 'desc'}`;
			// get the data from the api
			const data = await getAllFilter('ConnectionLog/Filter', true, query);
			// set state with the result
			const result = data as ConnectionLogQueryResult;
			setTotalCount(result.totalItemsCount);
			setLogs(result.items);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, [order, orderBy, page, pageSize]);

	const headCells: HeadCell[] = [
		{
			type: 'systemTime',
			numeric: false,
			label: 'Time',
			enabled: true
		},
		{
			type: 'type',
			numeric: false,
			label: 'Type',
			enabled: true
		},
		{
			type: 'result',
			numeric: false,
			label: 'Result',
			enabled: true
		},
		{
			type: 'licenseKey',
			numeric: false,
			label: 'License key',
			enabled: true
		}
	];
	return (
		<Grid item xs={12}>
			<EnhancedTable
				tableType="connectionLogs"
				data={logs}
				headCells={headCells}
				order={order}
				setOrder={setOrder}
				orderBy={orderBy}
				setOrderBy={setOrderBy}
				page={page}
				setPage={setPage}
				pageSize={pageSize}
				setPageSize={setPageSize}
				totalItemsCount={totalCount}
			/>
		</Grid>
	);
};

export default DeviceLogs;
