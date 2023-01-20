import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Guid } from 'guid-typescript';

import { DeviceName } from '../utils/types/DeviceTypes';
import {
	LicenseCreate,
	LicenseDetail,
	LicenseTable
} from '../utils/types/LicenseTypes';
import { EditLicenseProps } from '../utils/types/UtilTypes';

import useField from './useField';
import useSimpleDevice from './useSimpleDevice';

const useEditLicense = (
	newLicense: boolean,
	disabled?: boolean,
	device?: DeviceName
) => {
	const [license, setLicense] = useState<LicenseDetail>();
	const [id, setId] = useState<number>(0);
	const [licenseKey, setLicenseKey] = useState<Guid>();
	// Fields
	const [productName, productNameProps, setProductName] = useField(
		'description',
		disabled
	);
	const [parameters, parametersProps, setParameter] = useField(
		'description',
		disabled
	);
	const [validTo, setValidTo] = useState<Dayjs | null>(dayjs(new Date()));
	const [validFrom, setValidFrom] = useState<Dayjs | null>(dayjs(new Date()));
	const [deviceName, setDeviceName] = useState<string>(
		device ? device.serialNumber : ''
	);
	const [revoked, setRevoked] = useState<boolean>(false);
	useEffect(() => {
		if (device) {
			console.log(device);
		}
	}, []);
	const devices = useSimpleDevice();

	const parseLicense = (l: LicenseDetail) => {
		setLicense(l);
		setId(l.id);
		setLicenseKey(l.licenseKey);
		setProductName(l.productName);
		setParameter(l.parameters);
		setRevoked(l.revoked);
		setValidFrom(dayjs(l.validFrom));
		setValidTo(dayjs(l.validTo));
		setDeviceName(l.device?.serialNumber as string);
	};

	const parseDevice = (device: DeviceName) => {
		setDeviceName(device.serialNumber);
	};

	const clearProps = (isNew: boolean) => {
		if (isNew) {
			setId(0);
			setLicenseKey(Guid.create());
			setProductName('');
			setParameter('');
			setValidFrom(dayjs(new Date()));
			setValidTo(dayjs(new Date()));
		} else {
			parseLicense(license as LicenseDetail);
		}
	};

	const returnLicense = (): LicenseTable | LicenseCreate => {
		if (newLicense) {
			return {
				productName,
				parameters,
				validFrom: validFrom?.toDate(),
				validTo: validTo?.toDate()
			} as LicenseCreate;
		} else {
			return {
				id,
				licenseKey,
				device: devices.find(d => d.serialNumber === deviceName) as DeviceName,
				productName,
				parameters,
				revoked,
				validFrom: validFrom?.toDate(),
				validTo: validTo?.toDate()
			} as LicenseTable;
		}
	};

	return [
		{
			productName,
			productNameProps,
			parameters,
			parametersProps,
			validTo,
			setValidTo,
			validFrom,
			setValidFrom,
			deviceName,
			setDeviceName,
			devices,
			revoked,
			setRevoked
		} as EditLicenseProps,
		parseLicense,
		returnLicense,
		parseDevice,
		clearProps
	] as const;
};

export default useEditLicense;
