import { Grid, Typography } from '@mui/material';

import { HWInfo } from '../utils/types/DeviceTypes';

import OLMCard from './OLMCard';

type Props = {
	hwInfo?: HWInfo;
};

const HWInfoComponent = ({ hwInfo }: Props) =>
	hwInfo ? (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<OLMCard>
					<Typography sx={{ fontSize: 18, pt: 1 }} component="div">
						System
					</Typography>
					<Typography align="left" margin={1}>
						Operating system: {hwInfo.operatingSystem.osType}
					</Typography>
					<Typography align="left" margin={1}>
						Machine id: {hwInfo.operatingSystem.machineId}
					</Typography>
				</OLMCard>
			</Grid>
			<Grid item xs={12} sm={6}>
				<OLMCard>
					<Typography sx={{ fontSize: 18, pt: 1 }} component="div">
						Processor
					</Typography>

					<Typography align="left" margin={1}>
						Processor: {hwInfo.processor.type}
					</Typography>
					<Typography align="left" margin={1}>
						Processor id: {hwInfo.processor.processorId}
					</Typography>
				</OLMCard>
			</Grid>
			<Grid item xs={12} sm={6}>
				<OLMCard>
					<Typography sx={{ fontSize: 18, pt: 1 }} component="div">
						Motherboard
					</Typography>
					<Typography align="left" margin={1}>
						Manufacturer: {hwInfo.motherBoard.manufacturer}
					</Typography>
					<Typography align="left" margin={1}>
						Product: {hwInfo.motherBoard.productName}
					</Typography>
					<Typography align="left" margin={1}>
						Serial number: {hwInfo.motherBoard.serialNumber}
					</Typography>
				</OLMCard>
			</Grid>
			<Grid item xs={12} sm={6}>
				<OLMCard>
					<Typography sx={{ fontSize: 18, pt: 1 }} component="div">
						RAM Modules
					</Typography>
					<Typography align="left" margin={1}>
						Total size: {hwInfo.ramModuleList.reduce((a, b) => +a + +b.size, 0)}{' '}
						GB
					</Typography>
					<Typography align="left" margin={1}>
						Number of modules: {hwInfo.ramModuleList.length}
					</Typography>
					<Typography align="left" margin={1}>
						Modules: {hwInfo.ramModuleList.map(s => `${s.size} GB`).join(', ')}
					</Typography>
				</OLMCard>
			</Grid>
			{hwInfo?.diskList?.map((d, i) => (
				<Grid key={i} item xs={12} sm={6}>
					<OLMCard>
						<Typography sx={{ fontSize: 18, pt: 1 }} component="div">
							Disk #{i + 1}
						</Typography>
						<Typography align="left" margin={1}>
							Disk id: {d.diskId}
						</Typography>
						<Typography align="left" margin={1}>
							Serial number: {d.serialNumber}
						</Typography>
						<Typography align="left" margin={1}>
							Size: {d.size}
						</Typography>
					</OLMCard>
				</Grid>
			))}
			<Grid item xs={12} sm={6}>
				<OLMCard>
					<Typography sx={{ fontSize: 18, pt: 1 }} component="div">
						MAC addresses
					</Typography>
					{hwInfo?.macAddressList?.map((a, i) => (
						<Typography key={i} align="left" margin={1}>
							{`${i + 1})`} {a.address}
						</Typography>
					))}
				</OLMCard>
			</Grid>
		</Grid>
	) : (
		<Typography>No HWInfo</Typography>
	);
export default HWInfoComponent;
