import dayjs from 'dayjs';
import { ChangeEvent } from 'react';

import { CustomerName, CustomerTable } from './CustomerTypes';
import { DeviceNameAndCustomer, DeviceTable } from './DeviceTypes';
import { LicenseTable } from './LicenseTypes';

export type User = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	isAdmin?: boolean;
};

export type ConnectionLog = {
	id: number;
	deviceID: number;
	systemTime: Date;
	result: string;
	type: string;
	licenseKey: string;
};

export type Violation = {
	id: number;
	violationType: string;
	dateTime: Date;
	formerValue: string;
	currentValue: string;
	resolved: boolean;
	deviceId: number;
};

export type HeadCell = {
	type: string;
	label: string;
	numeric: boolean;
	enabled: boolean;
};

export type Order = 'asc' | 'desc';

export type UserWithToken = User & {
	token: string;
};

export type UserRegister = Omit<User, 'id'> & {
	password: string;
	//address: Omit<Address, 'id'>;
};

export type ProfileData = User & {
	//address: Omit<Address, 'id'>;
};

export type ChangePassword = {
	userId: number;
	oldPassword: string;
	newPassword: string;
};
export type Filter = {
	pageSize?: number;
	pageNumber?: number;
	sortCriteria: string;
	sortDescending: boolean;
};

export enum UserStatus {
	Validated = 1,
	NotValidated = 0
}

export type UserFull = User & {
	userStatus: UserStatus;
	addedOn?: Date;
	addedBy?: User;
};

export type UserValidate = {
	id: number;
	userStatus: UserStatus;
	addedById: number;
};

export type UserQueryResult = QueryResult & {
	items: UserFull[];
};

export type ConnectionLogQueryResult = QueryResult & {
	items: ConnectionLog[];
};

export type ViolationQueryResult = QueryResult & {
	items: Violation[];
};

export type TableData =
	| CustomerTable[]
	| LicenseTable[]
	| DeviceTable[]
	| UserFull[]
	| ConnectionLog[]
	| Violation[];

export type QueryResult = {
	totalItemsCount: number;
	requestedPageNumber: number;
	pageSize: number;
};

export type useFieldProps = {
	id: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onBlur: () => void;
	onFocus: () => void;
	required: boolean | undefined;
	disabled: boolean | undefined;
	error: boolean | undefined;
	helperText: string | undefined;
};

export type EditLicenseProps = {
	productName: string;
	productNameProps: useFieldProps;
	parameters: string;
	parametersProps: useFieldProps;
	validTo: dayjs.Dayjs | null;
	setValidTo: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
	validFrom: dayjs.Dayjs | null;
	setValidFrom: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
	deviceName: string;
	setDeviceName: React.Dispatch<React.SetStateAction<string>>;
	revoked: boolean;
	setRevoked: React.Dispatch<React.SetStateAction<boolean>>;
	devices: DeviceNameAndCustomer[];
	new: boolean;
};

export type EditDeviceProps = {
	serialNumber: string;
	serialNumberProps: useFieldProps;
	additionalInfo: string;
	additionalInfoProps: useFieldProps;
	heartBeatFrequency: string;
	heartBeatFrequencyProps: useFieldProps;
	time: string;
	timeProps: useFieldProps;
	timeUnit: string;
	setTimeUnit: React.Dispatch<React.SetStateAction<string>>;
	timeUnits: string[];
	customer: CustomerName;
	setCustomerName: React.Dispatch<React.SetStateAction<string>>;
	customers: CustomerName[];
	new: boolean;
};

export type TableType =
	| 'customer'
	| 'device'
	| 'license'
	| 'user'
	| 'connectionLogs'
	| 'violation';

export type ApiControllerName =
	| 'ConnectionLog/Filter'
	| 'Customer'
	| 'Customer/Filter'
	| 'Customer/Simple'
	| 'License'
	| 'License/Filter'
	| 'Device'
	| 'Device/HWInfo'
	| 'Device/Licenses'
	| 'Device/Violations'
	| 'Device/Filter'
	| 'Device/Simple'
	| 'Device/Validate'
	| 'Device/ResolveViolation'
	| 'Device/Validity'
	| 'Identity'
	| 'Identity/Current'
	| 'Identity/Profile'
	| 'Identity/Profile/Password'
	| 'Identity/Validate'
	| 'Identity/Validated'
	| 'Identity/UpdateAdminRole'
	| 'Identity/Users';

export type HttpRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';
