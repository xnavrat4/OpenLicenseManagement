import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	AppBar,
	Container,
	Toolbar,
	Box,
	IconButton,
	Avatar,
	Divider,
	Menu as MenuProfile,
	MenuItem as MenuItemProfile,
	ListItemIcon
} from '@mui/material';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import {
	Devices,
	Group,
	Key,
	KeyboardDoubleArrowLeft,
	KeyboardDoubleArrowRight,
	Logout,
	Person
} from '@mui/icons-material';

import { get, signOutAsync } from '../utils/api';
import useLoggedInUser from '../hooks/useLoggedInUser';
import useLocalStorage from '../hooks/useLocalStorage';
import theme from '../utils/theme';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useLoggedInUser();
	const [authToken, setAuthToken] = useLocalStorage('authToken');
	const navigate = useNavigate();

	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const { collapseSidebar, collapsed } = useProSidebar();

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpenDropdown(true);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setOpenDropdown(false);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setUser(await get('Identity/Current', true));
			} catch (error) {
				setAuthToken(null);
			}
		};

		if (authToken && !user) {
			fetchUser();
		}
	}, []);

	return (
		<>
			{authToken && user && (
				<AppBar sx={{ position: 'sticky', top: 0, height: '6vh' }}>
					<Toolbar
						sx={{
							justifyContent: 'space-between'
						}}
					>
						<IconButton
							edge="start"
							onClick={() => {
								collapseSidebar(!collapsed);
							}}
							sx={{ ml: 0 }}
						>
							{collapsed ? (
								<KeyboardDoubleArrowRight />
							) : (
								<KeyboardDoubleArrowLeft />
							)}
						</IconButton>
						<IconButton
							onClick={handleClick}
							size="small"
							edge="end"
							sx={{ mr: 20 }}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
						>
							<Avatar sx={{ width: 32, height: 32 }}>
								{user.firstName.charAt(0)}
								{user.lastName.charAt(0)}
							</Avatar>
						</IconButton>
						<MenuProfile
							anchorEl={anchorEl}
							id="account-menu"
							open={openDropdown}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									'overflow': 'visible',
									'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									'mt': 1.5,
									'& .MuiAvatar-root': {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1
									},
									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0
									}
								}
							}}
							transformOrigin={{ horizontal: 'right', vertical: 'top' }}
							anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						>
							<MenuItemProfile component={Link} to="/profile">
								<Avatar /> Profile
							</MenuItemProfile>
							<Divider />
							<MenuItemProfile
								onClick={async () => {
									await signOutAsync();
									setAuthToken(null);
									setUser(undefined);
									navigate('/');
								}}
							>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								Logout
							</MenuItemProfile>
						</MenuProfile>
					</Toolbar>
				</AppBar>
			)}
			<Box sx={{ display: 'flex', height: '94vh' }}>
				{authToken && user && (
					<Sidebar backgroundColor={`${theme.palette.secondary.main}`}>
						<Menu>
							<MenuItem icon={<Key />} component={<Link to="/licenses" />}>
								Licenses
							</MenuItem>
							<MenuItem icon={<Devices />} component={<Link to="/devices" />}>
								Devices
							</MenuItem>
							<MenuItem icon={<Person />} component={<Link to="/customers" />}>
								Customers
							</MenuItem>
							{user.isAdmin && (
								<MenuItem icon={<Group />} component={<Link to="/users" />}>
									Users
								</MenuItem>
							)}
						</Menu>
					</Sidebar>
				)}
				<Container
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						columns: 1,
						py: 1,
						overflow: 'auto'
					}}
				>
					{children}
				</Container>
			</Box>
		</>
	);
};
export default Layout;
