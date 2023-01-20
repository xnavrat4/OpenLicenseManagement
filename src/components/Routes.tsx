import { Routes, Route, Navigate } from 'react-router-dom';

import Devices from '../pages/Overviews/Devices';
import useLocalStorage from '../hooks/useLocalStorage';
import Customers from '../pages/Overviews/Customers';
import Licenses from '../pages/Overviews/Licenses';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Users from '../pages/Overviews/Users';
import NewDevices from '../pages/NewDevices';
import DeviceDetailPage from '../pages/Details/DeviceDetail';
import Register from '../pages/Register';
import LicenseDetailPage from '../pages/Details/LicenseDetail';
import CustomerDetailPage from '../pages/Details/CustomerDetail';
import NewUsers from '../pages/NewUsers';

const AppRoutes = () => {
	const [authToken] = useLocalStorage('authToken');
	return (
		<Routes>
			{!authToken && <Route path="/login" element={<Login />} />}
			{!authToken && <Route path="/register" element={<Register />} />}
			{!authToken && <Route path="*" element={<Navigate to="/login" />} />}
			{authToken && <Route path="/" element={<Navigate to="/licenses" />} />}
			{authToken && <Route path="/licenses" element={<Licenses />} />}
			{authToken && (
				<Route path="/licenses/:id" element={<LicenseDetailPage />} />
			)}
			{authToken && <Route path="/devices" element={<Devices />} />}
			{authToken && (
				<Route path="/devices/:id" element={<DeviceDetailPage />} />
			)}
			{authToken && <Route path="/newDevices" element={<NewDevices />} />}
			{authToken && <Route path="/customers" element={<Customers />} />}
			{authToken && (
				<Route path="/customers/:id" element={<CustomerDetailPage />} />
			)}
			{authToken && <Route path="/profile" element={<Profile />} />}
			{authToken && <Route path="/users" element={<Users />} />}
			{authToken && <Route path="/newusers" element={<NewUsers />} />}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default AppRoutes;
