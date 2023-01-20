import { Delete, Edit } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useSuccessInfo from '../hooks/useSuccesInfo';
import { deleteById } from '../utils/api';
import { CustomerUpdate } from '../utils/types/CustomerTypes';
import { DeviceDetail, DeviceTable } from '../utils/types/DeviceTypes';
import { LicenseDetail } from '../utils/types/LicenseTypes';

import AddDevice from './AddDevice';
import AddLicense from './AddLicense';
import AlertSuccess from './AlertSuccess';
import CustomerForm from './Forms/CustomerForm';

type Props = {
	type: 'customer' | 'device' | 'license';
	data: CustomerUpdate | DeviceDetail | LicenseDetail | undefined;
};

const EditDetailComponent = ({ type, data }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [successInfo, setSuccessInfo] = useSuccessInfo();
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			switch (type) {
				case 'license': {
					const l = data as LicenseDetail;
					await deleteById(l.id, 'License', true);
					navigate('/licenses');
					break;
				}

				case 'device': {
					const d = data as DeviceDetail;
					await deleteById(d.id, 'Device', true);
					navigate('/devices');
					break;
				}

				case 'customer': {
					const c = data as CustomerUpdate;
					await deleteById(c.id, 'Customer', true);
					navigate('/customers');
					break;
				}
			}
		} catch (err) {
			console.log((err as { message?: string })?.message ?? 'unknownERror');
		}
	};

	const getForm = (type: string) => {
		if (data === undefined) {
			return <Typography>No data yet</Typography>;
		}
		switch (type) {
			case 'customer': {
				return (
					<CustomerForm
						customer={data as unknown as CustomerUpdate}
						setSuccessInfo={setSuccessInfo}
					>
						{open => (
							<IconButton title="Edit customer" onClick={open}>
								<Edit />
							</IconButton>
						)}
					</CustomerForm>
				);
			}
			case 'device': {
				return (
					<AddDevice
						device={data as unknown as DeviceTable}
						setSuccessInfo={setSuccessInfo}
						isEdit
					>
						{open => (
							<IconButton title="Edit device" onClick={open}>
								<Edit />
							</IconButton>
						)}
					</AddDevice>
				);
			}

			case 'license': {
				return (
					<AddLicense
						license={data as unknown as LicenseDetail}
						setSuccessInfo={setSuccessInfo}
						isNew={false}
					>
						{open => (
							<IconButton title="Edit license" onClick={open}>
								<Edit />
							</IconButton>
						)}
					</AddLicense>
				);
			}
		}
	};

	return (
		<>
			<Dialog open={open}>
				<DialogTitle>Are you sure?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You are about to delete a {type}. Are you sure about that?
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						onClick={() => {
							setOpen(false);
							handleDelete();
						}}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<Grid container justifyContent="flex-end">
				{successInfo && <AlertSuccess>{successInfo}</AlertSuccess>}
				{getForm(type)}
				<IconButton title={`Delete ${type}`} onClick={() => setOpen(true)}>
					<Delete />
				</IconButton>
			</Grid>
		</>
	);
};

export default EditDetailComponent;
