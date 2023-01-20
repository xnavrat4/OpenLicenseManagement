import { useEffect, useState } from 'react';

import usePageTitle from '../../hooks/usePageTitle';
import { getAllFilter } from '../../utils/api';
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import {
	HeadCell,
	Order,
	UserFull,
	UserQueryResult
} from '../../utils/types/UtilTypes';

const Users = () => {
	usePageTitle('Users');
	const [users, setUsers] = useState<UserFull[]>(undefined as never);

	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<string>('id');
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		const fetchLicenses = async () => {
			const query = `userStatus=Validated&SortCriteria=LastName&SortDescending=true`;
			// get the data from the api
			const data = await getAllFilter('Identity/Validated', true, query);
			// set state with the result
			const res = data as UserQueryResult;
			setTotalCount(res.totalItemsCount);
			setUsers(data.items);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, []);

	const headCells: HeadCell[] = [
		{
			type: 'firstName',
			numeric: false,
			label: 'First Name',
			enabled: true
		},
		{
			type: 'lastName',
			numeric: false,
			label: 'Last Name',
			enabled: true
		},
		{
			type: 'status',
			numeric: false,
			label: 'Status',
			enabled: true
		},
		{
			type: 'email',
			numeric: false,
			label: 'Email',
			enabled: true
		},
		{
			type: 'addedBy',
			numeric: false,
			label: 'Added by',
			enabled: true
		},
		{
			type: 'addedon',
			numeric: false,
			label: 'Added on',
			enabled: true
		}
	];

	return (
		<EnhancedTable
			tableType="user"
			data={users}
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

export default Users;
