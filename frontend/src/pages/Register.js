import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const Register = () => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: ""
	});
	const [formLoading, setFormLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({
		first_name: null,
		last_name: null,
		email: null,
		password: null,
		general: null
	});

	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);

	const validateField = (name, value) => {
		switch (name) {
			case 'first_name':
				return !value.trim() ? 'First name is required' : null;
			case 'last_name':
				return !value.trim() ? 'Last name is required' : null;
			case 'email':
				if (!value.trim()) return 'Email is required';
				if (!value.includes('@')) return 'Invalid email format';
				return null;
			case 'password':
				if (!value.trim()) return 'Password is required';
				if (value.length < 8) return 'Password must be at least 8 characters';
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

		const errors = validateAllFields();
		const hasErrors = Object.values(errors).some(error => error !== null);
		if (hasErrors) {
			setFormErrors(errors);
			setFormLoading(false);
			return;
		}

		try {
			const { data } = await apiClient.post('/register', formData);

			if (data.status === 'valid') {
				navigate('/login');
			} else {
				setFormErrors({ general: data.message || "Registration failed" });
			}
		} catch (error) {
			setFormErrors({
				general: error.response?.data?.message || "Registration failed. Please try again."
			});
		} finally {
			setFormLoading(false);
		}
	};

	return(
		<FormContainer onSubmit={handleSubmit} noValidate className="auth-form">
			<div className="row">
				<div className="col-md-12 text-center">
					<h1>Register</h1>
					{formErrors.general && (
						<div className="alert alert-danger mb-3">
							{formErrors.general}
						</div>
					)}
				</div>
			</div>

			<FormInput
				label="First Name"
				type="text"
				name="first_name"
				value={formData.first_name}
				onChange={(e) => handleChange('first_name', e.target.value)}
				onBlur={() => handleBlur('first_name')}
				placeholder="Enter your first name"
				error={formErrors.first_name}
				disabled={formLoading}
			/>
			<FormInput
				label="Last Name"
				type="text"
				name="last_name"
				value={formData.last_name}
				onChange={(e) => handleChange('last_name', e.target.value)}
				onBlur={() => handleBlur('last_name')}
				placeholder="Enter your last name"
				error={formErrors.last_name}
				disabled={formLoading}
			/>
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
					pattern: ".*", // Bypass default email validation
					onInvalid: (e) => e.preventDefault() // Prevent browser default error messages
				}}
			/>
			<FormInput
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={(e) => handleChange('password', e.target.value)}
				onBlur={() => handleBlur('password')}
				placeholder="Enter your password"
				error={formErrors.password}
				disabled={formLoading}
			/>

			<div className="row mt-3">
				<div className="col-md-12 text-center">
					<Button 
						type="submit" 
						loading={formLoading} 
						disabled={formLoading} 
						className="w-100"
					>
						Register
					</Button>
				</div>
			</div>
		</FormContainer>
	);
};
export default Register;