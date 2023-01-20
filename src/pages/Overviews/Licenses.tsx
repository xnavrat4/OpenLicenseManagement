import { useEffect, useState } from 'react';

import usePageTitle from '../../hooks/usePageTitle';
import { getAllFilter } from '../../utils/api';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import { HeadCell, Order } from '../../utils/types/UtilTypes';
import {
	LicenseQueryResult,
	LicenseTable
} from '../../utils/types/LicenseTypes';

const Licenses = () => {
	usePageTitle('Licenses');

	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<string>('id');
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalCount, setTotalCount] = useState(0);

	const [licenses, setLicenses] = useState<LicenseTable[]>(undefined as never);

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `PageSize=${pageSize}&PageNumber=${page + 1}&SortCriteria=${
				orderBy.charAt(0).toUpperCase() + orderBy.slice(1)
			}&SortDescending=${order === 'desc'}`;
			// get the data from the api
			const data = await getAllFilter('License/Filter', true, query);
			// set state with the result
			const res = data as LicenseQueryResult;
			setTotalCount(res.totalItemsCount);
			setLicenses(res.items);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, [order, orderBy, page, pageSize]);

	const headCells: HeadCell[] = [
		{
			type: 'productName',
			numeric: false,
			label: 'Product Name',
			enabled: true
		},
		{
			type: 'parameters',
			numeric: false,
			label: 'Parameters',
			enabled: true
		},
		{
			type: 'device',
			numeric: false,
			label: 'Device',
			enabled: true
		},
		{
			type: 'revoked',
			numeric: false,
			label: 'Revoked',
			enabled: true
		},
		{
			type: 'validFrom',
			numeric: false,
			label: 'Valid From',
			enabled: true
		},
		{
			type: 'validTo',
			numeric: false,
			label: 'Valid To',
			enabled: true
		}
	];

	return (
		<EnhancedTable
			tableType="license"
			data={licenses}
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

export default Licenses;
