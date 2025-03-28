import apiClient from './apiClient';
import { loginSuccess, logoutSuccess } from '../store/authSlice';

export const verifyAuth = async (dispatch) => {
	try {
		const { status, user } = await apiClient.get('/verify-auth');
		if (status === 'valid') {
			dispatch(loginSuccess({
				name: `${user.first_name} ${user.last_name}`,
				email: user.email
			}));
			return true;
		}
	} catch (error) {
		dispatch(logoutSuccess());
	}
	return false;
};
