import { Route, Routes } from 'react-router-dom';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const AppRoutes = ()  => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Home />} />

			{/* Guest-only Routes */}
			<Route element={<GuestGuard />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>

			{/* Protected Routes */}
			<Route element={<AuthGuard />}>
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
};
export default AppRoutes;