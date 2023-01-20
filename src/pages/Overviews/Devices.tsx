import { useEffect, useState } from 'react';

import usePageTitle from '../../hooks/usePageTitle';
import { getAllFilter } from '../../utils/api';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import { HeadCell, Order } from '../../utils/types/UtilTypes';
import { DeviceQueryResult, DeviceTable } from '../../utils/types/DeviceTypes';

const Devices = () => {
	usePageTitle('Devices');

	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<string>('serialNumber');
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalCount, setTotalCount] = useState(0);

	const [devices, setDevices] = useState<DeviceTable[]>(undefined as never);

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `Activated=true&PageSize=${pageSize}&PageNumber=${
				page + 1
			}&SortCriteria=${
				orderBy.charAt(0).toUpperCase() + orderBy.slice(1)
			}&SortDescending=${order === 'desc'}`;
			// get the data from the api
			const data = await getAllFilter('Device/Validity', true, query);
			// set state with the result
			const res = data as DeviceQueryResult;
			setDevices(res.items);
			setTotalCount(res.totalItemsCount);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, [order, orderBy, page, pageSize]);

	const headCells: HeadCell[] = [
		{
			type: 'serialNumber',
			numeric: false,
			label: 'Serial Number',
			enabled: true
		},
		{
			type: 'customer',
			numeric: false,
			label: 'Customer',
			enabled: true
		},
		{
			type: 'additionalInfo',
			numeric: false,
			label: 'Additonal info',
			enabled: true
		},
		{
			type: 'lastOnline',
			numeric: false,
			label: 'Last online',
			enabled: true
		},
		{
			type: 'licenses',
			numeric: true,
			label: 'No of licenses',
			enabled: false
		}
	];

	return (
		<EnhancedTable
			tableType="device"
			data={devices}
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
	);
};

export default Devices;
