import { Guid } from 'guid-typescript';

import { DeviceName, DeviceNameAndCustomer } from './DeviceTypes';
import { QueryResult } from './UtilTypes';

export type LicenseTable = {
	id: number;
	device?: DeviceName;
	productName: string;
	parameters: string;
	revoked: boolean;
	validFrom: Date;
	validTo: Date;
};

export type LicenseDetail = {
	id: number;
	licenseKey: Guid;
	device?: DeviceNameAndCustomer;
	productName: string;
	parameters: string;
	revoked: boolean;
	validFrom: Date;
	validTo: Date;
};

export type LicenseCreate = {
	productName: string;
	parameters: string;
	licenseType: number;
	validFrom: Date;
	validTo: Date;
};

export type LicenseQueryResult = QueryResult & {
	items: LicenseTable[];
};
