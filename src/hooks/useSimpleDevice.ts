import { useEffect, useState } from 'react';

import { get } from '../utils/api';
import { DeviceName } from '../utils/types/DeviceTypes';

const useSimpleDevice = () => {
	const [devices, setDevices] = useState<DeviceName[]>(undefined as never);
	useEffect(() => {
		const fetchLicenses = async () => {
			// get the data from the api
			const data = await get('Device/Simple', true);
			// set state with the result
			setDevices(data as DeviceName[]);
		};

		// call the function
		fetchLicenses().catch(console.error);
	}, []);

	return devices;
};

export default useSimpleDevice;
