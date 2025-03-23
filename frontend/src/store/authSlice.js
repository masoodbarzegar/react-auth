import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isAuthenticated: false,
	loading: true,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			state.loading = false;
		},
		logoutSuccess: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
		},
		authError: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { loginSuccess, logoutSuccess, authError, setLoading } = authSlice.actions;
export default authSlice.reducer;