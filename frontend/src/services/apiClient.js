import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.response.use(
	response => response,
	error => Promise.reject(error.response?.data?.message || error.message)
);

export default apiClient;