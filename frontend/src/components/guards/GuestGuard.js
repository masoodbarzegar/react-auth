import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Protects routes that should only be accessible to guests
 * @param {string} redirectTo - Redirect path when authenticated (default: '/')
 */
const GuestGuard = ({ redirectTo = '/' }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const location = useLocation();

	return !isAuthenticated
		? <Outlet />
		: <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default GuestGuard;