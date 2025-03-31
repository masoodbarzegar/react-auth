import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Protects routes that require authentication
 * @param {string} redirectTo - Redirect path when unauthenticated (default: '/login')
 */
const AuthGuard = ({ redirectTo = '/login' }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const location = useLocation();

	return isAuthenticated 
		? <Outlet /> 
		: <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default AuthGuard;