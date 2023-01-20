import { useEffect, useState } from 'react';

import { get } from '../utils/api';
import { CustomerName } from '../utils/types/CustomerTypes';

const useSimpleCustomer = () => {
	const [customers, setCustomers] = useState<CustomerName[]>(
		undefined as never
	);
	useEffect(() => {
		const fetchLicenses = async () => {
			// get the data from the api
			const data = await get('Customer/Simple', true);
			// set state with the result
			setCustomers(data as CustomerName[]);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, []);

	return customers;
};

export default useSimpleCustomer;
