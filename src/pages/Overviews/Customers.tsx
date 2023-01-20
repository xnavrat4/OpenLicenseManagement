import { useEffect, useState } from 'react';

import usePageTitle from '../../hooks/usePageTitle';
import { getAllFilter } from '../../utils/api';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import { HeadCell, Order } from '../../utils/types/UtilTypes';
import {
	CustomerQueryResult,
	CustomerTable
} from '../../utils/types/CustomerTypes';

const Customers = () => {
	usePageTitle('Customers');

	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<string>('name');
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalCount, setTotalCount] = useState(0);

	const [customers, setCustomers] = useState<CustomerTable[]>(
		undefined as never
	);

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `PageSize=${pageSize}&PageNumber=${page + 1}&SortCriteria=${
				orderBy.charAt(0).toUpperCase() + orderBy.slice(1)
			}&SortDescending=${order === 'desc'}`;
			// get the data from the api
			const data = await getAllFilter('Customer/Filter', true, query);
			// set state with the result
			const result = data as CustomerQueryResult;
			setTotalCount(result.totalItemsCount);
			setCustomers(result.items);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, [order, orderBy, page, pageSize]);

	const headCells: HeadCell[] = [
		{
			type: 'name',
			numeric: false,
			label: 'Name',
			enabled: true
		},
		{
			type: 'city',
			numeric: false,
			label: 'City',
			enabled: true
		},
		{
			type: 'country',
			numeric: false,
			label: 'Country',
			enabled: true
		},
		{
			type: 'devices',
			numeric: true,
			label: 'No of devices',
			enabled: false
		}
	];

	return (
		<EnhancedTable
			tableType="customer"
			data={customers}
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

export default Customers;
