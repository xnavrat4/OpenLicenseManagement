import { DevicePreview } from './DeviceTypes';
import { QueryResult } from './UtilTypes';

export type CustomerTable = {
	id: number;
	name: string;
	city: string;
	country: string;
	numberOfDevices: number;
};

export type CustomerName = {
	id: number;
	name: string;
};

export type CustomerCreate = {
	name: string;
	city: string;
	country: string;
};

export type CustomerUpdate = CustomerCreate & {
	id: number;
};

export type CustomerDetail = {
	id: number;
	name: string;
	city: string;
	country: string;
	devices: DevicePreview[];
};

export type CustomerQueryResult = QueryResult & {
	items: CustomerTable[];
};
