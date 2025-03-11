import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/dashboard" element={<Dashboard />} />
	</Routes>
);

export default AppRoutes;