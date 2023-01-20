import { useState } from 'react';

const useSuccessInfo = () => {
	const [successInfo, setSuccessInfo] = useState<string>();

	const setSuccess = (info: string) => {
		setSuccessInfo(info);
		setTimeout(() => {
			setSuccessInfo(undefined);
		}, 5000);
	};

	return [successInfo, setSuccess] as const;
};

export default useSuccessInfo;
