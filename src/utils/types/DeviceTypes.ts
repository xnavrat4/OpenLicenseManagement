import { CustomerName } from './CustomerTypes';
import { QueryResult } from './UtilTypes';

export type RAMModuleDto = {
	partNumber: string;
	serialNumber: string;
	size: number;
};

export type Processor = {
	type: string;
	processorId: string;
};

export type MotherBoard = {
	serialNumber: string;
	productName: string;
	manufacturer: string;
};

export type OperatingSystem = {
	osType: string;
	machineId: string;
};

export type Disk = {
	diskId: string;
	size: string;
	serialNumber: string;
};

export type MACAddress = {
	address: string;
};

export type HWInfo = {
	macAddressList: MACAddress[];
	diskList: Disk[];
	ramModuleList: RAMModuleDto[];
	processor: Processor;
	motherBoard: MotherBoard;
	operatingSystem: OperatingSystem;
};

export type DeviceTable = {
	id: number;
	serialNumber: string;
	additionalInfo?: string;
	validity: boolean;
	customer: CustomerName;
	numberOfLicenses?: number;
	heartbeatFrequency: number;
	lastOnline: string;
	hwInfo?: HWInfo;
};

export type DeviceUpdate = {
	id: number;
	serialNumber: string;
	additionalInfo?: string;
	heartbeatFrequency: number;
	validity: boolean;
	customer: CustomerName;
	hwInfo?: HWInfo;
};

export type DeviceDetail = {
	id: number;
	serialNumber: string;
	customer: CustomerName;
	additionalInfo: string;
	heartBeatFrequency: number;
};

export type DeviceName = {
	id: number;
	serialNumber: string;
};

export type DevicePreview = {
	id: number;
	serialNumber: string;
	additionalInfo: string;
	numberOfLicenses?: number;
};
export type DeviceNameAndCustomer = {
	id: number;
	serialNumber: string;
	lastOnline: string;
	customer: CustomerName;
};

export type DeviceQueryResult = QueryResult & {
	items: DeviceTable[];
};
