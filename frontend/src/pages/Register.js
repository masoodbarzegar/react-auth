import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const Register = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);
	
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard');
		}
	}, [isAuthenticated, navigate]);

	const [data, setData] = useState({
		first_name:"",
		last_name: "",
		email:"",
		password:""
	})

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const submitForm = (e)=>{
		e.preventDefault();
		
		const formData  = {
			first_name: data.first_name,
			last_name: data.last_name, 
			email: data.email,
			password: data.password
		}

		axios.post(process.env.REACT_APP_API_URL + '/register', formData)
			.then((result)=>{
				if(result.data.status === 'valid'){
					navigate('/login');
				} else {
					alert(result.data.message);
				}
			})
			.catch((error) => {
				console.error("Registration Error:", error);
				alert("An error occurred during Registration. Please try again.");

			});
	};

	return(
		<FormContainer onSubmit={submitForm}>
			<div className="row">
				<div className="col-md-12 text-center">
					<h1>Register</h1>
				</div>
			</div>
			<FormInput
				label="First Name"
				type="text"
				name="first_name"
				value={data.first_name}
				onChange={handleChange}
				placeholder="Enter your first name"
			/>

			<FormInput
				label="Last Name"
				type="text"
				name="last_name"
				value={data.last_name}
				onChange={handleChange}
				placeholder="Enter your last name"
			/>

			<FormInput
				label="Email"
				type="text"
				name="email"
				value={data.email}
				onChange={handleChange}
				placeholder="Enter your email"
			/>

			<FormInput
				label="Password"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				placeholder="Enter your password"
			/>

			<div className="row">
				<div className="col-md-12 text-center">
					<Button type="submit">Register</Button>
				</div>
			</div>
		</FormContainer>
	)
}
export default Register;