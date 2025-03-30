import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import { loginSuccess } from '../store/authSlice';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';


const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const [formLoading, setFormLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({
			email: null,
			password: null,
			general: null
		});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);

	const validateField = (name, value) => {
		switch (name) {
			case 'email':
				if (!value.trim()) return 'Email is required';
				if (!value.includes('@')) return 'Invalid email format';
				return null;
			case 'password':
				if (!value.trim()) return 'Password is required';
				return null;
			default:
				return null;
		}
	};

	const handleChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		// Clear error when typing starts
		if (value.trim()) {
			setFormErrors(prev => ({ ...prev, [field]: null }));
		}
	};

	const handleBlur = (field) => {
		const error = validateField(field, formData[field]);
		setFormErrors(prev => ({ ...prev, [field]: error }));
	};

	const validateAllFields = () => {
		const errors = {};
		Object.keys(formData).forEach(field => {
			errors[field] = validateField(field, formData[field]);
		});
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormLoading(true);
		setFormErrors({ email: '', password: '', general: null});

		const errors = validateAllFields();
		const hasErrors = Object.values(errors).some(error => error !== null);
		if (hasErrors) {
			setFormErrors(errors);
			setFormLoading(false);
			return;
		}

		try {
			const { data } = await apiClient.post('/login', {
				email: formData.email,
				password: formData.password
			});

			if (data.status === 'valid') {
				const userData = data.data;
				dispatch(loginSuccess({
					name: `${userData.first_name} ${userData.last_name}`,
					email: userData.email
				}));
				navigate('/dashboard');
			} else {
				setFormErrors(prev => ({
					...prev,
					general: data.message || "Login failed"
				}));
			}
		} catch (error) {
			if (error.response?.data?.errors) {
				setFormErrors({
					email: error.response.data.errors.email,
					password: error.response.data.errors.password,
					general: "Please check your credentials"
				});
			} else {
				setFormErrors({
					general: error.message || "Login failed. Please try again."
				})
			}
			console.error("Login error:", error);
		} finally {
			setFormLoading(false);
		}
	}

	return(
		<FormContainer onSubmit={handleSubmit} noValidate className="auth-form">
			<div className="row">
				<div className="col-md-12 text-center">
					<h1>Login</h1>
					{formErrors.general && (
						<div className="alert alert-danger mb-3">
							{formErrors.general}
						</div>
					)}
				</div>
			</div>

			<FormInput
				label="Email"
				type="email"
				name="email"
				value={formData.email}
				onChange={(e) => handleChange('email', e.target.value)}
				onBlur={() => handleBlur('email')}
				placeholder="Enter your email"
				error={formErrors.email}
				disabled={formLoading}
				inputProps={{
					pattern: null,
					onInvalid: (e) => e.preventDefault()
				}}
				className="mb-3"
			/>
			<FormInput
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={(e) => setFormData({...formData, password: e.target.value})}
				onBlur={() => handleBlur('password')}
				placeholder="Enter your password"
				error={formErrors.password}
				disabled={formLoading}
				className="mb-3"
			/>

			<div className="row">
				<div className="col-md-12 text-center">
					<Button
						type="submit"
						loading={formLoading}
						disabled={formLoading}
						className="w-100"
					>
						Login
					</Button>
				</div>
			</div>
		</FormContainer>
	)
}
export default Login;